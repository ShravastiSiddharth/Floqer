// src/components/Dashboard.js
import React, { useState } from 'react';
import { Layout, Row, Col, Typography, Menu, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import SalaryChart from './SalaryChart';
import SalaryTable from './SalaryTable';
import Sidebar from './Sidebar';
import styles from '../styles/Sidebar.module.css';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div  style={{display:'grid', gridTemplateColumns:'1fr 4fr'}}>
        <div>
          <Sidebar />
        </div>

        <div className={styles.content}>

                  
         

       
          <Content style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
            
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <SalaryTable />
              </Col>
            </Row>

           
            <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
              <Col span={20}>
                <SalaryChart />
              </Col>
            </Row>
          </Content>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
