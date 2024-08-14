import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './index.css';
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
import AdminEditNews from './pages/AdminNewsManagement/AdminEditNews';
import PhoneNumber from './pages/AdminSetting/PhoneNumber';
import NotAuthorized from './pages/NotAuthorized/NotAuthorized';
import ProtectedRoute from './components/ProtectedRoute';
import TermsAndConditions from './pages/FooterPages/TermsAndConditions';
import PrivacyPolicy from './pages/FooterPages/PrivacyPolicy'; 
import CheckOut from './pages/CheckOut/CheckOut';
import Payment from './pages/Payments/Payment';

import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="443699119591-sbmbb6e6hrh61fhj5j0u67rpmuaqj4pu.apps.googleusercontent.com">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/LiveEvents' element={<LiveEvents />} />
        <Route path='/Movies' element={<Movies />} />
        <Route path='/News' element={<News />} />
        <Route path='/Contactus' element={<Contactus />} />
        <Route path='/CheckOut' element={<CheckOut />} />
        <Route path='/Payment' element={<Payment />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/TermsAndConditions' element={<TermsAndConditions />} />
        <Route path='/PrivacyPolicy' element={<PrivacyPolicy />} />
        <Route path='/Admin' element={
          <ProtectedRoute allowedRoles={['admin', 'editor', 'contect_owner']}>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path='/AdminAddLiveEvents' element={
          <ProtectedRoute allowedRoles={['admin', 'editor']}>
            <AdminAddLiveEvents />
          </ProtectedRoute>
        } />
        <Route path='/AdminViewLiveEvents' element={
          <ProtectedRoute allowedRoles={['admin', 'editor']}>
            <AdminViewLiveEvents />
          </ProtectedRoute>
        } />
        <Route path='/AddMovie' element={
          <ProtectedRoute allowedRoles={['admin', 'editor']}>
            <AddMovie />
          </ProtectedRoute>
        } />
        <Route path='/ViewMovie' element={
          <ProtectedRoute allowedRoles={['admin', 'editor']}>
            <ViewMovie />
          </ProtectedRoute>
        } />
        <Route path='/AdminContactUs' element={
          <ProtectedRoute allowedRoles={['admin', 'editor']}>
            <AdminContactUs />
          </ProtectedRoute>
        } />
        <Route path='/AdminAddNews' element={
          <ProtectedRoute allowedRoles={['admin', 'contect_owner']}>
            <AdminAddNews />
          </ProtectedRoute>
        } />
        <Route path='/MovieProfile' element={
          <ProtectedRoute allowedRoles={['admin', 'editor']}>
            <MovieProfile />
          </ProtectedRoute>
        } />
        <Route path='/LiveEventProfile' element={
          <ProtectedRoute allowedRoles={['admin', 'editor']}>
            <LiveEventProfile />
          </ProtectedRoute>
        } />
        <Route path='/AdminStreamLiveEvents' element={
          <ProtectedRoute allowedRoles={['admin', 'editor']}>
            <AdminStreamLiveEvents />
          </ProtectedRoute>
        } />
        <Route path='/LiveEventPay' element={
          <ProtectedRoute allowedRoles={['admin']}>
            <LiveEventPay />
          </ProtectedRoute>
        } />
        <Route path='/MoviePay' element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MoviePay />
          </ProtectedRoute>
        } />
        <Route path='/UsersManagement' element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UsersManagement />
          </ProtectedRoute>
        } />
        <Route path='/AdminAddUpcomingMovie' element={
          <ProtectedRoute allowedRoles={['admin', 'contect_owner']}>
            <AdminAddUpcomingMovie />
          </ProtectedRoute>
        } />
        <Route path='/WatchMovie' element={<WatchMovie />} />
        <Route path='/WatchLive' element={<WatchLive />} />
        <Route path='/EditorAccount' element={
          <ProtectedRoute allowedRoles={['admin']}>
            <EditorAccount />
          </ProtectedRoute>
        } />
        <Route path='/PasswordManagement' element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PasswordManagement />
          </ProtectedRoute>
        } />
        <Route path='/AdminLoginOnly' element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLoginOnly />
          </ProtectedRoute>
        } />
        <Route path='/AdminEditUpcomingMovie' element={
          <ProtectedRoute allowedRoles={['admin', 'contect_owner']}>
            <AdminEditUpcomingMovie />
          </ProtectedRoute>
        } />
        <Route path='/AdminEditNews' element={
          <ProtectedRoute allowedRoles={['admin', 'contect_owner']}>
            <AdminEditNews />
          </ProtectedRoute>
        } />
        <Route path='/PhoneNumber' element={
          <ProtectedRoute allowedRoles={['admin']}>
            <PhoneNumber />
          </ProtectedRoute>
        } />
        <Route path='/not-authorized' element={<NotAuthorized />} />
      </Routes>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
