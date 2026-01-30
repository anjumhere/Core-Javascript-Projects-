// Tax Slabs extracted from your formula
const taxSlabs = [
  { limit: 600000, rate: 0, fixedTax: 0, previousLimit: 0 },
  { limit: 1200000, rate: 0.01, fixedTax: 0, previousLimit: 600000 },
  { limit: 2200000, rate: 0.11, fixedTax: 6000, previousLimit: 1200000 },
  { limit: 3200000, rate: 0.23, fixedTax: 116000, previousLimit: 2200000 },
  { limit: 4100000, rate: 0.3, fixedTax: 346000, previousLimit: 3200000 },
  { limit: Infinity, rate: 0.35, fixedTax: 616000, previousLimit: 4100000 },
];

function switchTab(tabName) {
  // Hide all tabs
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach((content) => content.classList.remove("active"));

  // Remove active class from all tabs
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => tab.classList.remove("active"));

  // Show selected tab
  document.getElementById(tabName).classList.add("active");
  event.target.classList.add("active");
}

function calculateTax(income) {
  // If income is below first limit, no tax
  if (income <= taxSlabs[0].limit) {
    return 0;
  }

  // Find the correct slab
  for (let i = 0; i < taxSlabs.length; i++) {
    if (income <= taxSlabs[i].limit) {
      const taxableAmount = income - taxSlabs[i].previousLimit;
      const tax = taxSlabs[i].fixedTax + taxableAmount * taxSlabs[i].rate;
      return tax;
    }
  }

  // Default case (shouldn't reach here)
  return 0;
}

function calculateSalaryTax() {
  const salary = parseFloat(document.getElementById("annualSalary").value);
  const type = document.getElementById("salaryType").value;

  if (!salary || salary < 0) {
    alert("Please enter a valid salary amount");
    return;
  }

  const annualTax = calculateTax(salary);
  const monthlyTax = annualTax / 12;
  const netAnnualSalary = salary - annualTax;
  const netMonthlySalary = netAnnualSalary / 12;
  const effectiveRate =
    salary > 0 ? ((annualTax / salary) * 100).toFixed(2) : 0;

  let resultHTML = "";

  if (type === "annual") {
    resultHTML = `
                    <div class="result-item">
                        <span class="result-label">Gross Annual Salary:</span>
                        <span class="result-value">PKR ${salary.toLocaleString()}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Annual Tax:</span>
                        <span class="result-value">PKR ${annualTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Effective Tax Rate:</span>
                        <span class="result-value">${effectiveRate}%</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Net Annual Salary:</span>
                        <span class="result-value">PKR ${netAnnualSalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                `;
  } else {
    resultHTML = `
                    <div class="result-item">
                        <span class="result-label">Gross Monthly Salary:</span>
                        <span class="result-value">PKR ${(salary / 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Monthly Tax:</span>
                        <span class="result-value">PKR ${monthlyTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Effective Tax Rate:</span>
                        <span class="result-value">${effectiveRate}%</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Net Monthly Salary:</span>
                        <span class="result-value">PKR ${netMonthlySalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                `;
  }

  const resultBox = document.getElementById("salaryResult");
  resultBox.innerHTML = resultHTML;
  resultBox.classList.add("show");
}

function calculateBusinessTax() {
  const income = parseFloat(document.getElementById("businessIncome").value);

  if (!income || income < 0) {
    alert("Please enter a valid income amount");
    return;
  }

  const tax = calculateTax(income);
  const netIncome = income - tax;
  const effectiveRate = income > 0 ? ((tax / income) * 100).toFixed(2) : 0;

  const resultHTML = `
                <div class="result-item">
                    <span class="result-label">Gross Business Income:</span>
                    <span class="result-value">PKR ${income.toLocaleString()}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Tax Payable:</span>
                    <span class="result-value">PKR ${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Effective Tax Rate:</span>
                    <span class="result-value">${effectiveRate}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Net Income After Tax:</span>
                    <span class="result-value">PKR ${netIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            `;

  const resultBox = document.getElementById("businessResult");
  resultBox.innerHTML = resultHTML;
  resultBox.classList.add("show");
}

function compareIncome() {
  const start = parseFloat(document.getElementById("startIncome").value);
  const end = parseFloat(document.getElementById("endIncome").value);
  const step = parseFloat(document.getElementById("stepIncome").value);

  if (!start || !end || !step || start < 0 || end < start || step <= 0) {
    alert("Please enter valid values");
    return;
  }

  let resultHTML =
    '<h3 style="color: #667eea; margin-bottom: 15px;">Tax Comparison</h3>';

  for (let income = start; income <= end; income += step) {
    const tax = calculateTax(income);
    const netIncome = income - tax;
    const effectiveRate = income > 0 ? ((tax / income) * 100).toFixed(2) : 0;

    resultHTML += `
                    <div class="slab-item">
                        <div><strong>Income: PKR ${income.toLocaleString()}</strong></div>
                        <div style="margin-top: 8px;">
                            Tax: PKR ${tax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 
                            (${effectiveRate}%) | 
                            Net: PKR ${netIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                    </div>
                `;
  }

  const resultBox = document.getElementById("compareResult");
  resultBox.innerHTML = resultHTML;
  resultBox.classList.add("show");
}
