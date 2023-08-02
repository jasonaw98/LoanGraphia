"use client"
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Colors } from 'chart.js';

const LineChart = ({chartLabel, rebate, remainingAmount, paidAmount, paidToBankAmount}) => {
    Chart.register(Colors);
    const canvasEl = useRef(null);

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
        blue: "#0000FF",
        green: "#00FF00",
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
          data: rebate,
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
          title: {
            display: true,
            text: 'Loan Analysis Chart',
            color: 'white',
            font: {
              size: 23,
              weight: 'bold',
          },
        },
          legend: {
            position: 'top',
          },
          tooltip: {
            position: 'nearest',
            backgroundColor: 'rgba(20, 32, 39, 0.9)',
            titleSpacing: 10,
            titleFont: {
              size: 16,
              weight: 'bold',
          },
          bodySpacing: 5,
            bodyFont: {
              size: 15,
              weight: 'bold',
          },
          },
          colors: {
            enabled: true,
            forceOverride: true,
          },
          legend: {
            labels: {
              color:'white',
                font: {
                    size: 16,
                    weight: '',
                },
                usePointStyle: true,
                pointStyle: 'rectRounded'
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
            ticks: {
              color: 'white',
              font: {
                size: 14,
                weight: '',
            },
            },
            display: true,
            title: {
              display: true,
              text: 'Remaining Months',
              color: 'white',
              font: {
                size: 18,
                weight: 'bold',
            },
            padding: {top: 12, left: 0, right: 0, bottom: 0}
            },
            grid: {
              drawOnChartArea: grid_line,
              color: '#36454F',
            }
          },
          y: {
            ticks: {
              color: 'white',
              font: {
                size: 14,
                weight: '',
            },
            },
            display: true,
            title: {
              display: true,
              text: 'Amount RM',
              color: 'white',
              font: {
                size: 16,
                weight: 'bold',
            },
            padding: {top: 0, left: 0, right: 0, bottom: 13}
            },
            grid: {
              drawOnChartArea: grid_line,
              color: '#36454F',
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
      // plugins: [plugin],
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <div className="line_chart">
      {/* <span className="flex justify-center font-bold">Loan Settlement Chart</span> */}
      <canvas id="myChart" ref={canvasEl} className="chart_canvas" />
    </div>
  );
}

export default LineChart