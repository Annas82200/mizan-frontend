"use client";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface CylinderRadarProps {
  data: Array<{
    cylinder: string;
    score: number;
    benchmark?: number;
  }>;
}

export default function CylinderRadar({ data }: CylinderRadarProps) {
  const chartData = {
    labels: data.map(d => d.cylinder),
    datasets: [
      {
        label: "Current State",
        data: data.map(d => d.score),
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        borderColor: "rgb(99, 102, 241)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(99, 102, 241)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(99, 102, 241)"
      },
      {
        label: "Target",
        data: data.map(d => d.benchmark || 75),
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        borderColor: "rgb(34, 197, 94)",
        borderWidth: 2,
        borderDash: [5, 5],
        pointBackgroundColor: "rgb(34, 197, 94)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(34, 197, 94)"
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  return (
    <div className="h-[300px]">
      <Radar data={chartData} options={options} />
    </div>
  );
}
