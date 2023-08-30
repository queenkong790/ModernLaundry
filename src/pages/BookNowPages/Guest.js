import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { postSignUp } from '../../api';
import BookNow from '../BookNow';
import classes from './Login.module.css'
import classes1 from './Signup.module.css'
import { getCustomers } from '../../api'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setEmirateId } from './../../components/Slices/emirateSlice'
import { guestlogin } from './../../components/Slices/guestSlice'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';


const initials = {
    "email": "",
    "rate_code": ""
}

function Guest() {
    const dispatch = useDispatch();
    const [input, setInput] = useState(initials)
    const [redirect, setRedirect] = useState(false);
    const [emirateNumber, setEmirateNumber] = useState('')

    // Define the emirateNumber state variable
    const navigate = useNavigate();
    useEffect(()=>{
        if (redirect) {
            window.location.reload()
            return <BookNow />;
            
    
        
    }},[redirect])
    function goBack() {
        window.location.reload()
    }

    const inputHandler = (input, value) => {
        setInput((prevInput) => {
            return {
                ...prevInput,
                [input]: value,
            };
        });
        console.log(input, value)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await getCustomers(input);
            console.log("inputttt", input);
            console.log("response - ", res);

            if (res && Array.isArray(res)) {
                if (res.length > 0) {
                    const existingCustomer = res.find(customer => customer.email === input.email);
                    if (existingCustomer) {
                        toast.error('Email already exists. Please use a different email.');
                        return;
                    }
                } else {
                    toast.error('No customer data found.');
                    return;
                }
            } else {
                toast.error('Invalid response from the server.' + JSON.stringify(res));
                return;
            }
        } catch (error) {
            console.error("error", error);
            console.log("Response:", error.response);
        }

        console.log(input);
        localStorage.setItem('guestLogin', true)
        localStorage.setItem('email', input.email)
        localStorage.setItem('emirate', input.rate_code)
        
        
         try {
           const res = await postSignUp(input);
           console.log(res);

         } catch (error) {
           console.error(error);
         }

        const emiratesMap = {
            "Ras Al Khaimah": 1,
            "Sharjah": 2,
            "Dubai": 3,
            "Umm Al Quwain": 4,
            "Ajman": 5
        };

        const selectedEmirate = input.rate_code;

        if (selectedEmirate in emiratesMap) {
            const emirateNumber = emiratesMap[selectedEmirate];
            dispatch(setEmirateId(emirateNumber)); // Dispatch the action to update emirateId in Redux
            setEmirateNumber(emirateNumber)
            localStorage.setItem('emirateNumber', emirateNumber)
            dispatch(guestlogin())
            
            const customerData={
                email:input.email,
                emirateNumber:emirateNumber
            }
            const secretKey = '18';
            const jsonData = JSON.stringify(customerData);
            const encryptedData = CryptoJS.AES.encrypt(jsonData, secretKey).toString();
            Cookies.set('guestLogin',encryptedData)
            dispatch(guestlogin(encryptedData))
            setRedirect(true);
        } else {
            setRedirect(false);
            //navigate('/cart');
        }
    }

    if (redirect) {
        return <BookNow />;

    }
    

    return (
        <>
            <div className={classes.formcontainer}>
                <div >
                    <section className={classes.card}>
                        <div className={classes['header']}>
                            <h3 className={classes['login-text']}><strong>Booking as Guest</strong></h3>
                        </div>

                        <form onSubmit={submitHandler} className={classes.body}>

                            <div className={classes['input-control']}>
                                <label>Email*</label>
                                <input
                                    type="email"
                                    placeholder="Email ID"
                                    className={classes['input-field']}
                                    onChange={(e) => inputHandler("email", e.target.value)}
                                />
                            </div>

                            <div className={classes['input-control']}>
                                <label htmlFor="Emirate">Emirate</label>
                                <br></br>
                                <select id="Emirate" className={classes['input-field']} onChange={(e) => inputHandler("rate_code", e.target.value)} >
                                    <option value="">Choose your Emirate</option>
                                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                    <option value="Sharjah">Sharjah</option>
                                    <option value="Dubai">Dubai</option>
                                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                                    <option value="Ajman">Ajman</option>
                                </select>
                            </div>


                            <br></br>

                            <div className={classes.allbuttons}>
                                <div className='text-center'>
                                    <button className={classes1.buttons} type='submit' >Continue</button>
                                </div>
                                <div className='text-center'>
                                    <button className={classes1.buttons} type='button' onClick={() => goBack()}>Back to Login</button>
                                </div>
                            </div>


                        </form>
                        <ToastContainer position='top-right' autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

                    </section>
                </div>

            </div>

        </>
    );
}

export default Guest;
