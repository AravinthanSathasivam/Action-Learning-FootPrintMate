import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // State to hold the data from localStorage
  const [userData, setUserData] = useState(null);

  // Function to retrieve data from localStorage
  const getDataFromLocalStorage = () => {
    const data = localStorage.getItem('userData');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };

  // Effect to load data from localStorage on component mount
  useEffect(() => {
    const data = getDataFromLocalStorage();
    if (data) {
      setUserData(data);
    }
  }, []);

  // Set a default value of 0 for carbonFootprint and ecoScore if they're not available in localStorage
  const initialCarbonFootprint = userData ? userData.carbonFootprint : 0;
  const initialEcoScore = userData ? userData.ecoScore : 0;


  const chartData = {
    labels: ['Electricity', 'Heating Fuel', 'Transportation Fuel'],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: ['#0096D3', '#0F6ABF', '#12CA95'],
      },
    ],
  };

  const chartOptions = {
    responsive: true, // Make the chart responsive
  maintainAspectRatio: false, // Prevent the chart from maintaining aspect ratio

  plugins: {
    legend: {
      position: 'right', // Position the legend to the right of the chart
      align: 'start', // Align the legend text to the start of the legend box
      labels: {
        font: {
          size: 14, // Set the font size for legend labels
        },
      },
    },
  },
  };

  return (
    <div className="dashboard-container">

      <h2>Dashboard</h2>
      <div className='row mt-3'>
        <div className='col-5  mx-3'>
          <Card variant="outlined" className='p-3 row dash-card-carbon'>
            <div className='col-7'>
              <div className='d-flex'>
                <h4>Your</h4>
                <div className='mx-2 dash-text-icon-blue'>Carbon Footprint</div>
              </div>

              <h1 className='mb-0 font-weight-bold'>{initialCarbonFootprint.toFixed(2)}</h1>
              <p className='bold-text-blue'>kgCO2e</p>
            </div>
            <div className='col-3'>
              <img src="/dashboard-icon-01.png" alt="dash 01" className="dashboard-img" />
            </div>
          </Card>
        </div>
        <div className='col-5 dash-card mx-3'>

          <Card variant="outlined" className='p-3 row dash-card-green'>
            <div className='col-7'>
              <div className='d-flex'>
                <h4>Your</h4>
                <div className='mx-2 dash-text-icon-green'>Eco Score</div>
              </div>

              <h1 className='mb-0 font-weight-bold'>{initialEcoScore}</h1>
              <p className='bold-text-green'>eco points</p>
            </div>
            <div className='col-3'>
              <img src="/dashboard-icon-02.png" alt="dash 01" className="dashboard-img" />
            </div>
          </Card>
        </div>
      </div>
      <div className='row my-4'>  
      <div className='col-5  mx-3'>
          <Card variant="outlined" className='p-3 row'>
          <Doughnut data={chartData} options={chartOptions} />
           
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
