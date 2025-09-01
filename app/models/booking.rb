class Booking < ApplicationRecord
  belongs_to :tutor
  belongs_to :subject
  belongs_to :schedule
  
  validates :student_name, presence: true
  validates :student_email, presence: true, 
            format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :class_date, presence: true
  validates :class_type, inclusion: { in: %w[individual group] }
  validates :number_of_students, numericality: { greater_than: 0 }
  validate :group_class_minimum_students
  
  before_save :calculate_price
  after_create :mark_schedule_as_booked
  
  scope :pending, -> { where(status: 'pending') }
  scope :confirmed, -> { where(status: 'confirmed') }
  scope :upcoming, -> { where('class_date >= ?', Time.current) }
  
  INDIVIDUAL_PRICE = 25000
  GROUP_PRICE_PER_PERSON = 10000
  MINIMUM_GROUP_SIZE = 3
  
  def confirm!
    update!(status: 'confirmed')
  end
  
  def cancel!
    update!(status: 'cancelled')
    schedule.update!(available: true)
  end
  
  private
  
  def calculate_price
    self.total_price = if class_type == 'individual'
                         INDIVIDUAL_PRICE
                       else
                         number_of_students * GROUP_PRICE_PER_PERSON
                       end
  end
  
  def group_class_minimum_students
    if class_type == 'group' && number_of_students < MINIMUM_GROUP_SIZE
      errors.add(:number_of_students, 
                 "debe ser mínimo #{MINIMUM_GROUP_SIZE} para clases grupales")
    end
  end
  
  def mark_schedule_as_booked
    schedule.book!
  end
end
