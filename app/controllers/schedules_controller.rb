class SchedulesController < ApplicationController
  def index
    @schedules = Schedule.available.future
    @schedules = @schedules.where(tutor_id: params[:tutor_id]) if params[:tutor_id]
    
    respond_to do |format|
      format.html
      format.json { render json: @schedules }
    end
  end
  
  def availability
    @date = params[:date] ? Date.parse(params[:date]) : Date.today
    @tutors = Tutor.includes(:schedules).all
    @available_slots = Schedule.available
                               .where('start_time >= ? AND start_time <= ?', 
                                      @date.beginning_of_week, 
                                      @date.end_of_week)
                               .group_by { |s| s.start_time.to_date }
  end
end
