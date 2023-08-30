import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate} from 'react-router-dom'
import classes from '../../pages/BookNowPages/Login.module.css'
import classes1 from '../../pages/BookNowPages/Signup.module.css'
import { getCustomers ,getOTP} from '../../api';



function Forgot(){
    const [email,setEmail]=useState('')
    const [invalid,setInvalid]=useState(false)
    const navigate=useNavigate()
    const submithandler=async(e)=>{
        e.preventDefault();
        console.log(email)
        const timestamp = Date.now().toString();
        const otp=timestamp.substr(7,12)
       console.log(otp)
        try {
            const response = await getCustomers();
        
            const matchingObj = response.find((obj) => Object.values(obj).includes(email));
            if (matchingObj) {
              const id = matchingObj['id'];
              console.log('API 1 working');
              const dataToSend = {
                customer_id: id,
                email: email,
                otp:otp,
                id: Math.random().toString(36).substr(2, 9),
              };
              const sendEmail = await getOTP(dataToSend);
              console.log('API 2 working', sendEmail);
              navigate('/VerifyOTP',{state:{otp:otp,id:id,email:email}})
            } else {
              setInvalid(true);
            }
          } catch (error) {
            console.error(error);
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
                    {invalid && <p style={{color:'red'}}>Invalid Email or Password !</p>}
                        <div className={classes['input-control']}>
                        
                            <input
                                type="email"
                                placeholder="Email ID"
                                className={classes['input-field']}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        
                        
                        
                        
                        <br></br>
                        
                        <div className='text-center'>
                        <button type='submit' className={classes1.buttons} >Send OTP</button>
                        </div>
                        
                    </form>
                    
                </section>
            </div>
           
        </div>
        
        </>
    )
}
export default Forgot;