import classes from './Footer.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/ModernLaundryLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function Footer () {
    return (
        <div className={classes.footer}>
            <div className='container '>
                <div className='row justify-content-center'>
                    <div className='col-12 col-md-3 col-sm-4' >
                        <img src={logo}/>
                    </div>
                    <div className='col-12 col-md-3 col-sm-4'>
                        <label className='' style={{fontSize:'30px'}}> 
                        <FontAwesomeIcon icon={faFacebookF}/>&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faInstagram}/>&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faLinkedinIn}/>&nbsp;&nbsp;
                        </label>
                    </div>
                    <div className='col-12 col-md-3 col-sm-4 '>
                        <a href='/Booknow' className='text-decoration-none text-dark'> Book Now</a><br/>
                        <a href='/Corporate' className='text-decoration-none text-dark'> Companies</a><br/>
                        <a href='/' className='text-decoration-none text-dark'> Most frequently asked questions</a><br/>
                        <a href='/' className='text-decoration-none text-dark'> Terms Of Service</a><br/>

                    </div>
                    <div className='col-12 col-md-3 col-sm-4'>
                    <a href='/' className='text-decoration-none text-dark'> Home Page</a><br/>
                        <a href='/AboutUs' className='text-decoration-none text-dark'> About Us</a><br/>
                        <a href='/Services' className='text-decoration-none text-dark'>Services</a><br/>
                        <a href='/LoyaltyProgram' className='text-decoration-none text-dark'> Loyalty Programme</a><br/>
                        <a href='/Contact' className='text-decoration-none text-dark'> Call Us</a><br/>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Footer;