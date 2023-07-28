import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CarbonCalc from './CarbonCalc';

export default function TogglePage() {

    const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='dashboard-container'>
      <h2>Carbon Footprint Calculator</h2>
    <Tabs className='toggle-custom' value={value} onChange={handleChange} centered>
      <Tab label="Normal" />
      <Tab label="Personlised" />
    </Tabs>
    {value === 0 && (
      <div className='mt-4'>
        <CarbonCalc />
      </div>
    )}
    {value === 1 && (
      <div className='mt-4'>
      <CarbonCalc />
    </div>
    )}
  </div>
  )
}
