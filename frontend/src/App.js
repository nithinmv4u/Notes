import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';

function App() {
  return (
      <Router>
        <Header/>
        <PrivateRoute Component={HomePage} path='/' exact/>
        <Routes>          
          <Route Component={LoginPage} path='/login'/>
        </Routes>
      </Router>
    
  );
}

export default App;
