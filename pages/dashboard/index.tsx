import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import TemperatureChart from '../../components/temperatureChart/TemperatureChart';
import { Table, Input, Button, Space } from 'antd';
import StatusCards from '../../components/statusCards/StatusCards';

interface StatusData {
  temperature: number;
  humidity: number;
  mq2: number;
  timestamp: string;
  // Add other properties as needed
}

const Dashboard = () => {
  const [statusData, setStatusData] = useState<StatusData[]>([]);
  const [filteredInfo, setFilteredInfo] = useState<Record<string, string[] | null>>({});
  const [sortedInfo, setSortedInfo] = useState<{ columnKey?: string; order?: string }>({});

  const fetchAllStatus = async () => {
    try {
      const url = 'https://cpd-monitoring-api.vercel.app/allStatus';

      const allStatusResponse = await fetch(url);
      const allStatusData = await allStatusResponse.json();

      console.log(allStatusResponse);
      console.log(allStatusData);

      setStatusData(allStatusData);
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
  }, []);

  const columns = [
    {
      title: 'Temperature',
      dataIndex: 'temperature',
      key: 'temperature',
      sorter: (a, b) => a.temperature - b.temperature,
      sortOrder: sortedInfo.columnKey === 'temperature' && sortedInfo.order,
    },
    {
      title: 'Humidity',
      dataIndex: 'humidity',
      key: 'humidity',
      sorter: (a, b) => a.humidity - b.humidity,
      sortOrder: sortedInfo.columnKey === 'humidity' && sortedInfo.order,
    },
    {
      title: 'MQ-2',
      dataIndex: 'mq2',
      key: 'mq2',
      sorter: (a, b) => a.mq2 - b.mq2,
      sortOrder: sortedInfo.columnKey === 'mq2' && sortedInfo.order,
    },
    {
      title: 'Data',
      dataIndex: 'timestamp',
      key: 'timestamp',
      sorter: (a, b) => a.timestamp.localeCompare(b.timestamp),
      sortOrder: sortedInfo.columnKey === 'timestamp' && sortedInfo.order,
    },
  ] as any;
  
  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardContent}>
        <div className={styles.statusCardsWrapper}>
          <StatusCards />
        </div>
        <div className={styles.chartWrapper}>
          <TemperatureChart />
        </div>
        <div className={styles.tableWrapper}>
          <Table
            dataSource={statusData}
            columns={columns}
            onChange={handleTableChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
