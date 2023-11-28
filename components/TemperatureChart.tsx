import { useState } from "react";
import LineChart from "./LineChart";

export const TemperatureData = [
  {
    id: 1,
    date: "2021-01-01",
    temperature: 25,
  },
  {
    id: 2,
    date: "2021-01-02",
    temperature: 28,
  },
  {
    id: 3,
    date: "2021-01-03",
    temperature: 23,
  },
  {
    id: 4,
    date: "2021-01-04",
    temperature: 30,
  },
  {
    id: 5,
    date: "2021-01-05",
    temperature: 22,
  },
];

export default function TemperatureChart() {
  const [temperatureData, setTemperatureData] = useState({
    labels: TemperatureData.map((data) => data.date),
    datasets: [
      {
        label: "Temperature",
        data: TemperatureData.map((data) => data.temperature),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className="TemperatureChart">
      <div>
        <LineChart chartData={temperatureData} />
      </div>
    </div>
  );
}