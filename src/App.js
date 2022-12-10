import './App.css';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import ListCustomers from './components/ListCustomers';
import ListTrainings from './components/ListTrainings';


function App() {
    const [value, setValue] = useState('one');

    const handleChange = (event, value) => {
        setValue(value);
    };
  
    return (
      <div className="App">
        <AppBar position='static'>
          <Toolbar> 
            <Typography variant='h6'>
              Fitness
            </Typography>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Customers" value="one" />
              <Tab label="Trainings" value="two" />
              </Tabs>
          </Toolbar>
        </AppBar>
        {value==='one' && <div><ListCustomers/></div>}
        {value==='two'&& <div><ListTrainings/></div>}
      </div>
    );
  }
  export default App;