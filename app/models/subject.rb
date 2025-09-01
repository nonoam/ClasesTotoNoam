class Subject < ApplicationRecord
  has_and_belongs_to_many :tutors
  has_many :bookings
  
  validates :name, presence: true, uniqueness: true
  
  scope :by_category, ->(category) { where(category: category) }
  scope :by_level, ->(level) { where(level: level) }
  
  CATEGORIES = ['Matemáticas', 'Programación', 'Ofimática'].freeze
  LEVELS = ['Básico', 'Intermedio', 'Avanzado'].freeze
end
