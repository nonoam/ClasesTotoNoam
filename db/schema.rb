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

ActiveRecord::Schema[8.0].define(version: 2025_09_01_195922) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "bookings", force: :cascade do |t|
    t.bigint "tutor_id", null: false
    t.bigint "subject_id", null: false
    t.bigint "schedule_id", null: false
    t.string "student_name", null: false
    t.string "student_email", null: false
    t.string "student_phone"
    t.datetime "class_date", null: false
    t.integer "duration_minutes", default: 90
    t.string "class_type"
    t.integer "number_of_students", default: 1
    t.decimal "total_price", precision: 10, scale: 2
    t.string "status", default: "pending"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["class_date"], name: "index_bookings_on_class_date"
    t.index ["schedule_id"], name: "index_bookings_on_schedule_id"
    t.index ["status"], name: "index_bookings_on_status"
    t.index ["subject_id"], name: "index_bookings_on_subject_id"
    t.index ["tutor_id"], name: "index_bookings_on_tutor_id"
  end

  create_table "schedules", force: :cascade do |t|
    t.bigint "tutor_id", null: false
    t.datetime "start_time", null: false
    t.datetime "end_time", null: false
    t.boolean "available", default: true
    t.string "recurring_pattern"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["available"], name: "index_schedules_on_available"
    t.index ["tutor_id", "start_time"], name: "index_schedules_on_tutor_id_and_start_time"
    t.index ["tutor_id"], name: "index_schedules_on_tutor_id"
  end

  create_table "subjects", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "level"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subjects_tutors", id: false, force: :cascade do |t|
    t.bigint "tutor_id", null: false
    t.bigint "subject_id", null: false
  end

  create_table "testimonials", force: :cascade do |t|
    t.bigint "tutor_id", null: false
    t.string "student_name"
    t.text "content"
    t.integer "rating"
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tutor_id"], name: "index_testimonials_on_tutor_id"
  end

  create_table "tutors", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "phone"
    t.text "bio"
    t.string "education"
    t.text "experience"
    t.string "profile_image_url"
    t.integer "years_experience"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_tutors_on_email", unique: true
  end

  add_foreign_key "bookings", "schedules"
  add_foreign_key "bookings", "subjects"
  add_foreign_key "bookings", "tutors"
  add_foreign_key "schedules", "tutors"
  add_foreign_key "testimonials", "tutors"
end
