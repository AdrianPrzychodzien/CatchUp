# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_19_094447) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "decks", force: :cascade do |t|
    t.bigint "teacher_id"
    t.string "name"
    t.jsonb "cards"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["teacher_id"], name: "index_decks_on_teacher_id"
  end

  create_table "groups", force: :cascade do |t|
    t.bigint "organization_id", null: false
    t.bigint "teacher_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "language", default: 0
    t.integer "level", default: 0
    t.index ["organization_id"], name: "index_groups_on_organization_id"
    t.index ["teacher_id"], name: "index_groups_on_teacher_id"
  end

  create_table "invitations", force: :cascade do |t|
    t.bigint "organization_id", null: false
    t.bigint "teacher_id"
    t.string "token"
    t.datetime "expire_at"
    t.string "via"
    t.string "status"
    t.string "email"
    t.string "batch_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "student_id"
    t.string "recipient_type"
    t.integer "group_id"
    t.index ["organization_id"], name: "index_invitations_on_organization_id"
    t.index ["student_id"], name: "index_invitations_on_student_id"
    t.index ["teacher_id"], name: "index_invitations_on_teacher_id"
  end

  create_table "managers", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id"
    t.index ["email"], name: "index_managers_on_email", unique: true
    t.index ["organization_id"], name: "index_managers_on_organization_id"
    t.index ["reset_password_token"], name: "index_managers_on_reset_password_token", unique: true
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "refresh_tokens", force: :cascade do |t|
    t.string "crypted_token"
    t.bigint "student_id", null: false
    t.datetime "expires_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["crypted_token"], name: "index_refresh_tokens_on_crypted_token", unique: true
    t.index ["student_id"], name: "index_refresh_tokens_on_student_id"
  end

  create_table "students", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider"
    t.string "uid"
    t.integer "teacher_id"
    t.bigint "group_id"
    t.integer "organization_id"
    t.index ["email"], name: "index_students_on_email", unique: true
    t.index ["group_id"], name: "index_students_on_group_id"
    t.index ["reset_password_token"], name: "index_students_on_reset_password_token", unique: true
  end

  create_table "teachers", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "organization_id"
    t.index ["email"], name: "index_teachers_on_email", unique: true
    t.index ["organization_id"], name: "index_teachers_on_organization_id"
    t.index ["reset_password_token"], name: "index_teachers_on_reset_password_token", unique: true
  end

  add_foreign_key "decks", "teachers"
  add_foreign_key "groups", "organizations"
  add_foreign_key "groups", "teachers"
  add_foreign_key "invitations", "organizations"
  add_foreign_key "managers", "organizations"
  add_foreign_key "refresh_tokens", "students"
  add_foreign_key "students", "groups"
  add_foreign_key "teachers", "organizations"
end
