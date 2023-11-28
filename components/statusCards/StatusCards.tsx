import { Card, Col, Row } from 'antd';
import { Thermometer, Drop, Wind } from "@phosphor-icons/react";
import styles from './styles.module.css';
import { useEffect, useState } from 'react';


export default function StatusCards() {
    const [temperatureValue, setTemperatureValue] = useState<number | null>(null);
    const [humidityValue, setHumidityValue] = useState<number | null>(null);
    const [gasValue, setGasValue] = useState<number | null>(null);
    const [emissionDate, setEmissionDate] = useState<string | null>(null);
    
    const fetchLastStatus = async () => {
      try {
        const url = 'https://cpd-monitoring-api.vercel.app/lastStatus'
    
        const lastStatusResponse = await fetch(url);
        const lastStatusData = await lastStatusResponse.json();
    
        console.log(lastStatusResponse)
        console.log(lastStatusData)
    
        // Atualizar estados com os valores obtidos
        setTemperatureValue(lastStatusData.temperature);
        setHumidityValue(lastStatusData.humidity);
        setGasValue(lastStatusData.mq2);
        setEmissionDate(new Date().toLocaleDateString());
      } catch (error) {
        console.error('Error fetching lastStatus:', error);
      }
    };
    
    // UseEffect para chamar a função inicialmente e configurar a solicitação repetida
    useEffect(() => {
      fetchLastStatus(); // Chamar a função inicialmente
    
      // Configurar a solicitação repetida a cada 10 segundos
      const intervalId = setInterval(() => {
        fetchLastStatus();
      }, 10000);
    
      // Limpar o intervalo ao desmontar o componente
      return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <Row className={styles.statusCards} gutter={16}>
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
                    <p style={{ margin: 0, fontSize: '64px', color: '#1890ff' }}>{temperatureValue}°C</p>
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
                    <p style={{ margin: 0, fontSize: '64px', color: '#ff9900' }}>{humidityValue}%</p>
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
                    <p style={{ margin: 0, fontSize: '64px', color: '#52c41a' }}>{gasValue} ppm</p>
                    <p style={{ fontSize: '14px', color: '#666' }}>Data de emissão: {emissionDate}</p>
                    </div>
                </Card>
                </Col>
            </Row>
        </>
    )
}