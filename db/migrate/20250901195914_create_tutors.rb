class CreateTutors < ActiveRecord::Migration[7.1]
  def change
    create_table :tutors do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :phone
      t.text :bio
      t.string :education
      t.text :experience
      t.string :profile_image_url
      t.integer :years_experience

      t.timestamps
    end

    add_index :tutors, :email, unique: true
  end
end
