import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Post from './components/Post';
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom"
import Appbar from './components/Appbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Appbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/post/:id' element={<Post />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
