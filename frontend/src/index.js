import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SeatBooking from './pages/seatBooking';
import LiveEvents from './pages/LiveEvents/LiveEvents';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/seatBooking' element={<SeatBooking />}/>
            <Route path='/LiveEvents' element={<LiveEvents />}/>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);