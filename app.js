document.querySelector("#loan-form").addEventListener(
  "submit",
  function (e) {
    // Hide the loader
    document.querySelector("#loading").style.display = "block";
    // Hide the results
    document.querySelector("#results").style.display = "none";
    setTimeout(calculateResults, 1500);
    e.preventDefault();
  },
  { once: true }
);

function calculateResults(e) {
  // UI variables
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const year = document.querySelector("#year");
  const monthlyPayment = document.querySelector("#monthly_payment");
  const totalPayment = document.querySelector("#total_payment");
  const totalInterest = document.querySelector("#total_interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(year.value) * 12;

  // Calculate the monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // Hide the Loader
    document.querySelector("#loading").style.display = "none";
    // Show the Results
    document.querySelector("#results").style.display = "block";
  } else {
    showError("Please Check Your Numbers");
  }

  function showError(error) {
    // Hide the loader
    document.querySelector("#loading").style.display = "none";
    // Create HTML for the error
    let errorHtml = `
        <div class ="alert alert-danger">${error}</div> 
        `;
    document.querySelector(".card").insertAdjacentHTML("afterbegin", errorHtml);
    // Hide the alert after 2 seconds
    setTimeout(clearDiv, 2000);
  }
}
function clearDiv() {
  document.querySelector(".alert").remove();
}
