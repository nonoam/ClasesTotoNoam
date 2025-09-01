// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Animate numbers on scroll
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.dataset.counter);
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
          } else {
            element.textContent = Math.round(current);
          }
        }, 20);
        
        numberObserver.unobserve(element);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-counter]').forEach(element => {
    numberObserver.observe(element);
  });

  // Flash messages auto-hide
  setTimeout(() => {
    document.querySelectorAll('.alert').forEach(alert => {
      alert.style.transition = 'opacity 0.5s';
      alert.style.opacity = '0';
      setTimeout(() => alert.remove(), 500);
    });
  }, 5000);

  // Calendar interactions
  const calendarDays = document.querySelectorAll('.calendar-day');
  calendarDays.forEach(day => {
    day.addEventListener('click', function() {
      calendarDays.forEach(d => d.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // Form validations
  const bookingForm = document.querySelector('#new_booking');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      const classType = document.querySelector('input[name="booking[class_type]"]:checked').value;
      const numStudents = document.querySelector('#booking_number_of_students').value;
      
      if (classType === 'group' && numStudents < 3) {
        e.preventDefault();
        alert('Las clases grupales requieren mínimo 3 estudiantes');
        return false;
      }
    });

    // Update price dynamically
    const updatePrice = () => {
      const classType = document.querySelector('input[name="booking[class_type]"]:checked').value;
      const numStudents = parseInt(document.querySelector('#booking_number_of_students').value) || 1;
      const priceDisplay = document.querySelector('[data-target="booking.totalPrice"]');
      
      let total = 0;
      if (classType === 'individual') {
        total = 25000;
        document.querySelector('[data-target="booking.groupSize"]').style.display = 'none';
      } else {
        total = numStudents * 10000;
        document.querySelector('[data-target="booking.groupSize"]').style.display = 'block';
      }
      
      if (priceDisplay) {
        priceDisplay.textContent = total.toLocaleString('es-CL');
      }
    };

    document.querySelectorAll('input[name="booking[class_type]"]').forEach(radio => {
      radio.addEventListener('change', updatePrice);
    });

    const numStudentsField = document.querySelector('#booking_number_of_students');
    if (numStudentsField) {
      numStudentsField.addEventListener('input', updatePrice);
    }
  }

  // Load available schedules when tutor is selected
  const tutorSelect = document.querySelector('#booking_tutor_id');
  if (tutorSelect) {
    tutorSelect.addEventListener('change', async function() {
      const tutorId = this.value;
      if (tutorId) {
        try {
          const response = await fetch(`/schedules?tutor_id=${tutorId}`, {
            headers: {
              'Accept': 'application/json'
            }
          });
          const schedules = await response.json();
          
          const scheduleSelect = document.querySelector('#booking_schedule_id');
          scheduleSelect.innerHTML = '<option value="">Selecciona un horario</option>';
          
          schedules.forEach(schedule => {
            const option = document.createElement('option');
            option.value = schedule.id;
            option.textContent = `${schedule.start_time} - ${schedule.end_time}`;
            scheduleSelect.appendChild(option);
          });
        } catch (error) {
          console.error('Error loading schedules:', error);
        }
      }
    });
  }

  // Parallax effect on hero section
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // Add loading states to forms
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function() {
      const submitBtn = this.querySelector('[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }
    });
  });
});

// Turbo-specific events
document.addEventListener('turbo:load', () => {
  console.log('Page loaded with Turbo');
});

document.addEventListener('turbo:before-fetch-request', (event) => {
  console.log('Fetching...', event.detail.url);
});

// Export functions for Stimulus controllers if needed
window.TutoringApp = {
  updateSchedules: async (tutorId) => {
    // Implementation here
  },
  
  calculatePrice: (type, students) => {
    if (type === 'individual') return 25000;
    return students * 10000;
  }
};