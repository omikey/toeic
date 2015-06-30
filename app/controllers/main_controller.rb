require 'pry'
require 'bcrypt'

class MainController < ApplicationController
  def index
    if params[:mission] == 'accomplished'
      @alert = 'You are now a registered member!'
    end
    @user = session[:user] ? User.find(session[:user]['id']) : User.new
    @login = session[:user]
    @s3_direct_post = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: 201, acl: :public_read)
    @post_url = @s3_direct_post.url.to_s.gsub!('s3.amazonaws.com','s3-us-west-2.amazonaws.com')

    @policy = Base64.encode64(
        {
            expiration: 24.hours.from_now.utc.strftime('%Y-%m-%dT%H:%M:%SZ'),
            conditions: [
                {bucket: 'assets-japanfour'},
                {acl: 'public-read'},
                ['starts-with', '$key', ''],
                {success_action_status: '201'}
            ]
        }.to_json
    ).gsub(/\n|\r/, '')

    @siggy = Base64.encode64(
        OpenSSL::HMAC.digest(
            OpenSSL::Digest::Digest.new('sha1'),
            'Y6nL9iyGnWHQhYJUxrU0GjhYa/q0fyrvXdDnBIlz',
            @policy
        )
    ).gsub(/\n/, '')
  end

  def profile
    @user = params[:user]
    updatedUser = User.find(session[:user]['id'])
    if User.authenticate(@user[:login], @user[:password])
      updatedUser[:avatar_url] = @user[:avatar_url]
      updatedUser[:email] = @user[:email]
      updatedUser[:first_name] = @user[:first_name]
      updatedUser[:last_name] = @user[:last_name]
      updatedUser.save
    end
    @user = updatedUser
    render nothing: true
  end

  def signout
    session.destroy
    render nothing: true
  end

  def signin
    @user = params[:user]
    if User.authenticate(@user[:login], @user[:password])
      session[:user] = User.where(login: params[:user][:login]).first
      session[:admin] = Detail.where(user_id:session[:user]['id'],identifier:'admin').any?
    end
    render json: {login: session[:user]}
  end

  def postit
    post = params[:post]
    post.gsub!('&nbsp;', ' ')
    #binding.pry

    if params[:editid]
      update = Post.find(params[:editid])
      if update[:user_id] == session[:user]['id']
        update[:message] = post
        update[:swag] = params[:swag]
        update.save
      end
    else
    Post.new(query_id: params[:query],
             user_id: session[:user]['id'],
             message: post, swag: params[:swag]).save
    end
    redirect_to(main_community_url)
  end

  def dashboard
    @listening = []
    4.times do |k|
      @listening.push({title: "Part\u00a0#{(k+1).to_s}",
                       score: 50 + rand(51),
                       mypace: "#{(2 + rand(3)).to_s}s",
                       yourpace: "#{(2 + rand(3)).to_s}s"})
    end

    @reading = []
    3.times do |k|
      @reading.push({title: "Part\u00a0#{(k+5).to_s}",
                     score: 50 + rand(51),
                     mypace: "#{(25 + rand(56)).to_s}s",
                     yourpace: "#{(25 + rand(56)).to_s}s"})
    end

    rand = rand(51)
    @readingWPM = {total: 100 + rand,
                   percent: (((100+rand)/1.5) + 0.5).to_i}

    rand = rand(4000)
    @vocabulary = {total: 4000 + rand,
                   percent: (((4000+rand)/80) + 0.5).to_i}

    @improvement = []

    7.times { @improvement.push(50 + rand(51)) }
    render json: {listening: @listening,
                  reading: @reading,
                  readingWPM: @readingWPM,
                  vocabulary: @vocabulary,
                  improvement: @improvement,
                  date: Time.now().strftime('%B %d, %Y'),
                  goal: (rand(5)+6)*100}
  end

  def community
    if params[:get] == 'deleteQuery'
      Post.where(query_id: params[:id]).delete_all
      Query.find(params[:id]).delete
      render nothing: true
    elsif params[:get] == 'deleteForum'
      Query.where(forum_id: params[:id]).each do |q|
        q.posts.delete_all
        q.delete
      end
      Forum.find(params[:id]).delete
      render nothing: true
    elsif params[:get] == 'board'
      board = Forum.find(params[:id])
      board[:title] = params[:board]
      board.save
      render nothing: true
    elsif params[:get] == 'thread'
      thread = Query.find(params[:id])
      thread[:title] = params[:thread]
      thread.save
      render nothing: true
    elsif params[:get] == 'deletepost'
      delete = Post.find(params[:id])
      if delete[:user_id] == session[:user]['id']
        delete.delete
      end
      redirect_to(main_community_url)
    elsif params[:get] == 'edit'
      render json: {post: Post.find(params[:id])}
    elsif params[:get] == 'post'
      if params[:id].to_i < 0
        newQ = Query.new(title: 'New Query', user_id: session[:user]['id'], forum_id: params[:forum])
        newQ.save
        params[:id] = newQ[:id]
      end
      posts = []
      Post.where(query_id: params[:id]).each do |post|
        posts.push({id: post.id,
                    message: post.message,
                    avatar: post.user.avatar_url,
                    user: post.user.login,
                    user_posts: post.user.posts.count,
                    user_joined: post.user.created_at.strftime('%m/%d/%Y'),
                    updated: post[:updated_at].strftime('%b %e, %l:%M %p'),
                    query: params[:id],
                    mine: post.user.id == (session[:user] ? session[:user]['id'] : 0)})
      end
      changeThread = Query.where(id: params[:id]).first
      if params[:thread]
        changeThread[:title] = params[:thread]
        changeThread.save
      end
      render json: {posts: posts, query: params[:id], forum: changeThread[:forum_id],
                    thread: changeThread[:title], my_query: changeThread[:user_id] == (session[:user] ? session[:user]['id'] : 0)}
    elsif params[:get] == 'forum'
      newF = nil
      if params[:id].to_i < 0
        newF = Forum.new(title: 'New Forum')
        newF.save
        params[:id] = newF[:id]
      end
      queries = []
      Query.where(forum_id: params[:id]).includes(:posts).each do |query|
        #binding.pry
        queries.push({id: query.id,
                      forum_id: query.forum_id,
                      title: query.title,
                      posts: query.posts.count,
                      user: query.user.login,
                      updated: (query.posts.order(:updated_at).map { |l| l[:updated_at] }[-1] || query[:updated_at]).strftime('%b %e, %l:%M %p')})
      end
      #binding.pry
      board = newF || Forum.find(params[:id])
      render json: {queries: queries, board: board[:title], mine: session[:user] != nil,
                    forum: board[:id]}
    else
      forums = []
      Forum.includes(queries: :posts).each do |forum|
        forums.push({id: forum.id,
                     title: forum.title,
                     queries: forum.queries.count,
                     responses: forum.queries.map { |k| k.posts.count }.inject { |sum, x| sum + x } || 0,
                     updated: (forum.queries.map { |k| k.posts.order(:updated_at).map { |l| l[:updated_at] } }.inject { |sum, x| sum + x } || [DateTime.now])[-1].strftime('%b %e, %l:%M %p')})
      end
      render json: {forums: forums}
    end
  end
end