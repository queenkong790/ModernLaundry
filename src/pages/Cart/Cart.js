import { text } from '@fortawesome/fontawesome-svg-core'
import React, { useState,useEffect } from 'react'
import { alignPropType } from 'react-bootstrap/esm/types'
import classes from './Cart.module.css'
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faPencilSquare,faPlusSquare,faMinusSquare} from '@fortawesome/free-solid-svg-icons'
import { removeItemFromCart ,addItemToCart,updateTotalPrice,updateTotalQuantity, clearCartItems} from '../../components/Slices/cartSlice';
import { useDispatch } from 'react-redux';
import { postOrder } from '../../api';
import { Link } from 'react-router-dom';
import { useNavigate,useLocation } from 'react-router-dom';
import Signup from '../BookNowPages/Signup';
import LoginPage from '../BookNowPages/Login';




function Cart() {
  const cartItems = useSelector((state) => state.cart.items); 
  const pickupDate=useSelector((state)=>state.cart.pickupDate)
  const deliveryDate=useSelector((state)=>state.cart.deliveryDate)
  const subtotal=useSelector((state)=>state.cart.totalPrice)
  const totalQuantity=useSelector((state)=>state.cart.totalQuantity)
  const loggedIn=useSelector((state)=>state.auth.loggedIn)
  const customerData = useSelector(state => state.auth.customerData)
  const emirateNumber=customerData.emirateNumber
  const address=customerData.address
  const [redirect,setRedirect]=useState(false)
  const [quantity,setQuantity]=useState(0)
  const [note,setNote]=useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const orderItems = cartItems.map((item) => {
    return {"DELIVERY": item.DELIVERY, 

    "Price": item.finalprice, 
    
    "item": item.ide, 
    
    "qty": item.quantity, 
    
    "service": item.selectedService};
  });
  console.log("subtotal", subtotal)

 

  console.log(pickupDate,deliveryDate)
  const initials={
    "SpecialRequests": note,
    "branch": "12", 
    "customerID": localStorage.getItem('serialNo'),
    "deliveryDate": deliveryDate, 
    "deliveryType": cartItems[0]?.deliveryType ,
    "emirate_id":emirateNumber,
    "orderDelete": "-",
    "order_item": orderItems,
    "order_source": "Mobile",
    "pickupDate": pickupDate,

    "subtotal":subtotal }
    console.log("subtttoal = ", subtotal);
    const [input,setinput]=useState(initials)
    const modeMap=['STANDARD (48 HRS)','EXPRESS(24HRS)','SAME DAY(12HRS']
    
    console.log(input)
    
  const [previousLocation, setPreviousLocation] = useState(null);

  useEffect(() => {
    // Update the previousLocation state with the current location when component mounts
    setPreviousLocation(window.location.pathname);
  }, []);
  const handleDelete=(ide)=>{
    dispatch(removeItemFromCart({ide}))
    
  }
  useEffect(() => {
    // Update the local quantity state when the Redux totalQuantity changes
   // setQuantity(totalQuantity);
  }, [totalQuantity]);

  
 
  const handleIncrement = (ide,header, selectedService,deliveryType, finalprice, quantity,Delivery,priceForEach) => {
    const newQuantity=quantity+1
    const newPrice=(parseInt(newQuantity) * priceForEach).toFixed(2)
    const newSubtotal= subtotal+priceForEach
    const formattedSubtotal=parseFloat(newSubtotal)
    const totalquantity=totalQuantity+1
    Datatosend(ide,header, selectedService,deliveryType, newPrice, newQuantity,Delivery,priceForEach,formattedSubtotal,totalquantity)
  };

  const handleDecrement = (ide,header, selectedService,deliveryType, finalprice, quantity,Delivery,priceForEach) => {
    
    const newQuantity=quantity-1
    const newPrice=(parseInt(newQuantity) * priceForEach).toFixed(2)
    const newSubtotal=(subtotal-priceForEach)
    const formattedSubtotal=parseFloat(newSubtotal)
    const totalquantity=totalQuantity-1
    Datatosend(ide,header, selectedService,deliveryType,newPrice, newQuantity,Delivery,priceForEach,formattedSubtotal,totalquantity)
  };
  function goBack()
  {
    navigate('/BookNow')
  }

  const Datatosend=(ide,header, selectedService,deliveryType, finalprice, quantity,Delivery,priceForEach,newSubtotal,totalquantity)=>{
    const newQuantity = quantity
    const fprice = finalprice
    if (newQuantity!==0){
      setQuantity(newQuantity)
      setinput(prevInput => ({
        ...prevInput,
        order_item: prevInput.order_item.map(item => (item.item === ide ? { ...item, qty: newQuantity, Price: fprice} : item))
      }));
      dispatch(addItemToCart({ ide,header, selectedService,deliveryType, finalprice, quantity,Delivery ,priceForEach}));
      console.log(newQuantity,'ye hae quantity')
      dispatch(updateTotalPrice(newSubtotal))
      dispatch(updateTotalQuantity(totalquantity))
    console.log('Data to send:')
    console.log('id:',ide,'header:', header, 'serviceType;',selectedService, 'price;',finalprice,'quanitity:', quantity,'Delivery:',Delivery,'DeliveryType',deliveryType);
    }else{
      setinput(prevInput => ({
        ...prevInput,
        order_item: prevInput.order_item.filter(item => item.item !== ide)
      }));
  
      
      dispatch(removeItemFromCart({ ide }));
      dispatch(updateTotalPrice(newSubtotal))
    }}

    useEffect(()=>{
      input.subtotal = parseFloat(subtotal).toFixed(2);
    },[Datatosend])

  const submitHandler=async(e)=>{
    e.preventDefault()
    if (localStorage.getItem('address')){
      console.log("final",input)
      try{
        const data=await postOrder(input)
        console.log('done')
  
        if (data) {
          const successPageState = {
            note,
            cartItems,
            totalQuantity,
            subtotal,
            deliveryDate,
            pickupDate
          };
          navigate('/Success', { state: successPageState });
          dispatch(clearCartItems());
          console.log('Form submitted successfully!');
        }
      }
      catch(error){
        console.error(error)
      }
    }else{
      alert('please fill out all the fields')
    }
    

  }
  const Signupredirect=()=>{
    setRedirect(true)
  }
  if (redirect){
    const redirectToLogin=true
    //navigate('/BookNow', {state:redirectToLogin} )
    return <LoginPage/>
  }
  return (
    <div className='container justify-content-center' >
      <div className='row ' style={{padding:'0',margin:'0',marginRight:'-15px',marginLeft:'-15px'}}>
      <div className='col-md-12 col-xs-12 '>
      <input className={classes.button2} value="Go Back" onClick={()=>goBack()}></input>
      <h2 class="text-center text-info" style={{color: "#60d0e4 !important"}}>Review Order</h2>
    <div className={classes.body}>
      <div>
        <h2>

        </h2>

        <form onSubmit={submitHandler}>

          <table className={classes.table001}>
            <tbody>
            
            <tr>
            <td>Mode</td>
            {cartItems[0]?.deliveryType=='1' &&
               <td>{modeMap[0]}</td>
             }
             {cartItems[0]?.deliveryType=='2' &&
               <td>{modeMap[1]}</td>
             }
             {cartItems[0]?.deliveryType=='3' &&
               <td>{modeMap[2]}</td>
             }
            </tr>
            <tr>
            <td>Pick-Up Date</td>
            <td>{pickupDate}</td>
            </tr>
            <tr>
            <td>Delivery Date</td>
            <td>{deliveryDate}</td>

            </tr>
            <tr>
            <td>Deliver To</td>
            { (localStorage.getItem('address') || loggedIn) &&
              <td>{address} <Link to={`/Profile?prev=${encodeURIComponent(previousLocation)}`}  style={{ textDecoration: 'none', color: 'inherit' }}> <FontAwesomeIcon icon={faPencilSquare}/></Link></td>
            }
            { !loggedIn  && <td><button type='button' onClick={Signupredirect} style={{padding:'2px',backgroundColor:'#38a5b9',color:'white',borderRadius:'5px',outline:'none'}}>Add delivery address</button></td>}
            </tr>
            <tr>
            <td>Special Requests</td>
            <td><input type='text' className='form-control' onChange={(e)=>setNote(e.target.value)}></input></td>
            </tr>
            </tbody>
          </table>
          <br/>
          <table className={classes.table2} style={{width:'100%',borderRadius:'50px'}}>
            <tbody style={{textAlign: "center"}}>
              <th>No</th>
              <th>ITEM</th>
              <th>QUANTITY</th>
              <th>SERVICE</th>
              <th>DELIVERY</th>
              <th>AMOUNT(AED)</th>
              <th></th>
              
              {cartItems.map((item, index) => (
              
              
            <tr key={index}>
              <td>{index + 1}</td>
              {console.log(item)}
              <td>{item.header}</td>
              
              <td><FontAwesomeIcon icon={faPlusSquare} onClick={()=>handleIncrement(item.ide,item.header, item.selectedService,item.deliveryType, item.finalprice, item.quantity,item.Delivery,item.priceForEach)}/> {item.quantity} <FontAwesomeIcon icon={faMinusSquare} onClick={()=>handleDecrement(item.ide,item.header, item.selectedService,item.deliveryType, item.finalprice, item.quantity,item.Delivery,item.priceForEach)} /></td>
              <td>{item.selectedService}</td>
              <td>{item.Delivery}</td>
              <td>{item.finalprice}</td>
              <td onClick={() => handleDelete(item.ide)}><FontAwesomeIcon icon={faTrash} ></FontAwesomeIcon></td>
            </tr>
          ))}
              
              <tr>
                	<td colspan="2" style={{border:'none'}}></td>
                	<td style={{border:'none'}}></td>
                	<td colspan="2" style={{border:'none'}}></td>
                    <td colspan="2" style={{border:'none',color:'grey'}}  >Sub Total : {(parseFloat(subtotal).toFixed(2))}</td>
                </tr>
                
              
              <tr style={{backgroundColor:'#ebeff3'}}>
              
                <td colSpan='2' style={{border:'1px solid white !important',fontSize:'18px'}}>Total quantity</td>
                <td style={{border:'1px solid white !important'}}>{totalQuantity}</td>
                
                <td colSpan='2' style={{border:'1px solid white !important'}}>Total AED</td>
                <td style={{border:'none !important'}}>{(parseFloat(subtotal).toFixed(2))}</td>
                <td style={{border:'1px solid white !important'}}></td>
              </tr>
            </tbody>
          </table>

            <div className={classes.payment}>
            
              <input type='radio' value='cod' checked/>
              <label>Cash On Delivery</label>
               
              
              <input type='radio' value='card'/>
              
              <label>Card On Delivery</label>
            
                <input type='radio' value='online'/>
                <label>Pay Online</label>
               
            </div>
            <div className={classes.payment}>
              <button type='submit'>Complete Order</button>
            
            </div>
        </form>
      </div>
    </div>
    </div>
      </div>
    </div>
   
  )
}

export default Cart