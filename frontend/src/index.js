import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SeatBooking from './pages/seatBooking';
import LiveEvents from './pages/LiveEvents/LiveEvents';
import Movies from './pages/Movies/Movies';
import News from './pages/News/News';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/seatBooking' element={<SeatBooking />}/>
            <Route path='/LiveEvents' element={<LiveEvents />}/>
            <Route path='/Movies' element={<Movies />}/>
            <Route path='/News' element={<News />}/>

        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);