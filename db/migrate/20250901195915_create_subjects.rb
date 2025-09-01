class CreateSubjects < ActiveRecord::Migration[8.0]
  def change
    create_table :subjects do |t|
      t.string :name
      t.text :description
      t.string :level
      t.string :category

      t.timestamps
    end
  end
end
