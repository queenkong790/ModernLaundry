import { useState } from 'react';
import bg from '../../assets/bg.png'
import 'bootstrap/dist/css/bootstrap.css';
import classes from './Signup.module.css'
import { postSignUp } from '../../api'
import { Navigate, useNavigate } from 'react-router-dom';
import BookNow from '../BookNow';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCustomers } from '../../api'
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { login, logout } from '../../components/Slices/authSlice'
const emiratesMap = {
    "Ras Al Khaimah": 1,
    "Sharjah": 2,
    "Dubai": 3,
    "Umm Al Quwain": 4,
    "Ajman": 5
  };



const initials={
    "area": "",
    "branchid": "",
    "address": " ",
    "last_name": "",
    "rate_code": "",
    "street_name": "",
    "contact_number": "",
    
    "rate_code_id": "",
    "branch_name": "",
    "alter_Contact_Number": "",
    
    "first_name": "",
    "email": "",
    "apartment": "",
    "Password": ""
  }


const Signup = () => {
    const [input, setInput] = useState(initials)
    const [redirecttoLogin, setredirect] = useState(false)
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const loggedIn=useSelector(state=>state.auth.loggedIn)
    const [fieldFilled, setFieldFilled] = useState({
        "area": false,
    "branchid": true,
    "address": false,
    "last_name": false,
    "rate_code": false,
    "street_name": false,
    "contact_number": false,
    
    "rate_code_id": true,
    "branch_name": true,
    "alter_Contact_Number": true,
    
    "first_name": false,
    "email": false,
    "apartment": false,
    "Password": false
       
    });
   
    

    const setCS = (customerD) => {
        
        // Update customerData state and perform encryption/storage after state is updated
        console.log(customerD)
          const secretKey = '18';
          const jsonData = JSON.stringify(customerD);
          const encryptedData = CryptoJS.AES.encrypt(jsonData, secretKey).toString();
          Cookies.set('encryptedCustomerData', encryptedData);
          dispatch(login(encryptedData));
          
      };


    const submithandler = async (e) => {
        e.preventDefault();
    
        console.log(input);
    
        const emptyFields = [];
    
        // Check for empty fields and add field names to the emptyFields array
        for (const [field, filled] of Object.entries(fieldFilled)) {
            if (!filled) {
                emptyFields.push(field);
            }
        }
    
        if (emptyFields.length > 0) {
            emptyFields.forEach((field) => {
                toast.error(`Please fill out the "${field}" field.`);
            });
            return;
        }

        if (input.Password !== input.ConfirmPassword){
            toast.error("Password and Confirm Password do not match.");
            return;
        }

        
        

        try {
            const res = await getCustomers();
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
            try{
                const res=await postSignUp(input)
    
            }catch(error){
                console.error(error)
            }

            const data = await getCustomers();
            data.some(obj => {
                if (Object.values(obj).includes(input.email) && Object.values(obj).includes(input.Password) ){
                 //setSerialNumber(obj.serialNo);
                 console.log('working')
                 localStorage.setItem("serialNo",obj.serialNo)
                 localStorage.setItem("email",obj.email)
                 localStorage.setItem('rate_code',obj.rate_code)
                 localStorage.setItem('address',obj.address)
                 
                 
                 
                   const selectedEmirate = obj.rate_code;
               
                   if (selectedEmirate in emiratesMap) {
                     const emirateNumber=emiratesMap[selectedEmirate];
                     console.log(emirateNumber)
                     
                    
                     //dispatch(setEmirateId(emirateNumber));
                     

                     const customerData = {
                         serialNo: obj.serialNo,
                         email: obj.email,
                         rate_code: obj.rate_code,
                         address: obj.address,
                         emirateNumber:emirateNumber,
                         branchid:obj.branchid
                         // Add other customer properties here
                       };
                     setCS(customerData)
                     
                   navigate('/Booknow')

                   
                   }
                   
                   
                       
                }
                })
        } catch (error) {
            console.error("error", error);
            console.log("Response:", error.response);
        }
        
        
            
        
    };
    

    if (redirecttoLogin) {
        return <BookNow email={input['email']} Password={input['Password']}/>
    }
    function inputChangeHandler(input, value) {
        setInput((prevInput) => {
            return {
                ...prevInput,
                [input]: value,
            };
        });
        setFieldFilled((prevFilled) => ({
            ...prevFilled,
            [input]: value.trim() !== '',
        }));
    }

    return (
        <div className={classes.container}>
            <div className=''>
                <section className={classes.section}>
                    <div className={classes.head} style={{ margin: '0px', padding: '20px' }}>
                        <h3 className=''><strong>Signup to Earn Points with our Loyalty Program</strong></h3>
                    </div>

                    <form onSubmit={submithandler}>
                        <div className='row' style={{ margin: '10px', padding: '10px' }} >
                            <div className='form-group col-md-6' style={{ paddingLeft: '22px' }} >
                                <label htmlFor="firstname">First Name</label>
                                <br />
                                <input
                                    type="text"
                                    placeholder="Enter your first name"
                                    className='form-control'
                                    id='firstname'
                                    onChange={(event) =>
                                        inputChangeHandler('first_name', event.target.value)}
                                />
                            </div>
                            <div className='form-group col-md-6'>
                                <label htmlFor="lastname">Last Name</label>
                                <br></br>
                                <input
                                    type="text"
                                    placeholder="Enter your last name"
                                    className='form-control'
                                    id='lastname'
                                    onChange={(event) =>
                                        inputChangeHandler('last_name', event.target.value)}
                                />
                            </div>
                        </div>
                        <div className='row ' style={{ margin: '20px', padding: '10px' }}>
                            <div className='col md-6 form-group' >
                                <label htmlFor="Emirate">Emirate :</label>
                                <select id="Emirate" className='form-control' onChange={(event) =>
                                    inputChangeHandler('rate_code', event.target.value)}>
                                    <option value="">Choose your Emirate</option>
                                    <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                    <option value="Sharjah">Sharjah</option>
                                    <option value="Dubai">Dubai</option>
                                    <option value="Umm Al Quwain">Umm Al Quwain</option>
                                    <option value="Ajman">Ajman</option>
                                    onChange
                                </select>
                            </div>

                            <div className='col-md-6 form-group ' >

                                <label htmlFor="Area">Area   &nbsp; &nbsp;:  </label>
                                <input id="Area" className='form-control'
                                    onChange={(event) =>
                                        inputChangeHandler('area', event.target.value)}
                                />

                            </div>
                        </div>

                        <div className='row ' style={{ margin: '20px', padding: '10px' }}>
                            <div className='col-12 form-group'>
                                <label htmlFor="address">Closest matching address:</label>
                                <br></br>
                                <textarea
                                    rows={1}
                                    cols={50}
                                    placeholder=""
                                    className='form-control'
                                    id='address'
                                    onChange={(event) =>
                                        inputChangeHandler('address', event.target.value)}
                                />
                            </div>
                        </div>

                        <div className='row' style={{ margin: '20px', padding: '10px' }}>
                            <div className='form-group col-md-6'>
                                <label htmlFor="street">Street Name</label>
                                <br></br>
                                <input
                                    type="text"
                                    placeholder="Enter your Street Name"
                                    className='form-control'
                                    id='street'

                                    onChange={(event) =>
                                        inputChangeHandler('street_name', event.target.value)}
                                />
                            </div>
                            <div className='form-group col-md-6'>
                                <label htmlFor="apartment">Apartment/Building</label>
                                <br></br>
                                <input
                                    type="text"
                                    placeholder="Enter your Apartment/Building name"
                                    className='form-control'
                                    id='apartment'
                                    onChange={(event) =>
                                        inputChangeHandler('apartment', event.target.value)}
                                />
                            </div>
                        </div>
                        <div className='row' style={{ margin: '20px', padding: '10px' }}>
                            <div className='form-group col-md-6'>
                                <label htmlFor="phone">Contact Number</label>
                                <br></br>

                                <input
                                    type="number"
                                    placeholder="Enter your Contact "
                                    className='form-control'
                                    id='phone'
                                    onChange={(event) =>
                                        inputChangeHandler('contact_number', event.target.value)}
                                />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor="email">Email</label>
                                <br></br>
                                <input
                                    type="email"
                                    placeholder="Enter your Email ID"
                                    className='form-control'
                                    id='email'
                                    onChange={(event) =>
                                        inputChangeHandler('email', event.target.value)}
                                />
                            </div>
                        </div>
                        <div className='row' style={{ margin: '20px', padding: '10px' }}>
                            <div className='form-group col-md-6'>
                                <label htmlFor="password">Choose a Password</label>
                                <br></br>
                                <input
                                    type='Password'
                                    placeholder="Choose a password"
                                    className='form-control'
                                    id='password'
                                    onChange={(event) =>
                                        inputChangeHandler('Password', event.target.value)}
                                />
                            </div>
                            <div className='form-group col-md-6'>
                                <label htmlFor="confirmpassword">Confirm Password</label>
                                <br></br>
                                <input
                                    type='Password'
                                    placeholder="Confirm password"
                                    className='form-control'
                                    id='confirmpassword'
                                    onChange={(event) =>
                                        inputChangeHandler('ConfirmPassword', event.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div className='text-center'>
                            <button className={classes.buttons} type='submit' style={{ width: '300px' }} >Save Details</button>
                            &nbsp;<button className={classes.buttons} type='button' onClick={() =>window.location.reload()} style={{ width: '300px' }} >Back to login</button>
                        </div>
                        <ToastContainer position='top-right' autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                    </form>
                </section>
            </div>

        </div>
    );

}
export default Signup;