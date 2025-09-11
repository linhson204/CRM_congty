import {
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Filler,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const DashboardChart = () => {
  const chartData = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        data: [800, 920, 780, 950, 880, 1046, 980, 1020, 960, 1100, 990, 1046],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
      }
    ]
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          title: () => '',
          label: (context) => `Orders: ${context.parsed.y}`
        }
      }
    },
    scales: {
      y: {
        display: false,
        beginAtZero: false
      },
      x: {
        display: false,
        grid: {
          display: false
        }
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false
    }
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '16px', fontWeight: '500', color: '#6b7280' }}>
          Active Orders
        </div>
        <div style={{ fontSize: '30px', fontWeight: '700', color: '#1f2937' }}>
          1,046
        </div>
      </div>
      <div style={{ height: '120px', width: '100%' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DashboardChart;