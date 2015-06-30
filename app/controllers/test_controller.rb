require 'pry'

class TestController < ApplicationController
  def index
    descrip = Test.where(identifier: '#descrip').first[:html]
    admins = Detail.where(identifier: 'admin').pluck(:user_id)

    admin = session[:user] ? (admins.include? session[:user]['id']) : false
    render json: {descrip: descrip, admin: admin}
  end

  def fetch
    splits = params[:identifier].split('|')
    2.times do |i|
      splits[i].slice!(0)
    end
    part = splits[0].to_i
    question = splits[1].to_i
    floor = (((question-1).to_f/10).floor.to_i*10)+1
    bools = []
    10.times do |k|
      bools.push(Test.where("identifier LIKE 'p#{part}|q#{floor + k}|%'").any?)
    end

    test = Test.where("identifier LIKE '#{params[:identifier]}%'").first

    if test
      breakdown = test[:identifier].split('|')
      5.times do |i|
        breakdown[i].slice!(0)
      end
      part = breakdown[0].to_i
      question = breakdown[1].to_i
      count = breakdown[2].to_i
      count = (count/2)-1
      count = count == 1 ? 'TX' : 'ABCDEFGH'[0..count]
      link = breakdown[3].to_i
      answer = breakdown[4].to_i
      html = test[:html]

      which_one = 1
      original_index = test[:id]
      original_question = question

      (question - 1).times do |k|
        break_me = false
        index = (question - 1) - k
        previous = Test.where("identifier LIKE 'p#{part}|q#{index}|%'").first
        unless previous.nil?
          if previous[:identifier].include? '|l1|'
            original_index = previous[:id]
            original_question -= 1
            which_one += 1
          else
            break_me = true
          end
        end
        break if break_me
      end

      test = Test.find(original_index)
      last_one = false
      which_one_now = 1
      last_one = true if test[:identifier].include? '|l0|'

      while (test && (test[:identifier].include? '|l1|')) || last_one
        group = AnswerGroup.where(test_id: test[:id]).first

        if group
          blank = group[:blank]
          alpha = 'ABCDEFGHIJ'

          answers = Answer.where(answer_group_id: group[:id])
          shuffled = answers.pluck(:answer_text)
          real_shuffle = []
          modified = blank ? [shuffled[0]] + shuffled[1..-1].shuffle : shuffled.shuffle
          modified.each_with_index do |shuffle, index|
            if blank && index == 0
              real_shuffle.push(shuffle)
            else
              real_shuffle.push("(#{alpha.slice!(0)}) " + shuffle)
            end
          end
          big_string = real_shuffle.join('</div><div>')
          html.gsub! "[[#{which_one_now-1}]]", "<div>#{big_string}</div>"
        end

        break if last_one
        which_one_now += 1
        original_question += 1
        test = Test.where("identifier LIKE 'p#{part}|q#{original_question}|%'").first
        last_one = true unless test && (test[:identifier].include? '|l1|')

      end

      render json: {part:part,question:question,range:1,bools:bools,
                    count:count,link:link,answer:answer,html:html,which_one:which_one}
      else
      render json: {bools:bools,part:false}
    end
  end

  def part
    length = [0,10,30,30,30,40,12,48][params[:part].to_i]
    pieces = Test.where("identifier LIKE 'p#{params[:part]}|%'")

    jsonified = []
    pieces.each do |piece|
      breakdown = piece[:identifier].split('|')
      5.times do |i|
        breakdown[i].slice!(0)
      end
      part = breakdown[0].to_i
      question = breakdown[1].to_i
      count = breakdown[2].to_i
      count = (count/2)-1
      count = count == 1 ? 'TX' : 'ABCDEFGH'[0..count]
      link = breakdown[3].to_i
      answer = breakdown[4].to_i
      html = piece[:html]

      which_one = 1
      original_index = piece[:id]
      original_question = question

      (question - 1).times do |k|
        break_me = false
        index = (question - 1) - k
        previous = Test.where("identifier LIKE 'p#{part}|q#{index}|%'").first
        unless previous.nil?
          if previous[:identifier].include? '|l1|'
            original_index = previous[:id]
            original_question -= 1
            which_one += 1
          else
            break_me = true
          end
        end
        break if break_me
      end

      test = Test.find(original_index)
      last_one = false
      which_one_now = 1
      last_one = true if test[:identifier].include? '|l0|'

      while (test[:identifier].include? '|l1|') || last_one
        group = AnswerGroup.where(test_id: test[:id]).first

        if group
          blank = group[:blank]
          alpha = 'ABCDEFGHIJ'

          answers = Answer.where(answer_group_id: group[:id])
          shuffled = answers.pluck(:answer_text)
          real_shuffle = []
          modified = blank ? [shuffled[0]] + shuffled[1..-1].shuffle : shuffled.shuffle
          modified.each_with_index do |shuffle, index|
            if blank && index == 0
              real_shuffle.push(shuffle)
            else
              real_shuffle.push("(#{alpha.slice!(0)}) " + shuffle)
            end
          end
          big_string = real_shuffle.join('</div><div>')
          html.gsub! "[[#{which_one_now-1}]]", "<div>#{big_string}</div>"
        end

        break if last_one
        which_one_now += 1
        original_question += 1
        test = Test.where("identifier LIKE 'p#{part}|q#{original_question}|%'").first
        last_one = true unless test[:identifier].include? '|l1|'

      end

      jsonified.push(part:part,question:question, range:1,
                     count:count,link:link,answer:answer,html:html)
    end

    jsonified = jsonified.sort_by{|k| k[:question]}
    jsonified = jsonified.sort_by{|k| k[:part]}

    hash_it_out = {}
    jsonified.size.times do |k|
      if jsonified[k][:link] == 1
        hash_it_out[jsonified[k][:question]] = jsonified[k+1]
      end
    end

    hash_it_out.values.each do |hash|
      jsonified.delete(hash)
    end


    finalized = []
    (length+1).times { finalized.push(0) }
    break_while = 100 # TODO: REMOVE THIS LINE
    while finalized.size > length
      sorted = jsonified.shuffle
      finalized = []
      sorted.each do |reunite|
        hash_pals = []
        unite = reunite
        finalized.push(unite)
        while hash_it_out[unite[:question]]
          hash_pals.push(unite) unless hash_pals.include? unite
          hash_pals.push(hash_it_out[unite[:question]])
          finalized.push(hash_it_out[unite[:question]])
          unite = hash_it_out[unite[:question]]
        end
        hash_pals.each do |j|
          j[:range] = hash_pals.size
        end
        break if finalized.size >= length
      end
      break_while -= 1
      break if break_while < 0
    end

    arrays = [0,10,30,30,30,40,12,48][1..(params[:part].to_i-1)].inject{|sum,x| sum + x} || 0
    which = arrays % 100 + 1
    finalized.each do |final|
      original_which = which
      finals = final[:html].split('<div class="multiple"')
      good_string = finals[0]
      index = 1
      while finals[index]
        good_string += "#{which}.&nbsp;<div class=\"multiple\"" + finals[index]
        which += 1
        index += 1
      end
      final[:html] = good_string
      which = original_which + 1
    end

    render json: {questions: finalized}
  end

  def answer
#    save_group[0] = blank;
 #   save_group[1] = $scope.partSelect;
  #  save_group[2] = answer_group.length;
   # save_group[3] = ($scope.dimeSelect + parseInt($scope.pennySelect));

    test = Test.where("identifier LIKE 'p#{params['1']}|q#{params['3']}|%'").first
    unless test
      test = Test.new(identifier:"p#{params['1']}|q#{params['3']}|")
      test.save
    end

    answer_group = AnswerGroup.new(test_id: test[:id])
    answer_group = AnswerGroup.where(test_id: test[:id]).first if test && AnswerGroup.where(test_id: test[:id]).any?

    blank = answer_group[:blank] = params['0'] == 'true'

    answer_group.save

    length = params['2'].to_i
    answers = []
    length.times do |k|
      answers.push(params[(k+4).to_s])
    end

    Answer.where(answer_group_id: answer_group[:id]).delete_all

    answers.each do |answer|
      this_answer = Answer.new(answer_group_id:answer_group[:id],answer_text:(blank ? answer : answer[4..-1]))
      blank = false
      this_answer.save
    end

    render nothing: true
  end

  def save
    kids = params[:kids].to_i
    identifier = params[:identifier]
    html = params[:html]
    clues = identifier.split('|')

    kids.times do |k|
      clue = 'p' + clues[0][1..-1] + '|q' + (clues[1][1..-1].to_i + k).to_s + '|'
      (clues.size-2).times do |j|
        index = j+2
        clue += clues[index] + '|'
      end
      clue.chop!
      clue.sub!('|l1|', '|l0|') if k + 1 == kids
      saved = Test.where("identifier LIKE 'p#{clues[0][1..-1]}|q#{clues[1][1..-1].to_i + k}|%'").first || Test.new
      saved[:identifier] = clue
      saved[:html] = html

      saved.save
    end

    render nothing: true
  end
end