class Tutor < ApplicationRecord
  has_and_belongs_to_many :subjects
  has_many :schedules, dependent: :destroy
  has_many :bookings, dependent: :destroy
  has_many :testimonials, dependent: :destroy
  
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, 
            format: { with: URI::MailTo::EMAIL_REGEXP }
  
  def available_schedules(date_range = 1.month.from_now)
    schedules.where(available: true)
             .where('start_time >= ? AND start_time <= ?', 
                    Time.current, date_range)
             .order(:start_time)
  end
  
  def upcoming_bookings
    bookings.where('class_date >= ?', Time.current)
            .where(status: 'confirmed')
            .order(:class_date)
  end
end
