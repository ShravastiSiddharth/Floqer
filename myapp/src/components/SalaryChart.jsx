// // src/components/SalaryChart.js
// import React, { useEffect, useState } from 'react';
// import { Card, Spin, Alert } from 'antd';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';


// ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// const SalaryChart = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/avgsalary');
//         const result = await response.json();
//         setData(result.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <Spin size="large" />;
//   if (error) return <Alert message="Error" description={error} type="error" showIcon />;

//   const years = data.map(item => item._id);
//   const totalJobs = data.map(item => item.totalJobs);
//   const averageSalaries = data.map(item => item.averageSalary);

//   const chartData = {
//     labels: years,
//     datasets: [
//       {
//         label: 'Total Jobs',
//         data: totalJobs,
//         borderColor: '#007bff',
//         backgroundColor: 'rgba(0, 123, 255, 0.2)',
//         fill: true,
//       },
//       {
//         label: 'Average Salary in USD',
//         data: averageSalaries,
//         borderColor: '#28a745',
//         backgroundColor: 'rgba(40, 167, 69, 0.2)',
//         fill: true,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             let label = context.dataset.label || '';
//             if (label) {
//               label += ': ';
//             }
//             if (context.parsed.y !== null) {
//               label += new Intl.NumberFormat().format(context.parsed.y);
//             }
//             return label;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Year',
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Value',
//         },
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <Card title="Salary and Job Statistics" bordered={false} style={{ width: '100%' }}>
//       <Line data={chartData} options={chartOptions} />
//     </Card>
//   );
// };

// export default SalaryChart;


// src/components/SalaryChart.js
import React, { useEffect, useState } from 'react';
import { Card, Spin, Alert } from 'antd';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './SalaryChart.css'; // Optional CSS file for additional styling

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const SalaryChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/avgsalary');
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  const years = data.map(item => item._id);
  const totalJobs = data.map(item => item.totalJobs);
  const averageSalaries = data.map(item => item.averageSalary);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Total Jobs',
        data: totalJobs,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Average Salary in USD',
        data: averageSalaries,
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.2)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows better control over height
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat().format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="salary-chart-container">
      <Card title="Salary and Job Statistics" bordered={false} className="salary-chart-card">
        <div style={{ height: '400px' }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </Card>
    </div>
  );
};

export default SalaryChart;
