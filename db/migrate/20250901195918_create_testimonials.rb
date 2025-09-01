class CreateTestimonials < ActiveRecord::Migration[8.0]
  def change
    create_table :testimonials do |t|
      t.references :tutor, null: false, foreign_key: true
      t.string :student_name
      t.text :content
      t.integer :rating
      t.date :date

      t.timestamps
    end
  end
end
