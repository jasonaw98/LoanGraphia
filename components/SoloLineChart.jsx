"use client"
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Colors } from 'chart.js';

const SoloLineChart = () => {
    Chart.register(Colors);
    const canvasEl = useRef(null);
    
    const [chartLabel, setchartLabel] = useState("")
    const [Rebate, setRebate] = useState("")
    const [remainingAmount, setremainingAmount] = useState("")
    const [paidAmount, setpaidAmount] = useState("")
    const [paidToBankAmount, setpaidToBankAmount] = useState("")
    
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
    setchartLabel(months);
    setRebate(estimatedRebateArray);
    setremainingAmount(remainingAmountArray);
    setpaidAmount(amountPaidArray);
    setpaidToBankAmount(totalPaymentToBankArray);
    };

    const plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, args, options) => {
        const {ctx} = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = options.color || '#99ffff';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
        }
    };

    const colors = {
        purple: {
        default: "rgba(149, 76, 233, 1)",
        half: "rgba(149, 76, 233, 0.5)",
        quarter: "rgba(149, 76, 233, 0.25)",
        zero: "rgba(149, 76, 233, 0)"
        },
        indigo: {
        default: "rgba(80, 102, 120, 1)",
        quarter: "rgba(80, 102, 120, 0.25)"
        },
        red : '#FF0000',
        blue: "#1f24cc",
        green: "#35b031",
        orange: "#FFA500",
    };

  const filling = false;
  const pointerRadius = 2;
  useEffect(() => {
    const ctx = canvasEl.current.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const data = {
      labels: chartLabel,
      datasets: [
        {
          backgroundColor: gradient,
          label: "Rebate",
          data: Rebate,
          fill: filling,
          borderWidth: 2,
          lineTension: 0.4,
          pointRadius: pointerRadius,
          borderColor: colors.red,
          backgroundColor: colors.red,
        },
        {
          backgroundColor: gradient,
          label: "To Pay as Settlement",
          data: remainingAmount,
          fill: filling,
          borderWidth: 2,
          lineTension: 0.4,
          pointRadius: pointerRadius,
          borderColor: colors.blue,
          backgroundColor: colors.blue,
        },
        {
          backgroundColor: gradient,
          label: "Total Paid-to-Date Amount",
          data: paidAmount,
          fill: filling,
          borderWidth: 2,
          lineTension: 0.4,
          pointRadius: pointerRadius,
          borderColor: colors.green,
          backgroundColor: colors.green,
        },
        {
          backgroundColor: gradient,
          label: "Total Amount Paid For Car after Settlement",
          data: paidToBankAmount,
          fill: filling,
          borderWidth: 2,
          lineTension: 0.4,
          pointRadius: pointerRadius,
          borderColor: colors.orange,
          backgroundColor: colors.orange,
        },
      ]
    };

    const grid_line = true;

    const config = {
      type: "line",
      data: data,
      options: {
        minWidth: 100,
        maxWidth: 200,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          customCanvasBackgroundColor: {
            color: 'white',
          },
          tooltip: {
            position: 'nearest',
          },
          colors: {
            enabled: true,
            forceOverride: false,
          },
          legend: {
            labels: {
                font: {
                    size: 13,
                    weight: 'bold',
                },
                usePointStyle: false,
            }
        }
        },
        interaction: {
          mode: 'nearest',
            axis: 'x',
          intersect: false,
          // hoverOffset: 1
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Remaining Months',
              font: {
                size: 15,
                weight: 'bold',
            },
            padding: {top: 12, left: 0, right: 0, bottom: 0}
            },
            grid: {
              drawOnChartArea: grid_line,
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Amount RM',
              font: {
                size: 15,
                weight: 'bold',
            },
            padding: {top: 0, left: 0, right: 0, bottom: 13}
            },
            grid: {
              drawOnChartArea: grid_line,
            }
          }
        },
        transitions: {
          show: {
            animations: {
              x: {
                from: 0
              },
              y: {
                from: 0
              }
            }
          },
          hide: {
            animations: {
              x: {
                to: 0
              },
              y: {
                to: 0
              }
            }
          }
        }
      },
      plugins: [plugin],
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <div className="line_chart">
      <span className="flex justify-center">Loan Settlement Chart</span>
      <canvas id="myChart" ref={canvasEl} height="150" />
      <button onClick={() => calculatePayments(35000, 2.35,7,20)}>Click</button>
    </div>
  );
}

export default SoloLineChart