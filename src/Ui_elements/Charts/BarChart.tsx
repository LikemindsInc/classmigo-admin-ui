import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  Title,
  BarElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

interface ChartProps {
  data: any;
}

export const BarChart = ({ data }: ChartProps) => {

  const dataFormat = {
    labels: data.map((data:any) => data.month),
    datasets: [
      {
        label: "Payments made",
        data: data.map((data:any) => data.totalAmount),
        hoverBackgroundColor: "#7B31B2",
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <Bar data={dataFormat} options={chartOptions} height={220} />
    </>
  );
};
