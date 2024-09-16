import React, { useEffect, useState } from 'react';
import { Table, Typography, Spin, Alert } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const SalaryTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobTitlesData, setJobTitlesData] = useState([]); 
  const [jobTitlesLoading, setJobTitlesLoading] = useState(false); // To handle loading for the second table
  const [jobTitlesError, setJobTitlesError] = useState(null);
  const [year, setYear] = useState(''); // To handle error for job titles API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/avgsalary');
        setData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle row click and fetch job titles
  const onRowClick = async (record) => {
    setJobTitlesLoading(true);
    setJobTitlesError(null);
    setYear(record._id)
    try {
      const response = await axios.post('http://localhost:5000/api/job-titles', {
        year: record._id, // Send the clicked year
      });
      setJobTitlesData(response.data.jobTitles); // Set the job titles data
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
      render: (text) => `$${text.toLocaleString()}`, // Format salary with a dollar sign
    },
  ];

  const jobTitlesColumns = [
    {
      title: 'Index',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1, // Render index starting from 1
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
        pagination={false} // Removed pagination for the main table
        bordered
        scroll={{ x: 800 }} // For horizontal scrolling on smaller screens
        onRow={(record) => ({
          onClick: () => onRowClick(record), // Handle row click
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



