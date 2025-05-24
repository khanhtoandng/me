"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Dynamically import Chart.js components to prevent SSR issues
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});
const Pie = dynamic(() => import("react-chartjs-2").then((mod) => mod.Pie), {
  ssr: false,
});

// Register ChartJS components (only on client side)
if (typeof window !== "undefined") {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
}

// Line Chart Component
interface LineChartProps {
  data: Array<Record<string, any>>;
  xField: string;
  yField: string;
  category: string;
}

export function LineChart({ data, xField, yField, category }: LineChartProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<{
    labels: any[];
    datasets: any[];
  }>({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setMounted(true);

    const isDark = theme === "dark";
    const gridColor = isDark
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)";
    const textColor = isDark
      ? "rgba(255, 255, 255, 0.7)"
      : "rgba(0, 0, 0, 0.7)";

    setChartData({
      labels: data.map((item) => item[xField]),
      datasets: [
        {
          label: category,
          data: data.map((item) => item[yField]),
          borderColor: "#2563eb",
          backgroundColor: "rgba(37, 99, 235, 0.5)",
          tension: 0.2,
          fill: true,
        },
      ],
    });

    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            color: textColor,
          },
        },
        tooltip: {
          mode: "index" as const,
          intersect: false,
        },
      },
      scales: {
        x: {
          grid: {
            color: gridColor,
          },
          ticks: {
            color: textColor,
          },
        },
        y: {
          grid: {
            color: gridColor,
          },
          ticks: {
            color: textColor,
          },
          beginAtZero: true,
        },
      },
    });
  }, [data, theme, xField, yField, category]);

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        Loading chart...
      </div>
    );
  }

  return <Line data={chartData} options={chartOptions} />;
}

// Bar Chart Component
interface BarChartProps {
  data: Array<Record<string, any>>;
  xField: string;
  yField: string;
  category: string;
  horizontal?: boolean;
}

export function BarChart({
  data,
  xField,
  yField,
  category,
  horizontal = false,
}: BarChartProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<{
    labels: any[];
    datasets: any[];
  }>({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setMounted(true);

    const isDark = theme === "dark";
    const gridColor = isDark
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)";
    const textColor = isDark
      ? "rgba(255, 255, 255, 0.7)"
      : "rgba(0, 0, 0, 0.7)";

    setChartData({
      labels: data.map((item) => item[xField]),
      datasets: [
        {
          label: category,
          data: data.map((item) => item[yField]),
          backgroundColor: "rgba(37, 99, 235, 0.7)",
          borderColor: "#2563eb",
          borderWidth: 1,
        },
      ],
    });

    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: horizontal ? "y" : "x",
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            color: textColor,
          },
        },
        tooltip: {
          mode: "index" as const,
          intersect: false,
        },
      },
      scales: {
        x: {
          grid: {
            color: gridColor,
          },
          ticks: {
            color: textColor,
          },
          beginAtZero: true,
        },
        y: {
          grid: {
            color: gridColor,
          },
          ticks: {
            color: textColor,
          },
          beginAtZero: true,
        },
      },
    });
  }, [data, theme, xField, yField, category, horizontal]);

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        Loading chart...
      </div>
    );
  }

  return <Bar data={chartData} options={chartOptions} />;
}

// Pie Chart Component
interface PieChartProps {
  data: Array<Record<string, any>>;
  nameField: string;
  valueField: string;
}

export function PieChart({ data, nameField, valueField }: PieChartProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [chartData, setChartData] = useState<{
    labels: any[];
    datasets: any[];
  }>({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setMounted(true);

    const isDark = theme === "dark";
    const textColor = isDark
      ? "rgba(255, 255, 255, 0.7)"
      : "rgba(0, 0, 0, 0.7)";

    // Generate colors for each segment
    const backgroundColors = [
      "rgba(37, 99, 235, 0.7)", // Blue
      "rgba(220, 38, 38, 0.7)", // Red
      "rgba(5, 150, 105, 0.7)", // Green
      "rgba(217, 119, 6, 0.7)", // Orange
      "rgba(124, 58, 237, 0.7)", // Purple
      "rgba(236, 72, 153, 0.7)", // Pink
      "rgba(75, 85, 99, 0.7)", // Gray
    ];

    setChartData({
      labels: data.map((item) => item[nameField]),
      datasets: [
        {
          data: data.map((item) => item[valueField]),
          backgroundColor: backgroundColors.slice(0, data.length),
          borderColor: isDark
            ? "rgba(0, 0, 0, 0.2)"
            : "rgba(255, 255, 255, 0.8)",
          borderWidth: 1,
        },
      ],
    });

    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right" as const,
          labels: {
            color: textColor,
            padding: 20,
          },
        },
        tooltip: {
          callbacks: {
            label: function (context: any) {
              const label = context.label || "";
              const value = context.raw || 0;
              const total = context.dataset.data.reduce(
                (a: any, b: any) => a + b,
                0
              );
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
    });
  }, [data, theme, nameField, valueField]);

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        Loading chart...
      </div>
    );
  }

  return <Pie data={chartData} options={chartOptions} />;
}
