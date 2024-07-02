import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from './components/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer.jsx'
import {Toaster} from "react-hot-toast";
import {Provider} from 'react-redux';

import store from './store/store.js'

const Root = () => {
  return (
    <div className='flex flex-col min-h-screen'>
   
    <Provider store={store}>
    <Header />
    <Outlet />
    </Provider>
    <Toaster/>
    <Footer/>
    </div>
  )
}

export default Root



