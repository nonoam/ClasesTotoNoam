class CreateBookings < ActiveRecord::Migration[7.1]
  def change
    create_table :bookings do |t|
      t.references :tutor, null: false, foreign_key: true
      t.references :subject, null: false, foreign_key: true
      t.references :schedule, null: false, foreign_key: true
      t.string :student_name, null: false
      t.string :student_email, null: false
      t.string :student_phone
      t.datetime :class_date, null: false
      t.integer :duration_minutes, default: 90
      t.string :class_type
      t.integer :number_of_students, default: 1
      t.decimal :total_price, precision: 10, scale: 2
      t.string :status, default: 'pending'
      t.text :notes

      t.timestamps
    end

    add_index :bookings, :status
    add_index :bookings, :class_date
  end
end
