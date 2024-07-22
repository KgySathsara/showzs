import React from 'react';
import ReactDOM from 'react-dom/client';
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
import AdminAddLiveEvents from './pages/AdminLiveEvents/AdminAddLiveEvents';
import AdminViewLiveEvents from './pages/AdminViewLiveEvents/AdminViewLiveEvents';
import AddMovie from './pages/AdminMovieManagement/AddMovie';
import ViewMovie from './pages/AdminMovieManagement/ViewMovie';
import AdminContactUs from './pages/AdminContactUs/AdminContactUs';
import AdminAddNews from './pages/AdminNewsManagement/AdminAddNews';
import MovieProfile from './pages/AdminMovieManagement/MovieProfile';
import AdminStreamLiveEvents from './pages/AdminStreamLiveEvents/AdminStreamLiveEvents';
import LiveEventPay from './pages/Payments/LiveEventPay';
import MoviePay from './pages/Payments/MoviePay';
import UsersManagement from './pages/AdminAdditionalSection/UsersManagement';
import AdminAddUpcomingMovie from './pages/AdminNewsManagement/AdminAddUpcomingMovie';
import WatchMovie from './pages/Show/WatchMovie';
import WatchLive from './pages/LiveView/WatchLive';
import LiveEventProfile from './pages/LiveEventProfile/LiveEventProfile';
import EditorAccount from './pages/AdminSetting/EditorAccount';
import PasswordManagement from './pages/AdminSetting/PasswordManagement';
import AdminLoginOnly from './pages/AdminLoginOnly/AdminLoginOnly';
import AdminEditUpcomingMovie from './pages/AdminNewsManagement/AdminEditUpcomingMovie';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/LiveEvents' element={<LiveEvents />} />
      <Route path='/Movies' element={<Movies />} />
      <Route path='/News' element={<News />} />
      <Route path='/Contactus' element={<Contactus />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/Admin' element={<Admin />} />
      <Route path='/AdminAddLiveEvents' element={<AdminAddLiveEvents />} />
      <Route path='/AdminViewLiveEvents' element={<AdminViewLiveEvents />} />
      <Route path='/AddMovie' element={<AddMovie />} />
      <Route path='/ViewMovie' element={<ViewMovie />} />
      <Route path='/AdminContactUs' element={<AdminContactUs />} />
      <Route path='/AdminAddNews' element={<AdminAddNews />} />
      <Route path='/MovieProfile' element={<MovieProfile />} />
      <Route path='/LiveEventProfile' element={<LiveEventProfile />} />
      <Route path='/AdminStreamLiveEvents' element={<AdminStreamLiveEvents />} />
      <Route path='/LiveEventPay' element={<LiveEventPay />} />
      <Route path='/MoviePay' element={<MoviePay />} />
      <Route path='/UsersManagement' element={<UsersManagement />} />
      <Route path='/AdminAddUpcomingMovie' element={<AdminAddUpcomingMovie />} />
      <Route path='/WatchMovie' element={<WatchMovie />} />
      <Route path='/WatchLive' element={<WatchLive />} />
      <Route path='/EditorAccount' element={<EditorAccount />} />
      <Route path='/PasswordManagement' element={<PasswordManagement />} />
      <Route path='/AdminLoginOnly' element={<AdminLoginOnly />} />
      <Route path='/AdminEditUpcomingMovie' element={<AdminEditUpcomingMovie />} />
    </Routes>
  </BrowserRouter>
);
