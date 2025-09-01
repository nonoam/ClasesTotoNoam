class HomeController < ApplicationController
  def index
    @tutors = Tutor.includes(:subjects, :testimonials).all
    @featured_subjects = Subject.all.limit(6)
    @recent_testimonials = Testimonial.recent.limit(3)
  end
end
