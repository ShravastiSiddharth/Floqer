import React, { useEffect, useState } from 'react';
import { Table, Typography, Spin, Alert } from 'antd';
import axiosInstance from '../config/axiosInstance';

const { Title } = Typography;

const SalaryTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobTitlesData, setJobTitlesData] = useState([]); 
  const [jobTitlesLoading, setJobTitlesLoading] = useState(false); 
  const [jobTitlesError, setJobTitlesError] = useState(null);
  const [year, setYear] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/avgsalary');
        setData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  const onRowClick = async (record) => {
    setJobTitlesLoading(true);
    setJobTitlesError(null);
    setYear(record._id)
    try {
      const response = await axiosInstance.post('/job-titles', {
        year: record._id,
      });
      setJobTitlesData(response.data.jobTitles);
    } catch (err) {
      setJobTitlesError(err.message);
    } finally {
      setJobTitlesLoading(false);
    }
  };

  const columns = [
    {
      title: 'Year',
      dataIndex: '_id',
      key: '_id',
      sorter: (a, b) => a._id - b._id,
    },
    {
      title: 'Number of Total Jobs',
      dataIndex: 'totalJobs',
      key: 'totalJobs',
      sorter: (a, b) => a.totalJobs - b.totalJobs,
    },
    {
      title: 'Average Salary in USD',
      dataIndex: 'averageSalary',
      key: 'averageSalary',
      sorter: (a, b) => a.averageSalary - b.averageSalary,
      render: (text) => `$${text.toLocaleString()}`, 
    },
  ];

  const jobTitlesColumns = [
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1, 
    },
    {
      title: 'Job Title',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Number of Jobs',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
    },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Salary Statistics</Title>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        pagination={false} 
        bordered
        scroll={{ x: 800 }} 
        onRow={(record) => ({
          onClick: () => onRowClick(record), 
        })}
      />

      {jobTitlesLoading && <Spin size="large" />}
      {jobTitlesError && <Alert message="Error" description={jobTitlesError} type="error" showIcon />}

      {jobTitlesData.length > 0 && (
        <>
          <Title level={3} style={{ marginTop: '20px' }}>
            Job Titles for Year: {year}
          </Title>
          <Table
            columns={jobTitlesColumns}
            dataSource={jobTitlesData}
            rowKey="_id"
            bordered
            pagination={false} 
            scroll={{ y: 300 }} 
          />
        </>
      )}
    </div>
  );
};

export default SalaryTable;



