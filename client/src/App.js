import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path='/' element={<><Link to={'/login'}>Login</Link> <Link to={'/register'}>Register</Link> </>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
