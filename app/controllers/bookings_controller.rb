class BookingsController < ApplicationController
  before_action :set_booking, only: [:show, :confirm, :cancel]
  
  def new
    @booking = Booking.new
    @schedule = Schedule.find(params[:schedule_id]) if params[:schedule_id]
    @tutors = Tutor.all
    @subjects = Subject.all
  end
  
  def create
    @booking = Booking.new(booking_params)
    
    if @booking.save
      flash[:success] = '¡Reserva creada exitosamente!'
      redirect_to booking_path(@booking)
    else
      flash.now[:error] = 'Hubo un error al crear la reserva.'
      render :new, status: :unprocessable_entity
    end
  end
  
  def show
  end
  
  def confirm
    if @booking.confirm!
      flash[:success] = 'Reserva confirmada'
    else
      flash[:error] = 'No se pudo confirmar'
    end
    redirect_to @booking
  end
  
  def cancel
    if @booking.cancel!
      flash[:info] = 'Reserva cancelada'
    else
      flash[:error] = 'No se pudo cancelar'
    end
    redirect_to bookings_path
  end
  
  def check_availability
    schedule = Schedule.find(params[:schedule_id])
    render json: { available: schedule.available }
  end
  
  private
  
  def set_booking
    @booking = Booking.find(params[:id])
  end
  
  def booking_params
    params.require(:booking).permit(:tutor_id, :subject_id, :schedule_id,
                                   :student_name, :student_email, :student_phone,
                                   :class_date, :class_type, :number_of_students,
                                   :notes)
  end
end
