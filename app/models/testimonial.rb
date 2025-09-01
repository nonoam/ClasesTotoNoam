class Testimonial < ApplicationRecord
  belongs_to :tutor
  
  validates :student_name, presence: true
  validates :content, presence: true, length: { minimum: 10, maximum: 500 }
  validates :rating, inclusion: { in: 1..5 }
  
  scope :recent, -> { order(created_at: :desc) }
  scope :top_rated, -> { where(rating: 5) }
end
