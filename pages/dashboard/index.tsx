import React from 'react';
import { Card, Col, Row } from 'antd';
import styles from './styles.module.css';
import ChartComponent from '../../components/ChartComponent';

import { Thermometer, Drop, Wind } from "@phosphor-icons/react";


export default function Dashboard() {
  const chartData = {
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    values: [12, 19, 3, 5, 2],
  };

  return (
    <div className={styles.dashboard}>
      <Row gutter={16}>
        <Col span={8}>
          <Card 
            className={styles.card} 
            title={
              <div className={styles.cardTitle}>
                <p>Temperatura</p>
                <Thermometer size={28} />
              </div>
            }
            bordered={false}
          >
            <ChartComponent data={chartData} />
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            className={styles.card} 
            title={
              <div className={styles.cardTitle}>
                <p>Umidade</p>
                <Drop size={28} />
              </div>
            } 
            bordered={false}
          >
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            className={styles.card} 
            title={
              <div className={styles.cardTitle}>
                <p>MQ-2</p>
                <Wind size={28} />
              </div>
            }  
            bordered={false}
          >
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
}
