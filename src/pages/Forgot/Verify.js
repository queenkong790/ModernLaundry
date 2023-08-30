import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import classes from '../../pages/BookNowPages/Login.module.css'
import classes1 from '../../pages/BookNowPages/Signup.module.css'
import { useLocation, useNavigate } from 'react-router-dom';



function Verify(){
    const [OTP,setOTP]=useState('')
    const navigate=useNavigate()
    const location=useLocation() 
    const submithandler=async(e)=>{
        e.preventDefault();
        
    const id=location.state.id
        if (location.state.otp===OTP){
            navigate('/NewPassword',{state:{isAuth:1,id:id}})
        }

        
    }
    return (
        <>
        <div className={classes.formcontainer}>
           <div >
                <section className={classes.card}>
                    <div className={classes['header']}>
                        <h3 className={classes['login-text']}><strong>Recover Password</strong></h3>
                    </div>

                    <form onSubmit={submithandler} className={classes.body}>
                    
                        <div className={classes['input-control']}>
                        
                            <input
                                type="number"
                                placeholder="Enter OTP"
                                className={classes['input-field']}
                                onChange={(e)=>setOTP(e.target.value)}
                            />
                        </div>
                        
                        
                        
                        
                        <br></br>
                        
                        <div className='text-center'>
                        <button className={classes1.buttons} type='submit' >Verify OTP</button>
                        </div>
                        
                    </form>
                    
                </section>
            </div>
           
        </div>
        
        </>
    )
}
export default Verify;