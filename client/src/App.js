import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom"
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/icons-material/Menu'
import Appbar from './components/Appbar';






function App() {
  return (
    <Router>
      <div className="App">
        {/* <ResponsiveAppBar /> */}
        <Appbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
