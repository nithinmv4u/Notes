import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';

function App() {
  return (
      <Router>
        <Header/>
        <Routes>
          <Route Component={HomePage} path='/' exact/>
          <Route Component={LoginPage} path='/login'/>
        </Routes>
      </Router>
    
  );
}

export default App;
