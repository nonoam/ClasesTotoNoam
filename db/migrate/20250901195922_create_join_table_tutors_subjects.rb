class CreateJoinTableTutorsSubjects < ActiveRecord::Migration[8.0]
  def change
    create_join_table :tutors, :subjects do |t|
      # t.index [:tutor_id, :subject_id]
      # t.index [:subject_id, :tutor_id]
    end
  end
end
