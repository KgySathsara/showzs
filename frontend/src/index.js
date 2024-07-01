import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import SeatBooking from './pages/seatBooking';
import LiveEvents from './pages/LiveEvents/LiveEvents';
import Movies from './pages/Movies/Movies';
import News from './pages/News/News';
import Contactus from './pages/Contactus/Contactus';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Admin from './pages/admin/Admin';
import AdminAddLiveEvents from './pages/AdminLiveEvents/AdminAddLiveEvents';
import AdminViewLiveEvents from './pages/AdminViewLiveEvents/AdminViewLiveEvents';
// import AdminMoviesList from './pages/adminmovieslist/Adminmovieslist';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}/>
            {/* <Route path='/seatBooking' element={<SeatBooking />}/> */}
            <Route path='/LiveEvents' element={<LiveEvents />}/>
            <Route path='/Movies' element={<Movies />}/>
            <Route path='/News' element={<News />}/>
            <Route path='/Contactus' element={<Contactus />}/>
            <Route path='/Login' element={<Login />}/>
            <Route path='/Register' element={<Register />}/>
            <Route path='/Admin' element={<Admin />}/>
            <Route path='/AdminAddLiveEvents' element={<AdminAddLiveEvents />}/>
            <Route path='/AdminViewLiveEvents' element={<AdminViewLiveEvents />}/>
            {/* <Route path='/AdminMoviesList' element={<AdminMoviesList />}/> */}
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);