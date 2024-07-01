import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LiveEvents from './pages/LiveEvents/LiveEvents';
import Movies from './pages/Movies/Movies';
import News from './pages/News/News';
import Contactus from './pages/Contactus/Contactus';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Admin from './pages/admin/Admin';
import ViewLiveEvent from './pages/AdminLiveEvents/AdminLiveEvents';
import AdminMovieManagement from './pages/AdminMovieManagement/AdminMovieManagement';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/LiveEvents' element={<LiveEvents />}/>
            <Route path='/Movies' element={<Movies />}/>
            <Route path='/News' element={<News />}/>
            <Route path='/Contactus' element={<Contactus />}/>
            <Route path='/Login' element={<Login />}/>
            <Route path='/Register' element={<Register />}/>
            <Route path='/Admin' element={<Admin />}/>
            <Route path='/ViewLiveEvent' element={<ViewLiveEvent />}/>
            <Route path='/AdminMovieManagement' element={<AdminMovieManagement />}/>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);