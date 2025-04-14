console.log("Hello From Js File...");

const allInputs = document.querySelectorAll("input");
const billErrorMsg = document.getElementById("billErrorMsg");
const tipErrorMsg = document.getElementById("tipErrorMsg");
const personErrorMsg = document.getElementById("personErrorMsg");
const tipPercentageBtns = document.querySelectorAll(
  ".tips-percentage-container button"
);
const tipPerPersonEl = document.getElementById("tipPerPerson");
const totalBillPerPersonEl = document.getElementById("totalBillPerPerson");

let bill = 0;
let tipPercentage = 0;
let person = 0;

allInputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value;

    // Input validation
    if (!value || value <= 0) {
      input.classList.remove("hideInputError");
      input.classList.add("inputError");
    } else {
      input.classList.remove("inputError");
      input.classList.add("hideInputError");

      if (index === 0) {
        bill = Number(value);
        billErrorMsg.style.display = "none";
      } else if (index === 1) {
        tipPercentage = Number(value);
        tipErrorMsg.style.display = "none";
      } else if (index === 2) {
        person = Number(value);
        personErrorMsg.style.display = "none";
      }
      if (bill > 0 && tipPercentage > 0 && person > 0) {
        calculateTip(bill, tipPercentage, person);
      }
    }

    if (index === 0 && (!value || value <= 0)) {
      billErrorMsg.style.display = "block";
    } else if (index === 1 && (!value || value <= 0)) {
      tipErrorMsg.style.display = "block";
    } else if (index === 2 && (!value || value <= 0)) {
      personErrorMsg.style.display = "block";
    }
  });
});

tipPercentageBtns.forEach((tipPercentageBtn) => {
  tipPercentageBtn.addEventListener("click", () => {
    const value = tipPercentageBtn.textContent.split("%")[0];
    allInputs[1].value = value;
    tipPercentage = Number(value);
    tipErrorMsg.style.display = "none";
    if (bill > 0 && tipPercentage > 0 && person > 0) {
      calculateTip(bill, tipPercentage, person);
    }
  });
});

function calculateTip(bill, tipPercentage, person) {
  let totalTip = (tipPercentage / 100) * bill;
  let tipPerPerson = (totalTip / person).toFixed(2);
  let billPerPerson = (bill / person).toFixed(2);
  let totalPerPerson = (
    parseFloat(billPerPerson) + parseFloat(tipPerPerson)
  ).toFixed(2);

  tipPerPersonEl.innerText = `$${tipPerPerson}`;
  totalBillPerPersonEl.innerText = `$${totalPerPerson}`;
}

document.getElementById("resetBtn").addEventListener("click", () => {
  tipPerPersonEl.innerText = "$0.00";
  totalBillPerPersonEl.innerText = "$0.00";
  allInputs[0].value = "";
  allInputs[1].value = "";
  allInputs[2].value = "";
});
