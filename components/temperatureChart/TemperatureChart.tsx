import { useState, useEffect } from "react";
import LineChart from "../LineChart";
import styles from './styles.module.css';

export default function TemperatureChart() {
  const [sensorData, setSensorData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperatura",
        data: [],
        backgroundColor: "#1890ff",
        borderColor: "#3B86CC",
        borderWidth: 2,
      },
      {
        label: "Umidade",
        data: [],
        backgroundColor: "#ff9900",
        borderColor: "#CC8B29",
        borderWidth: 2,
      },
      {
        label: "MQ-2",
        data: [],
        backgroundColor: "#52c41a",
        borderColor: "#509130",
        borderWidth: 2,
      },
    ],
  });

  const fetchAllStatus = async () => {
    try {
      const url = 'https://cpd-monitoring-api.vercel.app/allStatus';

      const allStatusResponse = await fetch(url);
      const allStatusData = await allStatusResponse.json();

      const labels = allStatusData.map((data) => data.timestamp);
      const temperatureValues = allStatusData.map((data) => data.temperature);
      const humidityValues = allStatusData.map((data) => data.humidity);
      const gasValues = allStatusData.map((data) => data.mq2);

      setSensorData({
        labels: labels,
        datasets: [
          {
            ...sensorData.datasets[0],
            data: temperatureValues,
          },
          {
            ...sensorData.datasets[1],
            data: humidityValues,
          },
          {
            ...sensorData.datasets[2],
            data: gasValues,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching allStatus:', error);
    }
  };

  useEffect(() => {
    fetchAllStatus();

    const intervalId = setInterval(() => {
      fetchAllStatus();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  return (
    <div className={styles.ChartWrapper}>
      <div className={styles.TemperatureChart}>
        <LineChart chartData={sensorData} />
      </div>
    </div>
  );
}