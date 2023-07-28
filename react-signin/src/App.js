import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderLayout from './components/HeaderLayout';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Dashboard from "./components/Dashboard";
import TogglePage from './components/TogglePage';
import Game from "./components/Game";
import DrawerSide from "./components/DrawerSide";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Routes without the drawer */}
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='home' element={<Home />} />

          {/* Routes with the drawer */}
          <Route
            path='dashboard'
            element={(
              <HeaderLayout>
                <Grid container>
                <Grid item xs={2}><DrawerSide /></Grid>
                <Grid item xs={10}><Dashboard /></Grid>             
                </Grid>       
              </HeaderLayout>
            )}
          />
          <Route
            path='calculator'
            element={(
              <HeaderLayout>
                <Grid container>
                <Grid item xs={2}><DrawerSide /></Grid>
                <Grid item xs={10}><TogglePage /></Grid>
                </Grid>
              </HeaderLayout>
            )}
          />
          <Route
            path='quiz'
            element={(
              <HeaderLayout>
                <Grid container>
                <Grid item xs={2}><DrawerSide /></Grid>
                <Grid item xs={10}><Game /></Grid>
                </Grid>
              </HeaderLayout>
            )}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
