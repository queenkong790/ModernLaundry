import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/Layout';

import LoginPage from './pages/BookNowPages/Login';
import Signup from './pages/BookNowPages/Signup';

import AboutUs from './pages/AboutUs/AboutUs';
import Home from './pages/Home/Home';
import BookNow from './pages/BookNow';
import Services from './pages/services/Service';
import LoyaltyProgram from './pages/LoyaltyProgram';
import Corporate from './pages/Corporate';
import Contact from './pages/Contact';

import MyOrders from './pages/Profile/MyOrders';
import Profile from './pages/Profile/Profile';
import Forgot from './pages/Forgot/Forgot';
import BookingPage from './pages/BookingPage/BookingPage';
import { useEffect } from 'react';
import Verify from './pages/Forgot/Verify';
import NewPassword from './pages/Forgot/NewPassword';
import SecHeader from './components/Secheader';
import Cart from './pages/Cart/Cart';
import CompleteOrder from './pages/Cart/CompleteOrder';
import GuestProfile from './pages/Profile/GuestProfile';

import { useDispatch } from 'react-redux';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home/> },
      { path: '/AboutUs', element: <AboutUs /> },
      { path: '/Services', element: <Services /> },
      { path: '/BookNow', element: <BookNow /> },
      { path: '/LoyaltyProgram', element: <LoyaltyProgram /> },
      { path: '/Corporate', element: <Corporate /> },
      { path: '/Contact', element: <Contact /> },
      { path: '/ForgotPassword', element: <Forgot /> },
      { path: '/VerifyOTP', element: <Verify /> },
      { path: '/NewPassword', element: <NewPassword/> },
      { path: '/cart', element: <BookingPage /> },
      { path: '/Profile', element: <SecHeader />} ,
      { path: '/Order-now', element: <Cart /> },
      { path: '/Success', element: <CompleteOrder /> },
      {path: '/guestProfile',element: <GuestProfile/>}
    
    
    ]
  }
]);

function App() {
  const dispatch=useDispatch()
  

  return <RouterProvider router={router}  />;
}


export default App;
