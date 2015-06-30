# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150314093143) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answer_groups", force: :cascade do |t|
    t.integer  "test_id"
    t.boolean  "blank"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "answer_groups", ["test_id"], name: "index_answer_groups_on_test_id", using: :btree

  create_table "answers", force: :cascade do |t|
    t.integer  "answer_group_id"
    t.string   "answer_text"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "answers", ["answer_group_id"], name: "index_answers_on_answer_group_id", using: :btree

  create_table "details", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "identifier"
    t.text     "html"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "details", ["user_id"], name: "index_details_on_user_id", using: :btree

  create_table "forums", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "lists", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "posts", force: :cascade do |t|
    t.integer  "query_id"
    t.integer  "user_id"
    t.text     "message"
    t.text     "swag"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "posts", ["query_id"], name: "index_posts_on_query_id", using: :btree
  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

  create_table "queries", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "forum_id"
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "queries", ["forum_id"], name: "index_queries_on_forum_id", using: :btree
  add_index "queries", ["user_id"], name: "index_queries_on_user_id", using: :btree

  create_table "tests", force: :cascade do |t|
    t.string   "identifier"
    t.text     "html"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "login"
    t.string   "password"
    t.string   "token"
    t.string   "avatar_url"
    t.datetime "token_date"
    t.boolean  "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "words", force: :cascade do |t|
    t.string   "english"
    t.string   "japanese"
    t.integer  "list_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "words", ["list_id"], name: "index_words_on_list_id", using: :btree

  add_foreign_key "answer_groups", "tests"
  add_foreign_key "answers", "answer_groups"
  add_foreign_key "details", "users"
  add_foreign_key "posts", "queries"
  add_foreign_key "posts", "users"
  add_foreign_key "queries", "forums"
  add_foreign_key "queries", "users"
  add_foreign_key "words", "lists"
end
