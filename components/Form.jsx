"use client"
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
  const [rebate, setRebate] = useState("")
  const [payToBank, setpayToBank] = useState("")
  const [monthlyPayment, setMonthlyPayment] = useState("")
  const [paidToDate, setpaidToDate] = useState("")

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
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 nft">
            <form class="space-y-6" onSubmit={calculateLoan} >
                {/* <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h5> */}
                <div class="mb-6">
                  <label
                    for="loan-amount"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Car/Personal Loan Amount
                  </label>
                  <div class="flex">
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-white dark:border-gray-600">
                      RM
                    </span>
                    <input
                      type="number"
                      id="loan-amount"
                      className="shadow-lg rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="50,000"
                      required
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      />
                  </div>
                </div>

                <div class="mb-6">
                  <label
                    for="interest-rate"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Interest Rate p.a %
                  </label>
                  <div class="flex">
                    <input
                      type="number"
                      id="interest-rate"
                      className="shadow-lg rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="3.5"
                      required
                      step=".01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                    />
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-white dark:border-gray-600">
                      %
                    </span>
                  </div>
                </div>
                <div class="mb-6">
                  <label
                    for="tenure"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Tenure
                  </label>
                  <div class="flex">
                    <input
                      type="number"
                      id="tenure"
                      className="shadow-lg rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="7"
                      required
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                    />
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-white dark:border-gray-600">
                      Years
                    </span>
                  </div>
                </div>

                <div class="mb-6">
                  <label
                    for="months-paid"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Total Months-Paid-To-Date
                  </label>
                  <div class="flex">
                    <input
                      type="number"
                      id="months-paid"
                      className="shadow-lg rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="20"
                      required
                      value={numPaid}
                      onChange={(e) => setNumPaid(e.target.value)}
                      />
                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-white dark:border-gray-600">
                      Months
                    </span>
                  </div>
                </div>

                <div class="flex justify-center">
                  <button
                    type="submit"
                    class="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                    Calculate
                  </button>
                </div>
            </form>
        </div>
        {/* Stats Form */}
        <div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 stats">
            <div class="flex items-center justify-between mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Stats</h5>
          </div>
          <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-1 min-w-0">
                                <p class="text-lg font-medium text-gray-900 truncate dark:text-white">
                                    Estimated Settlement =
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-green-400">
                            RM {settlement ? settlement : 0}
                            </div>
                        </div>
                    </li>
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-1 min-w-0">
                                <p class="text-lg font-medium text-gray-900 truncate dark:text-white">
                                    Rebate Amount =
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-green-400">
                                RM {rebate ? rebate : 0}
                            </div>
                        </div>
                    </li>
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-1 min-w-0">
                                <p class="text-lg font-medium text-gray-900 truncate dark:text-white">
                                    Total Payment to Bank =
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-green-400">
                            RM {payToBank ? payToBank : 0}
                            </div>
                        </div>
                    </li>
                    <li class="py-3 sm:py-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-1 min-w-0">
                                <p class="text-lg font-medium text-gray-900 truncate dark:text-white">
                                    Monthly Installment =
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-green-400">
                            RM {monthlyPayment ? monthlyPayment : 0}
                            </div>
                        </div>
                    </li>
                    <li class="pt-3 pb-0 sm:pt-4">
                        <div class="flex items-center space-x-4">
                            <div class="flex-1 min-w-0">
                                <p class="text-lg font-medium text-gray-900 truncate dark:text-white">
                                    Amount Paid-to-Date =
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-green-400">
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
