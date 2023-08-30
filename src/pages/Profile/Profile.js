import 'bootstrap/dist/css/bootstrap.css';


import classes from './Profile.module.css'
import { useState,useEffect } from 'react';
import { getCustomers, putProfile } from '../../api';
import BookNow from '../BookNow';
import { useNavigate,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Profile(){
    const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const previousLocation = queryParams.get('prev');
  const loggedIn=useSelector(state=>state.auth.loggedIn)
  const customerData=useSelector(state=>state.auth.customerData)
  const username=customerData.email
  console.log(customerData)
    const [input,setInput]=useState({
        first_name: '',
        last_name: '',
        rate_code: '',
        address: '',
        street_name: '',
        apartment: '',
        contact_number: '',
        email: '',
      });
   
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const data = await getCustomers();
            const serialNo = localStorage.getItem('serialNo');
            
            console.log(data)
            data.some(obj => {
               
                if (obj.email === username ){
                    setInput(obj)
                    console.log("customer",obj)
                    return true
                }else{
                    console.log('doesnt work')
                    
                    return false
                }
            })
            
    
            
          } catch (error) {
            console.error('Error fetching user data:', error);
            
          }
        };
    
        fetchUserData();
      },[]);
    


    
      
    const SubmitHandler=async(e)=>{
        e.preventDefault();
        console.log(input)
        try{
            const response=await putProfile(input)
            localStorage.setItem('address',input.address)
            
        }catch(error){
            console.error(error)
        }
        if (previousLocation) {
            navigate(previousLocation);
          }
       
    }
    const inputhandler=(input,value)=>{
        setInput((prevInput) => {
            return {
              ...prevInput,
              [input]: value,
            };
          });
    }
    return(
        <>
         <div className='container-fluid' style={{padding:'0px'}}>
            <form onSubmit={SubmitHandler}>
                <div className='row ' style={{margin:'10px',padding:'10px'}}>
                    <div className='col-md-6 form-group'>
                        <label>First name</label>
                        <br/>
                        <input type='text' className='form-control' defaultValue={input['first_name']} 
                        onChange={(e)=>{inputhandler('first_name',e.target.value)}}/>
                    </div>
                    <div className='col-md-6 form-group'>
                        <label>Last name</label>
                        <br/>
                        <input type='text' className='form-control' defaultValue={input['last_name']}
                        onChange={(e)=>{inputhandler('last_name',e.target.value)}}/>
                    </div>
                </div>
                <div className='row ' style={{margin:'10px',padding:'10px'}}>
                    <div className='col-md-6 form-group'>
                        <label>Emirate</label>
                        <br/>
                        
                        <select id="Emirate" className='form-control' onChange={(event) =>
                                    inputhandler('rate_code', event.target.value)}
                                    value={input['rate_code']}>
                                <option value="">Choose Emirates</option>
                                <option value="Sharjah">Sharjah</option>
                                <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                                <option value="Dubai">Dubai</option>
                                <option value="Umm Al Quwain">Umm Al Quwain</option>
                                <option value="Ajman">Ajman</option>
                                onChange
                            </select>
                    </div>
                    <div className='col-md-6 form-group'>
                        <label>Address</label>
                        <br/>
                        <input type='text' className='form-control' defaultValue={input['address']}
                        onChange={(e)=>{inputhandler('address',e.target.value)}}/>
                    </div>
                </div>
                <div className='row ' style={{margin:'10px',padding:'10px'}}>
                    <div className='col-md-6 form-group'>
                        <label>Street name</label>
                        <br/>
                        <input type='text' className='form-control' defaultValue={input['street_name']}
                        onChange={(e)=>{inputhandler('street_name',e.target.value)}}/>
                    </div>
                    <div className='col-md-6 form-group'>
                        <label>Apartment/Building</label>
                        <br/>
                        <input type='text' className='form-control' defaultValue={input['apartment']}
                        onChange={(e)=>{inputhandler('apartment',e.target.value)}}/>
                    </div>
                </div>
                <div className='row ' style={{margin:'10px',padding:'10px'}}>
                    <div className='col-md-6 form-group'>
                        <label>Contact Number</label>
                        <br/>
                        <input type='text' className='form-control' defaultValue={input['contact_number']}
                        onChange={(e)=>{inputhandler('contact_number',e.target.value)}}/>
                    </div>
                    <div className='col-md-6 form-group'>
                        <label>Email</label>
                        <br/>
                        <input type='email' className='form-control' defaultValue={input['email']}
                        onChange={(e)=>{inputhandler('email',e.target.value)}}/>
                    </div>
                </div>
                <div className='text-center'>

                
                <button type='submit' name='button' className={classes.buttons}>Update Profile</button>
                </div>
            </form>
        </div>
        
        </>
    )
}

export default Profile