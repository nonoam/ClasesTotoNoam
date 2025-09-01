class Schedule < ApplicationRecord
  belongs_to :tutor
  has_one :booking
  
  validates :start_time, presence: true
  validates :end_time, presence: true
  validate :end_time_after_start_time
  
  scope :available, -> { where(available: true) }
  scope :future, -> { where('start_time > ?', Time.current) }
  scope :for_date, ->(date) { 
    where('DATE(start_time) = ?', date.to_date) 
  }
  
  def duration_in_minutes
    ((end_time - start_time) / 60).to_i
  end
  
  def book!
    update!(available: false)
  end
  
  private
  
  def end_time_after_start_time
    return unless start_time && end_time
    errors.add(:end_time, 'debe ser después del inicio') if end_time <= start_time
  end
end
