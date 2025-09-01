class BookingMailer < ApplicationMailer
  default from: 'noreply@tutorschedule.cl'
  
  def confirmation(booking)
    @booking = booking
    @tutor = booking.tutor
    @subject = booking.subject
    
    mail(
      to: @booking.student_email,
      subject: "Confirmación de Reserva - #{@subject.name}"
    )
  end
  
  def reminder(booking)
    @booking = booking
    @tutor = booking.tutor
    @subject = booking.subject
    
    mail(
      to: @booking.student_email,
      subject: "Recordatorio: Tu clase es mañana"
    )
  end
  
  def cancellation(booking)
    @booking = booking
    @tutor = booking.tutor
    @subject = booking.subject
    
    mail(
      to: @booking.student_email,
      subject: "Cancelación de Clase"
    )
  end
end
