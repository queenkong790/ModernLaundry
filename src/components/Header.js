import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink,useNavigate } from "react-router-dom";

import BrandImage from '../assets/ModernLaundryLogo.png';
import classes from "./Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faSignOut } from '@fortawesome/free-solid-svg-icons'
import { login, logout } from './Slices/authSlice'
import { useSelector, useDispatch } from 'react-redux';
import { guestlogin,guestlogout } from "./Slices/guestSlice";
import Cookies from "js-cookie";

export default function Header() {
  const navigate=useNavigate()
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loggedIn = useSelector((state) => state.auth.loggedIn); // Access the authentication state
  const guestLogin=useSelector(state=>state.guest.loggedIn)
  const dispatch = useDispatch();

  useEffect(
    ()=>{
      if(loggedIn){
       // dispatch(login())
        dispatch(guestlogout())
      }else{
        dispatch(logout())
      }
      if(guestLogin){
        dispatch(logout())
      }else(
        dispatch(guestlogout())
      )
    }
  ,[loggedIn,guestLogin])
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };
function logoutHandler(){
  if (localStorage.getItem('rememberMe')){
    //localStorage.removeItem('serialNo')
    //localStorage.removeItem('rate_code')
    localStorage.removeItem('address')
    //localStorage.removeItem('emirateNumber')
  }
  else{
    localStorage.clear()
    
  }
  
  //setLoggedIn(false)
  dispatch(guestlogout())
  dispatch(logout());
  navigate('/BookNow')
  window.location.reload(); 
  
}
const LoggedInHeader=()=>{
  return (
    <>
    <NavLink to="/Profile" onClick={handleNavLinkClick}>
              <FontAwesomeIcon icon={faUserCircle} style={{ color: '#67cbdf' }} size="lg" />
    </NavLink>
    <NavLink
    to="/BookNow"
    
    onClick={logoutHandler}
    
  >
    <FontAwesomeIcon icon={faSignOut} style={{color:'#67cbdf',margin:'20px'}} size="lg"/>
  </NavLink>
  </>
  )
}
const LoggedOutHeader=()=>{
  return (
    <>
    <NavLink to="/BookNow" onClick={handleNavLinkClick}>
              <FontAwesomeIcon icon={faUserCircle} style={{ color: '#67cbdf',margin:'20px' }} size="lg" />
          </NavLink>
    </>
  )
}
  return (
    <>
      <header className={classes.header}>
        <Link className={classes.siteLogo} to="/">
          <img src={BrandImage} alt="Brand Logo" />
        </Link>
        
        <nav className={`${classes.navbar} ${isMenuOpen ? classes.open : ""}`}>
          <NavLink
            to="/"
            onClick={handleNavLinkClick}
            
            className={({ isActive }) => isActive? `${classes.activeNavLink}`: `${classes.navLink}`}
          >
            Homepage
          </NavLink>
          <NavLink
            to="/AboutUs"
            onClick={handleNavLinkClick}
            className={({ isActive }) => isActive? `${classes.activeNavLink}`: `${classes.navLink}`}
          >
            About Us
          </NavLink>
          <NavLink
            to="/Services"
            onClick={handleNavLinkClick}
            className={({ isActive }) => isActive? `${classes.activeNavLink}`: `${classes.navLink}`}
          >
            Services
          </NavLink>
          <NavLink
            to="/BookNow"
            onClick={handleNavLinkClick}
            className={({ isActive }) => isActive? `${classes.activeNavLink}`: `${classes.navLink}`}
          >
            Book Now
          </NavLink>
          <NavLink
            to="/LoyaltyProgram"
            onClick={handleNavLinkClick}
            className={({ isActive }) => isActive? `${classes.activeNavLink}`: `${classes.navLink}`}
          >
            Loyalty Programme
          </NavLink>
          <NavLink
            to="/Corporate"
            onClick={handleNavLinkClick}
            className={({ isActive }) => isActive? `${classes.activeNavLink}`: `${classes.navLink}`}
          >
            Corporate
          </NavLink>
          <NavLink
            to="/Contact"
            onClick={handleNavLinkClick}
            className={({ isActive }) => isActive? `${classes.activeNavLink}`: `${classes.navLink}`}
          >
            Contact
           </NavLink>

           
           {(loggedIn || guestLogin) ? LoggedInHeader():LoggedOutHeader()}

        </nav>
        {/* <div className={classes.navbarLogos}>
          <img src={SearchLogo} alt="Search Logo" className={classes.logo} />
          <img src={LoginLogo} alt="Login Logo" className={classes.logo} />
          <img src={SignupLogo} alt="Signup Logo" className={classes.logo} />
        </div> */}
        <button className={`${classes.hamburger} ${isMenuOpen ? classes.activeham : ''}` } onClick={toggleMenu}>
            <span className={classes.bar}></span>
            <span className={classes.bar}></span>
            <span className={classes.bar}></span>

        </button>
      </header>
    </>
  );
}
