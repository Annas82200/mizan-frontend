"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Card } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface HealthScoreChartProps {
  data: Array<{
    date: string;
    score: number;
    benchmark?: number;
  }>;
}

function HealthScoreChart({ data }: HealthScoreChartProps) {
  const chartData = {
    labels: data.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: "Your Score",
        data: data.map(d => d.score),
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Industry Benchmark",
        data: data.map(d => d.benchmark || 65),
        borderColor: "rgb(156, 163, 175)",
        borderDash: [5, 5],
        backgroundColor: "transparent",
        fill: false,
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className="h-[300px]">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default function DashboardPage() {
  // Sample data for the chart
  const sampleData = [
    { date: "2024-01-01", score: 72, benchmark: 65 },
    { date: "2024-02-01", score: 75, benchmark: 65 },
    { date: "2024-03-01", score: 78, benchmark: 66 },
    { date: "2024-04-01", score: 82, benchmark: 67 },
    { date: "2024-05-01", score: 85, benchmark: 68 },
    { date: "2024-06-01", score: 88, benchmark: 69 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Monitor your organizational health and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Health Score Trend</h2>
          <HealthScoreChart data={sampleData} />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Health Score</span>
              <span className="text-2xl font-bold text-green-600">88</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Industry Benchmark</span>
              <span className="text-lg font-semibold text-gray-800">69</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Improvement</span>
              <span className="text-lg font-semibold text-blue-600">+16 points</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
