import LoginPage from "./BookNowPages/Login";
import Signup from "./BookNowPages/Signup";
import Guest from './BookNowPages/Guest';
import BookingPage from './BookingPage/BookingPage';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


function BookNow() {
  
  const [customerId, setCustomerId] = useState(false);
  const loggedIn=useSelector(state=>state.auth.loggedIn)
  const guestLogin=useSelector(state=>state.guest.loggedIn)
 
  const navigate = useNavigate();
  const location=useLocation()
  //const redirectToLogin=location.state.redirectToLogin
  
 
   
  return (
    <>
    
      {(!loggedIn && !guestLogin ) && <LoginPage  />}
      
      
      {loggedIn  && <BookingPage/>}
      
      {guestLogin  && <BookingPage/>}
     
     
    </>
  );
}

export default BookNow;
