import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["scheduleSelect", "groupSize", "priceDisplay", "totalPrice"]
  
  connect() {
    console.log("Booking controller connected")
    this.updatePrice()
  }
  
  updatePrice() {
    const classType = document.querySelector('input[name="booking[class_type]"]:checked')?.value
    const numStudents = parseInt(document.querySelector('#booking_number_of_students')?.value) || 1
    
    let total = 0
    if (classType === 'individual') {
      total = 25000
      if (this.hasGroupSizeTarget) {
        this.groupSizeTarget.style.display = 'none'
      }
    } else if (classType === 'group') {
      total = numStudents * 10000
      if (this.hasGroupSizeTarget) {
        this.groupSizeTarget.style.display = 'block'
      }
    }
    
    if (this.hasTotalPriceTarget) {
      this.totalPriceTarget.textContent = total.toLocaleString('es-CL')
    }
  }
}
