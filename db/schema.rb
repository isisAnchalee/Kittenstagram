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

ActiveRecord::Schema.define(version: 20141126205232) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "photo_id",   null: false
    t.text     "body",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "feeds", force: true do |t|
    t.integer  "follower_id", null: false
    t.integer  "followee_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "feeds", ["followee_id"], name: "index_feeds_on_followee_id", using: :btree
  add_index "feeds", ["follower_id"], name: "index_feeds_on_follower_id", using: :btree

  create_table "followers", force: true do |t|
    t.integer "following_id", null: false
    t.integer "follower_id",  null: false
  end

  add_index "followers", ["follower_id"], name: "index_followers_on_follower_id", using: :btree
  add_index "followers", ["following_id"], name: "index_followers_on_following_id", using: :btree

  create_table "likes", force: true do |t|
    t.integer  "user_id",    null: false
    t.integer  "photo_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "photos", force: true do |t|
    t.integer  "user_id",        null: false
    t.string   "filepicker_url", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "caption"
  end

  create_table "users", force: true do |t|
    t.string   "email",           null: false
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "bio"
    t.string   "profile_photo"
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end
