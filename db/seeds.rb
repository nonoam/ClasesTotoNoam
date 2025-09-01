# Clear existing data
puts "Cleaning database..."
Booking.destroy_all
Schedule.destroy_all
Testimonial.destroy_all
Subject.destroy_all
Tutor.destroy_all

puts "Creating tutors..."

tutor1 = Tutor.create!(
  name: "Dr. Carlos Mendoza",
  email: "carlos.mendoza@tutorschedule.cl",
  phone: "+56 9 1234 5678",
  bio: "Doctor en Matemáticas Aplicadas con más de 10 años de experiencia.",
  education: "PhD en Matemáticas - Universidad de Chile",
  experience: "Profesor Asociado Universidad de Chile",
  years_experience: 10
)

tutor2 = Tutor.create!(
  name: "Ing. María González",
  email: "maria.gonzalez@tutorschedule.cl",
  phone: "+56 9 8765 4321",
  bio: "Ingeniera en Computación con experiencia en desarrollo de software.",
  education: "Ingeniería Civil en Computación - Universidad de Chile",
  experience: "Senior Software Engineer en Microsoft",
  years_experience: 8
)

puts "Creating subjects..."

# Matemáticas
calc1 = Subject.create!(
  name: "Cálculo 1",
  description: "Límites, derivadas, integrales",
  level: "Intermedio",
  category: "Matemáticas"
)

calc2 = Subject.create!(
  name: "Cálculo 2",
  description: "Cálculo multivariable",
  level: "Avanzado",
  category: "Matemáticas"
)

# Programación
intro_prog = Subject.create!(
  name: "Introducción a la Programación",
  description: "Conceptos básicos",
  level: "Básico",
  category: "Programación"
)

python = Subject.create!(
  name: "Python Avanzado",
  description: "POO, frameworks",
  level: "Avanzado",
  category: "Programación"
)

cpp = Subject.create!(
  name: "C++ Programación",
  description: "POO, STL",
  level: "Avanzado",
  category: "Programación"
)

excel = Subject.create!(
  name: "Excel Avanzado",
  description: "Fórmulas, macros",
  level: "Intermedio",
  category: "Ofimática"
)

puts "Associating subjects with tutors..."
tutor1.subjects << [calc1, calc2, excel]
tutor2.subjects << [intro_prog, python, cpp, excel]

puts "Creating schedules..."
# Crear horarios para las próximas 2 semanas
14.times do |i|
  date = i.days.from_now
  next if date.saturday? || date.sunday?
  
  Schedule.create!(
    tutor: tutor1,
    start_time: date.change(hour: 9),
    end_time: date.change(hour: 10, min: 30),
    available: true
  )
  
  Schedule.create!(
    tutor: tutor2,
    start_time: date.change(hour: 14),
    end_time: date.change(hour: 15, min: 30),
    available: true
  )
end

puts "Creating testimonials..."
Testimonial.create!(
  tutor: tutor1,
  student_name: "Juan Pérez",
  content: "Excelente profesor!",
  rating: 5
)

Testimonial.create!(
  tutor: tutor2,
  student_name: "Ana Silva",
  content: "Muy buena profesora!",
  rating: 5
)

puts "Seeds completed!"
