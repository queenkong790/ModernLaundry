import React, { useState } from 'react'
import classes from './Cart.module.css'
import { useSelector } from 'react-redux';
import { removeItemFromCart ,addItemToCart,updateTotalPrice,updateTotalQuantity} from '../../components/Slices/cartSlice';
import { useDispatch } from 'react-redux';
import { postOrder } from '../../api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



function CompleteOrder() {
  // const cartItems = useSelector((state) => state.cart.items); 
  // const pickupDate=useSelector((state)=>state.cart.pickupDate)
  // const deliveryDate=useSelector((state)=>state.cart.deliveryDate)
  // const subtotal=useSelector((state)=>state.cart.totalPrice)
  // const totalQuantity=useSelector((state)=>state.cart.totalQuantity)
  const [quantity,setQuantity]=useState(0)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const modeMap=['STANDARD (48 HRS)','EXPRESS(24HRS)','SAME DAY(12HRS']
  const location = useLocation();
  const { note, cartItems, totalQuantity, subtotal, pickupDate, deliveryDate } = location.state || {};

  
 /* const Datatosend=()=>{
    
    if (quantity!==0){
      setQuantity(quantity)
      dispatch(addItemToCart({ ide,header, selectedService,deliveryType, finalprice, quantity,Delivery }));
    console.log('Data to send:')
    console.log('id:',ide,'header:', header, 'serviceType;',selectedService, 'price;',finalprice,'quanitity:', quantity,'Delivery:',Delivery,'DeliveryType',deliveryType);
    }else{
      dispatch(removeItemFromCart({ ide }));
    }
    
  }*/



    

  return (
    <div className='container justify-content-center' >
      <div className='row ' style={{padding:'0',margin:'0',marginRight:'-15px',marginLeft:'-15px'}}>
      <div className='col-md-12 col-xs-12 '>
      <h2 className="text-center" style={{ color: '#60d0e4' }}>Your order has been placed! </h2>
    <p className="text-center" style={{ margin: '0px !important' }}>A spotless delivery expert will contact you soon.</p>
    <div className={classes.body}>
      <div>
        <h2>

        </h2>

        <form >

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
            <td>{localStorage.getItem('address')}<Link to='/Profile' style={{ textDecoration: 'none', color: 'inherit' }}></Link></td>
            </tr>
            <tr>
            <td>Special Requests</td>
            <td>{note}</td>
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
              {console.log(item.ide)}
              <td>{item.header}</td>
              <td>{item.quantity}</td>
              <td>{item.selectedService}</td>
              <td>{item.Delivery}</td>
              <td>{item.finalprice}</td>
            </tr>
          ))}
              
              <tr>
                	<td colspan="2" style={{border:'none'}}></td>
                	<td style={{border:'none'}}></td>
                	<td colspan="2" style={{border:'none'}}></td>
                    <td colspan="2" style={{border:'none',color:'grey'}}  >Sub Total : {(parseFloat(subtotal).toFixed(2))}</td>
                </tr>
                
              
              <tr style={{backgroundColor:'#ebeff3'}}>
              
                <td colSpan='2' style={{border:'1px solid white !important',fontSize:'18px'}}>Total Items</td>
                <td style={{border:'1px solid white !important'}}>{totalQuantity}</td>
                
                <td colSpan='2' style={{border:'1px solid white !important'}}>Total AED</td>
                <td style={{border:'none !important'}}>{(parseFloat(subtotal).toFixed(2))}</td>
                <td style={{border:'1px solid white !important'}}></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
    </div>
      </div>
    </div>
   
  )
}

export default CompleteOrder