"use client";
import { useState } from "react";
import LineChart from "@/components/LineChart";

const Form = () => {
  // For Calculate Loan
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [numPaid, setNumPaid] = useState("");

  // For Stats
  const [settlement, setSettlement] = useState("");
  const [rebate, setRebate] = useState("");
  const [payToBank, setpayToBank] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [paidToDate, setpaidToDate] = useState("");

  // State variables for chart values
  const [chartLabel, setChartLabel] = useState([]);
  const [rebateChart, setRebateChart] = useState([]);
  const [remainingAmount, setRemainingAmount] = useState([]);
  const [paidAmount, setPaidAmount] = useState([]);
  const [paidToBankAmount, setPaidToBankAmount] = useState([]);

  const calculatePayments = (loanAmount, interestRate, tenure, numPaid) => {
    console.log("loanAmount " + loanAmount);
    console.log("interestRate " + interestRate);
    console.log("tenure " + tenure);
    console.log("numberPaid " + numPaid);

    const tenureInMonth = tenure * 12;
    let remainingMonth = tenureInMonth - numPaid;

    const months = [];
    const totalPaymentToBankArray = [];
    const amountPaidArray = [];
    const remainingAmountArray = [];
    const estimatedRebateArray = [];
    const interestRateWhole = loanAmount * ((interestRate / 100) * tenure);
    const totalPaymentToBank = interestRateWhole + +loanAmount;
    const monthlyPayment = totalPaymentToBank / tenureInMonth;
    const monthlyPaymentFixed = monthlyPayment.toFixed(2);

    for (let i = numPaid; i <= tenureInMonth; i++) {
      const amountPaid = monthlyPayment * i;
      const amountPaidFixed = amountPaid.toFixed(2);

      const n = remainingMonth - 1;
      const extimatedRebateStep1Result = n * (n + 1);
      const extimatedRebateStep2Result = tenureInMonth * (tenureInMonth + 1);
      const extimatedRebateStep3Result = extimatedRebateStep1Result / extimatedRebateStep2Result * interestRateWhole;
      const extimatedRebateRounded = extimatedRebateStep3Result.toFixed(2);
      const remainingAmount = totalPaymentToBank - amountPaid - extimatedRebateRounded;
      const remainingAmountFixed = remainingAmount.toFixed(2);
      const newtotalPaymentToBank = remainingAmount + +amountPaid;
      const newtotalPaymentToBankFixed = newtotalPaymentToBank.toFixed(2);

      // Push values into the corresponding arrays
      months.push(i);
      totalPaymentToBankArray.push(newtotalPaymentToBankFixed);
      amountPaidArray.push(amountPaidFixed);
      remainingAmountArray.push(remainingAmountFixed);
      estimatedRebateArray.push(extimatedRebateRounded);

      remainingMonth--;
    }

    console.log("Interest Amount: RM", interestRateWhole);
    console.log("Monthly Payment: RM", monthlyPaymentFixed);
    console.log("Total Payment To Bank:", totalPaymentToBankArray);
    console.log("Paid-to-Date Amount:", amountPaidArray);
    console.log("To Pay as Settlement :RM", remainingAmountArray);
    console.log("Estimated Rebate:", estimatedRebateArray);
    setSettlement(remainingAmountArray[0]);
    setRebate(estimatedRebateArray[0]);
    setpayToBank(totalPaymentToBankArray[0]);
    setMonthlyPayment(monthlyPaymentFixed);
    setpaidToDate(amountPaidArray[0]);

    setChartLabel(months);
    setRebateChart(estimatedRebateArray);
    setRemainingAmount(remainingAmountArray);
    setPaidAmount(amountPaidArray);
    setPaidToBankAmount(totalPaymentToBankArray);
  };

  const calculateLoan = (e) => {
    e.preventDefault();
    calculatePayments(loanAmount, interestRate, tenure, numPaid);
  };
  return (
    <>
      <div className="formPage">
        <div className="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 bg-gray-900 border-gray-800 nft">
          <form className="space-y-6" onSubmit={calculateLoan}>
            {/* <h5 className="text-xl font-medium text-gray-900 text-white">Sign in to our platform</h5> */}
            <div className="mb-6">
              <label
                for="loan-amount"
                className="block mb-2 text-sm font-medium text-gray-900 text-white"
              >
                Car/Personal Loan Amount
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md bg-gray-600 text-white border-gray-600">
                  RM
                </span>
                <input
                  type="number"
                  id="loan-amount"
                  className="shadow-lg rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="50,000"
                  required
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                for="interest-rate"
                className="block mb-2 text-sm font-medium text-gray-900 text-white"
              >
                Interest Rate p.a %
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="interest-rate"
                  className="shadow-lg rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="3.5"
                  required
                  step=".01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-r-md bg-gray-600 text-white border-gray-600">
                  %
                </span>
              </div>
            </div>
            <div className="mb-6">
              <label
                for="tenure"
                className="block mb-2 text-sm font-medium text-gray-900 text-white"
              >
                Tenure
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="tenure"
                  className="shadow-lg rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="7"
                  required
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                />
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-r-md bg-gray-600 text-white border-gray-600">
                  Years
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label
                for="months-paid"
                className="block mb-2 text-sm font-medium text-gray-900 text-white"
              >
                Total Months-Paid-To-Date
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="months-paid"
                  className="shadow-lg rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="20"
                  required
                  value={numPaid}
                  onChange={(e) => setNumPaid(e.target.value)}
                />
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-r-md bg-gray-600 text-white border-gray-600">
                  Months
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
              >
                Calculate
              </button>
            </div>
          </form>
        </div>
        {/* Stats Form */}
        <div className="w-full max-w-md p-4 border border-gray-200 rounded-lg shadow sm:p-8 bg-gray-900 border-gray-800 stats">
          <div className="flex items-center justify-between mb-1">
            <h5 className="text-xl font-bold leading-none text-gray-900 text-white">
              Stats:
            </h5>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 divide-gray-700"
            >
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900 truncate text-white">
                      Estimated Settlement =
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 text-green-400">
                    RM {settlement ? settlement : 0}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900 truncate text-white">
                      Rebate Amount =
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 text-green-400">
                    RM {rebate ? rebate : 0}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900 truncate text-white">
                      Total Payment to Bank =
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 text-green-400">
                    RM {payToBank ? payToBank : 0}
                  </div>
                </div>
              </li>
              <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900 truncate text-white">
                      Monthly Installment =
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 text-green-400">
                    RM {monthlyPayment ? monthlyPayment : 0}
                  </div>
                </div>
              </li>
              <li className="pt-3 pb-0 sm:pt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900 truncate text-white">
                      Amount Paid-to-Date =
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 text-green-400">
                    RM {paidToDate ? paidToDate : 0}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <LineChart
        chartLabel={chartLabel}
        rebate={rebateChart}
        remainingAmount={remainingAmount}
        paidAmount={paidAmount}
        paidToBankAmount={paidToBankAmount}
      />
    </>
  );
};

export default Form;
