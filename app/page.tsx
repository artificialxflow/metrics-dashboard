'use client';
import { useEffect, useState } from "react";
import { toJalaliDate } from "../utils-jalali";
import metricsData from "../metricsData.json";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface DailyMetric {
  date: string;
  visits: number;
  revenue: number;
  newUsers: number;
  transactions: number;
}

interface TotalMetrics {
  visits: number;
  revenue: number;
  newUsers: number;
  transactions: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const [dailyMetrics, setDailyMetrics] = useState<DailyMetric[]>([]);
  const [totalMetrics, setTotalMetrics] = useState<TotalMetrics>({
    visits: 0,
    revenue: 0,
    newUsers: 0,
    transactions: 0,
  });

  useEffect(() => {
    // خواندن داده‌ها از فایل JSON
    const loadedDailyMetrics: DailyMetric[] = metricsData.dailyMetrics;
    setDailyMetrics(loadedDailyMetrics);
    // محاسبه مجموع
    setTotalMetrics({
      visits: loadedDailyMetrics.reduce((sum, m) => sum + m.visits, 0),
      revenue: loadedDailyMetrics.reduce((sum, m) => sum + m.revenue, 0),
      newUsers: loadedDailyMetrics.reduce((sum, m) => sum + m.newUsers, 0),
      transactions: loadedDailyMetrics.reduce((sum, m) => sum + m.transactions, 0),
    });
  }, []);

  return (
    <div className="container py-5" dir="rtl" style={{ textAlign: "right" }}>
      <h1 className="mb-4">داشبورد متریک‌ها</h1>
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card text-bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">بازدیدها</h5>
              <p className="card-text fs-3">{totalMetrics.visits.toLocaleString("fa-IR")}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-bg-success h-100">
            <div className="card-body">
              <h5 className="card-title">درآمد</h5>
              <p className="card-text fs-3">{totalMetrics.revenue.toLocaleString("fa-IR")}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-bg-warning h-100">
            <div className="card-body">
              <h5 className="card-title">کاربران جدید</h5>
              <p className="card-text fs-3">{totalMetrics.newUsers.toLocaleString("fa-IR")}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-bg-danger h-100">
            <div className="card-body">
              <h5 className="card-title">تراکنش‌ها</h5>
              <p className="card-text fs-3">{totalMetrics.transactions.toLocaleString("fa-IR")}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Charts Row */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-title text-center">نمودار میله‌ای بازدیدها</h6>
              <Bar
                data={{
                  labels: dailyMetrics.map((m) => toJalaliDate(m.date)),
                  datasets: [
                    {
                      label: "بازدیدها",
                      data: dailyMetrics.map((m) => m.visits),
                      backgroundColor: "#0d6efd",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    title: { display: false },
                  },
                  indexAxis: "x",
                  scales: {
                    x: { ticks: { font: { family: "Vazirmatn, Tahoma" }, color: "#333" } },
                    y: { ticks: { font: { family: "Vazirmatn, Tahoma" }, color: "#333" } },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-title text-center">نمودار خطی درآمد</h6>
              <Line
                data={{
                  labels: dailyMetrics.map((m) => toJalaliDate(m.date)),
                  datasets: [
                    {
                      label: "درآمد",
                      data: dailyMetrics.map((m) => m.revenue),
                      borderColor: "#198754",
                      backgroundColor: "rgba(25,135,84,0.2)",
                      tension: 0.4,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    title: { display: false },
                  },
                  scales: {
                    x: { ticks: { font: { family: "Vazirmatn, Tahoma" }, color: "#333" } },
                    y: { ticks: { font: { family: "Vazirmatn, Tahoma" }, color: "#333" } },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-title text-center">نمودار دایره‌ای کاربران جدید</h6>
              <Pie
                data={{
                  labels: dailyMetrics.map((m) => toJalaliDate(m.date)),
                  datasets: [
                    {
                      label: "کاربران جدید",
                      data: dailyMetrics.map((m) => m.newUsers),
                      backgroundColor: [
                        "#ffc107",
                        "#0d6efd",
                        "#198754",
                        "#dc3545",
                        "#6f42c1",
                        "#20c997",
                        "#fd7e14",
                      ],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: "bottom",
                      labels: { font: { family: "Vazirmatn, Tahoma" }, color: "#333" },
                    },
                    title: { display: false },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header bg-secondary text-white">متریک‌های روزانه</div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped mb-0">
              <thead>
                <tr>
                  <th>تاریخ (شمسی)</th>
                  <th>بازدیدها</th>
                  <th>درآمد</th>
                  <th>کاربران جدید</th>
                  <th>تراکنش‌ها</th>
                </tr>
              </thead>
              <tbody>
                {dailyMetrics.map((m, i) => (
                  <tr key={i}>
                    <td>{toJalaliDate(m.date)}</td>
                    <td>{m.visits.toLocaleString("fa-IR")}</td>
                    <td>{m.revenue.toLocaleString("fa-IR")}</td>
                    <td>{m.newUsers.toLocaleString("fa-IR")}</td>
                    <td>{m.transactions.toLocaleString("fa-IR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
