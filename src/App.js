import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import Performance from './components/Performance';
import Map from './components/Map';
import Navigation from './components/Navigation';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <Container>
      <Row>
        <Col>
          <Navigation />
          <Routes>
            <Route path="/" element={<Login setAuth={setAuth} />} />
            <Route path="/logout" element={<Logout setAuth={setAuth} />} />
            <Route path="/dashboard" element={auth ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/performance" element={auth ? <Performance /> : <Navigate to="/" />} />
            <Route path="/map" element={auth ? <Map /> : <Navigate to="/" />} />
            <Route path="/performance/:vesselId" element={<Performance />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
