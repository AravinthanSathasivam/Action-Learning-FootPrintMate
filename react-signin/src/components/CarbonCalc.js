import React, { useState, useEffect } from 'react';
import { getEarnedBadges, getRewardOptions } from './Rewards'; // Import the reward functions from Rewards.js
import TextField from '@mui/material/TextField';
import {  MenuItem, Select } from '@mui/material';
import Dashboard from './Dashboard';
import BatchPop from './BatchPop';


const CarbonCalc = () => {
  const [electricityUsage, setElectricityUsage] = useState(0);
  const [heatingFuelUsage, setHeatingFuelUsage] = useState(0);
  const [transportationFuelUsage, setTransportationFuelUsage] = useState(0);
  const [recyclingHabits, setRecyclingHabits] = useState('always'); // Default value set to "always" (can be adjusted)
  const [userPoints, setUserPoints] = useState(0);
  const [open, setOpen] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [carbonSuccess, setcarbonSuccess] = useState(null);
  const [carbonError, setcarbonError] = useState(null);

  // Function to save data to localStorage
  const saveDataToLocalStorage = () => {
    const dataToStore = {
      carbonFootprint: calculateCarbonFootprint(),
      earnedBadges: earnedBadges,
      rewardOptions: getRewardOptions(userPoints),
      ecoScore: calculateEcoScore(),
    };
    localStorage.setItem('userData', JSON.stringify(dataToStore));
  };
  

  // Function to retrieve data from localStorage
  const getDataFromLocalStorage = () => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Sample carbon emission factors (replace these with actual factors)
  const electricityEmissionFactor = 0.5; // kgCO2e per kWh
  const heatingFuelEmissionFactor = 2.0; // kgCO2e per liter/gallon
  const transportationFuelEmissionFactor = 2.5; // kgCO2e per liter/gallon

  // Set reference values for high and low carbon footprints (sample values)
  const highCarbonThreshold = 500; // kgCO2e
  const lowCarbonThreshold = 60; // kgCO2e

  // Define points awarded for each kgCO2e reduction (you can adjust these values)
  const pointsPerKgCO2eReduced = 50;

  // Calculate the Eco score based on user points and other factors (customize as needed)
  const calculateEcoScore = () => {
    const earnedBadges = getEarnedBadges(userPoints);
    // You can add other factors to calculate the Eco score based on your gamification strategy
    return userPoints + earnedBadges.length * 50;
  };

   // State to hold the Eco score
   const [ecoScore, setEcoScore] = useState(0);

   useEffect(() => {
    setEcoScore(calculateEcoScore());
  
    // Save data to localStorage whenever userPoints changes
    const saveDataToLocalStorage = () => {
      const dataToStore = {
        carbonFootprint: calculateCarbonFootprint(),
        earnedBadges: earnedBadges,
        rewardOptions: getRewardOptions(userPoints),
        ecoScore: calculateEcoScore(),
      };
      localStorage.setItem('userData', JSON.stringify(dataToStore));
    };
  
    saveDataToLocalStorage();
  
  }, [userPoints]);
  

  const calculateCarbonFootprint = () => {
    // Calculate carbon footprint for each data point
    const electricityCarbonFootprint = electricityUsage * electricityEmissionFactor;
    const heatingFuelCarbonFootprint = heatingFuelUsage * heatingFuelEmissionFactor;
    const transportationFuelCarbonFootprint = transportationFuelUsage * transportationFuelEmissionFactor;

    // Calculate the total carbon footprint
    const totalCarbonFootprint = electricityCarbonFootprint + heatingFuelCarbonFootprint + transportationFuelCarbonFootprint;

    return totalCarbonFootprint;
  };

  const updatePointsBasedOnCarbonFootprint = () => {
    const totalCarbonFootprint = calculateCarbonFootprint();
  let carbonReduced = 100 - totalCarbonFootprint;
  
  // Ensure carbonReduced is not negative
  carbonReduced = Math.max(carbonReduced, 0);

  const pointsEarned = carbonReduced * pointsPerKgCO2eReduced;
  setUserPoints(pointsEarned);
  };

  const handleCalculate = () => {
    const totalCarbonFootprint = calculateCarbonFootprint();
    
    // Update user points based on carbon footprint
    updatePointsBasedOnCarbonFootprint();

    // Compare the total carbon footprint with the thresholds
    if (totalCarbonFootprint > highCarbonThreshold) {
      setcarbonError("Your carbon footprint is high. Consider reducing your emissions.");
      setcarbonSuccess("");
    } else if (totalCarbonFootprint < lowCarbonThreshold) {
      setcarbonSuccess("Your carbon footprint is low. Keep up the sustainable practices!");
      setcarbonError("");
    } else {
      setcarbonSuccess("Your carbon footprint is within a moderate range.");
      setcarbonError("");
    }

    // Get earned badges and reward options based on user points
    const earnedBadges = getEarnedBadges(userPoints);
    const rewardOptions = getRewardOptions(userPoints);
    setEarnedBadges(earnedBadges);

    // Display earned badges and reward options in alert messages
    if (earnedBadges.length > 0) {
      const earnedBadgesMessage = `You've earned the following badges:\n${earnedBadges.map((badge) => `- ${badge.name}`).join('\n')}`;
      // alert(earnedBadgesMessage);
      handleOpen();
    } else {
      // alert("You haven't earned any badges yet. Keep up the good work!");
    }

    if (rewardOptions.length > 0) {
      const rewardOptionsMessage = `You are eligible for the following rewards:\n${rewardOptions.map((reward) => `- ${reward.name}`).join('\n')}`;
      // alert(rewardOptionsMessage);
    } else {
      // alert("You don't have enough points for any rewards yet. Keep earning points to unlock rewards!");
    }

    saveDataToLocalStorage();
    
  };

  return (
    <div className='d-flex justify-content-center align-items-center flex-column'>
      <div>
      <div className='d-flex mb-3  align-items-center'>
        <TextField className='custom-input' id="outlined-basic" label="Monthly Electricity Usage" variant="outlined" 
          type="number"  onChange={(e) => setElectricityUsage(Number(e.target.value))} />
        <label className='mx-3'>kWh</label>
      
      </div>
      <div className='d-flex mb-3  align-items-center'>
          <TextField className='custom-input' id="outlined-basic" label="Monthly Heating Fuel Usage" variant="outlined"
          type="number" onChange={(e) => setHeatingFuelUsage(Number(e.target.value))} />
          <label className='mx-3'>liters/gallons</label>
      </div>
      <div className='d-flex mb-3  align-items-center'>
          <TextField className='custom-input' id="outlined-basic" label="Weekly Transportation Fuel Usage" variant="outlined"
           type="number" onChange={(e) => setTransportationFuelUsage(Number(e.target.value))} />
           <label className='mx-3'>liters/gallons</label>
           
      </div>
      <div className='d-flex mb-3  align-items-center'> 
      <label>Recycling Habits</label>
          <Select className='mx-3 custom-dropdown' value={recyclingHabits} onChange={(e) => setRecyclingHabits(e.target.value)}>
            <MenuItem value="always">Always</MenuItem>
            <MenuItem value="sometimes">Sometimes</MenuItem>
            <MenuItem value="rarely">Rarely</MenuItem>
            <MenuItem value="never">Never</MenuItem>
          </Select>
      </div>
      <button className='btn-big' onClick={handleCalculate}>Calculate</button>
      {/* <Dashboard carbonFootprint={calculateCarbonFootprint()} ecoScore={ecoScore} /> */}
      <BatchPop open={open} onClose={handleClose} earnedBadges={earnedBadges} />
      {carbonSuccess && <p className="carbonSuccess">{carbonSuccess}</p>}
      {carbonError && <p className="carbonError">{carbonError}</p>}
        
      </div>
      
    </div>
  );
};

export default CarbonCalc;
