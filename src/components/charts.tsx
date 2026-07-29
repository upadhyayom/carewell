"use client";

/**
 * Chart.js wrappers — styled per the CareWell viz system.
 * Palette (validated for CVD + contrast): teal #0d9488, blue #2a78d6,
 * amber #eda100 (always paired with tooltips/labels), violet #4a3aa7.
 * Rules: one axis, hairline grid, thin marks, rounded bar ends,
 * tooltips on by default, legend only for >=2 series.
 */

import * as React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

export const seriesColors = ["#0d9488", "#2a78d6", "#eda100", "#4a3aa7"];
export const seriesFills = [
  "rgba(13,148,136,0.10)",
  "rgba(42,120,214,0.10)",
  "rgba(237,161,0,0.10)",
  "rgba(74,58,167,0.10)",
];

const ink = { primary: "#0a0f0e", secondary: "#5c6b68", muted: "#7c8a87", grid: "#eceff0" };

ChartJS.defaults.font.family =
  'var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';
ChartJS.defaults.font.size = 11;
ChartJS.defaults.color = ink.muted;

function baseTooltip() {
  return {
    backgroundColor: "#0a0f0e",
    titleColor: "#ffffff",
    bodyColor: "#d5dddb",
    padding: 10,
    cornerRadius: 10,
    displayColors: true,
    boxWidth: 8,
    boxHeight: 8,
    boxPadding: 4,
    usePointStyle: true,
    titleFont: { size: 11, weight: 600 as const },
    bodyFont: { size: 11 },
  };
}

function legendFor(seriesCount: number) {
  return {
    display: seriesCount >= 2,
    position: "top" as const,
    align: "end" as const,
    labels: {
      usePointStyle: true,
      pointStyle: "circle" as const,
      boxWidth: 6,
      boxHeight: 6,
      padding: 14,
      color: ink.secondary,
      font: { size: 11 },
    },
  };
}

export function LineChart({
  labels,
  series,
  height = 240,
  valueFormat,
  fillFirst = true,
}: {
  labels: string[];
  series: { label: string; data: number[] }[];
  height?: number;
  valueFormat?: (v: number) => string;
  fillFirst?: boolean;
}) {
  const data: ChartData<"line"> = {
    labels,
    datasets: series.map((s, i) => ({
      label: s.label,
      data: s.data,
      borderColor: seriesColors[i % 4],
      backgroundColor: fillFirst && i === 0 ? seriesFills[0] : "transparent",
      fill: fillFirst && i === 0,
      borderWidth: 2,
      pointRadius: 0,
      pointHoverRadius: 4,
      pointHoverBackgroundColor: seriesColors[i % 4],
      pointHoverBorderColor: "#ffffff",
      pointHoverBorderWidth: 2,
      tension: 0.35,
    })),
  };
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: legendFor(series.length),
      tooltip: {
        ...baseTooltip(),
        callbacks: valueFormat
          ? {
              label: (ctx) => ` ${ctx.dataset.label}: ${valueFormat(ctx.parsed.y as number)}`,
            }
          : undefined,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { color: ink.grid },
        ticks: { maxTicksLimit: 8, color: ink.muted },
      },
      y: {
        grid: { color: ink.grid },
        border: { display: false },
        ticks: {
          maxTicksLimit: 5,
          color: ink.muted,
          callback: (v) => (valueFormat ? valueFormat(Number(v)) : v),
        },
      },
    },
  };
  return (
    <div style={{ height }}>
      <Line data={data} options={options} />
    </div>
  );
}

export function BarChart({
  labels,
  series,
  height = 240,
  horizontal = false,
  stacked = false,
  valueFormat,
}: {
  labels: string[];
  series: { label: string; data: number[] }[];
  height?: number;
  horizontal?: boolean;
  stacked?: boolean;
  valueFormat?: (v: number) => string;
}) {
  const data: ChartData<"bar"> = {
    labels,
    datasets: series.map((s, i) => ({
      label: s.label,
      data: s.data,
      backgroundColor: seriesColors[i % 4],
      borderRadius: 5,
      borderSkipped: "start" as const,
      barPercentage: 0.62,
      categoryPercentage: 0.7,
      borderColor: "#ffffff",
      borderWidth: stacked ? 1 : 0,
    })),
  };
  const options: ChartOptions<"bar"> = {
    indexAxis: horizontal ? "y" : "x",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: legendFor(series.length),
      tooltip: {
        ...baseTooltip(),
        callbacks: valueFormat
          ? {
              label: (ctx) =>
                ` ${ctx.dataset.label}: ${valueFormat(
                  Number(horizontal ? ctx.parsed.x : ctx.parsed.y)
                )}`,
            }
          : undefined,
      },
    },
    scales: {
      x: {
        stacked,
        grid: { display: horizontal, color: ink.grid },
        border: horizontal ? { display: false } : { color: ink.grid },
        ticks: {
          color: ink.muted,
          maxTicksLimit: horizontal ? 5 : 12,
          callback: horizontal && valueFormat ? (v) => valueFormat(Number(v)) : undefined,
        },
      },
      y: {
        stacked,
        grid: { display: !horizontal, color: ink.grid },
        border: { display: false },
        ticks: {
          color: ink.muted,
          maxTicksLimit: horizontal ? 12 : 5,
          callback: !horizontal && valueFormat ? (v) => valueFormat(Number(v)) : undefined,
        },
      },
    },
  };
  return (
    <div style={{ height }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export function DonutChart({
  labels,
  values,
  height = 220,
  valueFormat,
  centerLabel,
  centerValue,
}: {
  labels: string[];
  values: number[];
  height?: number;
  valueFormat?: (v: number) => string;
  centerLabel?: string;
  centerValue?: string;
}) {
  const colors = labels.map((_, i) => seriesColors[i % 4]);
  // >4 slices: fold styling via lighter repeats — callers should pre-fold to <=4-6
  const extended = labels.map((_, i) =>
    i < 4 ? seriesColors[i] : ["#7cc7bf", "#8fb4e8", "#f2c866", "#9c8fd6"][i - 4] ?? "#aab6b3"
  );
  const data: ChartData<"doughnut"> = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: labels.length > 4 ? extended : colors,
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 6,
      },
    ],
  };
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%",
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 6,
          boxHeight: 6,
          padding: 10,
          color: "#5c6b68",
          font: { size: 11 },
        },
      },
      tooltip: {
        ...baseTooltip(),
        callbacks: valueFormat
          ? { label: (ctx) => ` ${ctx.label}: ${valueFormat(Number(ctx.parsed))}` }
          : undefined,
      },
    },
  };
  return (
    <div className="relative" style={{ height }}>
      <Doughnut data={data} options={options} />
      {centerValue && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pr-[120px]">
          <div className="text-xl font-semibold text-ink-900 tnum">{centerValue}</div>
          {centerLabel && <div className="text-[11px] text-ink-400">{centerLabel}</div>}
        </div>
      )}
    </div>
  );
}

/** Tiny inline sparkline (no axes) */
export function Sparkline({
  data,
  height = 36,
  color = "#0d9488",
}: {
  data: number[];
  height?: number;
  color?: string;
}) {
  const chartData: ChartData<"line"> = {
    labels: data.map((_, i) => String(i)),
    datasets: [
      {
        data,
        borderColor: color,
        borderWidth: 1.5,
        pointRadius: 0,
        tension: 0.4,
        fill: false,
      },
    ],
  };
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: { x: { display: false }, y: { display: false } },
    events: [],
  };
  return (
    <div style={{ height }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
