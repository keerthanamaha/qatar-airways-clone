import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './Component/Home';
import Search from './Component/Search';
import Results from './Component/FlightResults';
import Ticket from './Component/Ticket';
import 'font-awesome/css/font-awesome.min.css';
import ReturnFlight from './Component/ReturnFlight';
import Payment from './Component/Payment';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<><Home /><Search /></>} />
        <Route path="/results" element={<Results />} />
        <Route path="/return-flight" element={<ReturnFlight />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ticket" element={<Ticket />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
