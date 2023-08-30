import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import SearchLogo from "./search-logo.svg";
// import LoginLogo from "./login-logo.svg";
// import SignupLogo from "./signup-logo.svg";
import BrandImage from '../assets/ModernLaundryLogo.png';
import classes from './Secheader.module.css'
import Profile from "../pages/Profile/Profile";
import MyOrders from "../pages/Profile/MyOrders";
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookNow from "../pages/BookNow";
import { guestlogin } from "./Slices/guestSlice";
import GuestProfile from "../pages/Profile/GuestProfile";
import GuestOrders from '../pages/Profile/GuestOrders'

function SecHeader() {
    const [tab, setTab] = useState(true)
    const [isActive, SetisActive] = useState(true)
    const loggedIn=useSelector(state=>state.auth.loggedIn)
    const guestLogin=useSelector(state=>state.guest.loggedIn)
    const navigate=useNavigate()
    const tabProfile = () => {
        setTab(true)
        SetisActive(true)
    }
    const tabOrders = () => {
        setTab(false)
        SetisActive(false)
    }

    return (
        <>
        {(!loggedIn && !guestLogin) ?(<><BookNow/></>): (<div className={classes.siteWrapper}>
            <div  className={`container bg bg-white ${classes.view}`}>
                <h1 className={classes.myacc}>My Account</h1>
                <nav className={classes.navbar} style={{ textAlign: 'center' }}>
                    <a

                        onClick={tabProfile}
                        className={isActive ? `${classes.activeNavLink}` : `${classes.navLink}`}>
                        Profile
                    </a>
                    <a

                        onClick={tabOrders}
                        className={!isActive ? `${classes.activeNavLink}` : `${classes.navLink}`}>
                        MyOrders
                    </a>

                </nav>
               
               
                {(loggedIn && !guestLogin) && (tab  ? <Profile /> : <MyOrders />)}
                
                {(guestLogin && !loggedIn) && (tab  ? <GuestProfile /> : <GuestOrders />)}
               
            </div>
        </div>)
         
         }
        </>
    )
}
export default SecHeader