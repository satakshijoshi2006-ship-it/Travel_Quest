document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("booking-form");
  const errorEl = document.getElementById("error-message");
  const paymentSelect = document.getElementById("payment-method");
  const creditCardFields = document.getElementById("credit-card-fields");
  const upiField = document.getElementById("upi-field");

  // Show/hide payment fields
  if (paymentSelect) {
    paymentSelect.addEventListener("change", function () {
      if (this.value === "Credit Card") {
        creditCardFields.style.display = "block";
        upiField.style.display = "none";
      } else if (this.value === "UPI") {
        creditCardFields.style.display = "none";
        upiField.style.display = "block";
      } else {
        creditCardFields.style.display = "none";
        upiField.style.display = "none";
      }
    });
  }

  // Handle form submission
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        name: form.name?.value.trim(),
        email: form.email?.value.trim(),
        gender: form.gender?.value,
        destination: form.destination?.value.trim(),
        date: form.date?.value,
        payment: form.payment?.value
      };

      try {
        const res = await fetch("http://localhost:5000/api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        if (res.ok) {
          window.location.href = "confirmation.html";
        } else {
          const data = await res.json();
          errorEl.textContent = data.error || "Booking failed.";
        }
      } catch (err) {
        errorEl.textContent = "Network error. Please try again.";
      }
    });
  }
});
