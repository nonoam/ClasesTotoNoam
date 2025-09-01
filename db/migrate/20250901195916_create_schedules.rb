class CreateSchedules < ActiveRecord::Migration[7.1]
  def change
    create_table :schedules do |t|
      t.references :tutor, null: false, foreign_key: true
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.boolean :available, default: true
      t.string :recurring_pattern

      t.timestamps
    end

    add_index :schedules, [:tutor_id, :start_time]
    add_index :schedules, :available
  end
end
