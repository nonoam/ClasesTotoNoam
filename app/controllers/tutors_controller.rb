class TutorsController < ApplicationController
  def index
    @tutors = Tutor.includes(:subjects, :testimonials).all
  end
  
  def show
    @tutor = Tutor.find(params[:id])
    @testimonials = @tutor.testimonials.recent
    @subjects = @tutor.subjects
    @available_schedules = @tutor.available_schedules
  end
  
  def experience
    @tutors = Tutor.includes(:testimonials, :subjects).all
    @testimonials = Testimonial.recent.includes(:tutor)
  end
end
