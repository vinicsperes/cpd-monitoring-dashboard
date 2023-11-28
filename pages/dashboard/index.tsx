import React from 'react';
import { Card, Col, Row } from 'antd';
import styles from './styles.module.css';

import { Thermometer, Drop, Wind } from "@phosphor-icons/react";
import TemperatureChart from '../../components/TemperatureChart';

export default function Dashboard() {
  // Valores fictícios para temperatura, umidade e gás
  const temperatureValue = 25;
  const humidityValue = 60;
  const gasValue = 350;

  // Data fictícia
  const emissionDate = new Date().toLocaleDateString();

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
            <div className={styles.cardContent}>
              <p style={{ fontSize: '48px', color: '#1890ff' }}>{temperatureValue}°C</p>
              <p style={{ fontSize: '14px', color: '#666' }}>Data de emissão: {emissionDate}</p>
            </div>
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
            <div className={styles.cardContent}>
              <p style={{ fontSize: '48px', color: '#ff9900' }}>{humidityValue}%</p>
              <p style={{ fontSize: '14px', color: '#666' }}>Data de emissão: {emissionDate}</p>
            </div>
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
            <div className={styles.cardContent}>
              <p style={{ fontSize: '48px', color: '#52c41a' }}>{gasValue} ppm</p>
              <p style={{ fontSize: '14px', color: '#666' }}>Data de emissão: {emissionDate}</p>
            </div>
          </Card>
        </Col>
      </Row>
      <TemperatureChart />
    </div>
  );
}
