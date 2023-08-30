import React, { useEffect, useState } from "react";
import classes from './TotalFooter.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import classes2 from '../BookNowPages/Signup.module.css';
import { useLocation, useNavigate } from "react-router-dom"; 
import { useSelector,useDispatch } from "react-redux";
import {updateTotalPrice,updateTotalQuantity} from '../../components/Slices/cartSlice'

function TotalFooter({ Data }) {
  const [totalPrice, setTotal] = useState(0);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  //const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  //const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch=useDispatch()
  // Function to calculate the total price based on the Data prop
useEffect(()=>{
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  
  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.finalprice), 0);
  
  // Format the totalPrice to have two decimal places
  const formattedTotalPrice = totalPrice.toFixed(2);
  setTotal(formattedTotalPrice)
  console.log("Total Quantity:", totalQuantity);
  dispatch(updateTotalPrice(totalPrice))
  dispatch(updateTotalQuantity(totalQuantity))
  console.log("Total Price:", totalPrice);
},[cartItems,totalPrice])
    const onClickHandler = () =>{
        navigate('/Order-now')
    }

 /* const calculateTotalPrice = () => {
    
    let totalPrice = 0;
    Data.forEach((item) => {
      if (item.quantity > 0) {
        const selectedPrices = item.pricing.filter(
          (obj) => obj.service === item.selectedService && obj.deliveryType === item.deliveryType
        );
        if (selectedPrices.length > 0) {
          const price = parseFloat(selectedPrices[0].price);
          totalPrice += price * item.quantity;
        }
      }
    });
    return totalPrice;
  };*/

  // Update the total price whenever the Data prop changes
/*  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    setTotal(totalPrice);
    console.log('totalAmount')
  }, [Data]);*/

  return (
    <>
      <div className={`${classes.body} row-fluid`}>
        <strong className={classes.total}>TOTAL: AED {totalPrice}</strong>
        <button className={`${classes2.buttons} ${classes.next}`} style={{ margin: '0 0 0 30px' }} onClick={onClickHandler}> Next</button>
      </div>
    </>
  );
}

export default TotalFooter;
