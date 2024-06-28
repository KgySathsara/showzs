import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Login  from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Register' element={<Register/>}/>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);