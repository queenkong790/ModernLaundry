import React, { useEffect, useState, useRef } from "react";
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import classes from './Datepick.module.css';
import trolley from '../../assets/pickup.jpg';
import delivery from '../../assets/delivery.jpg';
import { useDispatch } from "react-redux";
import { updatePickupDate,updateDeliveryDate } from "../../components/Slices/cartSlice";

function DatePick({ deliveryType }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState(new Date());
  const datepickerRef = useRef(null);
  const dispatch=useDispatch()

  const handleIconClick = () => {
    datepickerRef.current.setOpen(true);
  };

  const formatDateToString = (date) => {
    if (!date) {
      return "wait"; // Return an empty string or any other default value for null dates
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    console.log("${day}/${month}/${year}")
    return `${day}-${month}-${year}`;
  };



  // const formatDateToString = (date) => {
  //   if (!date) {
  //     return ""; // Return an empty string for null dates
  //   }

  //   const day = date.getDate().toString().padStart(2, "0");
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const year = date.getFullYear().toString().padStart(4, "0");
  //   const hours = date.getHours().toString().padStart(2, "0");
  //   const minutes = date.getMinutes().toString().padStart(2, "0");
  //   const ampm = hours >= 12 ? "PM" : "AM";
  //   const formattedHours = (hours % 12 || 12).toString().padStart(2, "0");

  //   return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  // };
  
  const handleDateChange = (date) => {
    
    
    setSelectedDate(date);
  };
  

  // Calculate the delivery date based on deliveryType and pickup date
  useEffect(() => {
    let deliveryDate = null;
    if (deliveryType === '1') {
      // If deliveryType is 1, set delivery date after two days from the pickup date
      const nextDate = new Date(selectedDate);
      nextDate.setDate(nextDate.getDate() + 2);
      deliveryDate = nextDate;
    } else if (deliveryType === '2') {
      // If deliveryType is 2, set delivery date after one day from the pickup date
      const nextDate = new Date(selectedDate);
      nextDate.setDate(nextDate.getDate() + 1);
      deliveryDate = nextDate;
    }else if( deliveryType === '3'){
      const nextDate = new Date(selectedDate);
      nextDate.setDate(nextDate.getDate());
      deliveryDate = nextDate;
    }

    setSelectedDeliveryDate(deliveryDate);
    const formattedPickupDate = formatDateToString(selectedDate);
   
    console.log('pick',formattedPickupDate)
    dispatch(updatePickupDate(formattedPickupDate));
    
    
  }, [deliveryType, selectedDate]);
  useEffect(() => {
    const formattedDeliveryDate = formatDateToString(selectedDeliveryDate);
    dispatch(updateDeliveryDate(formattedDeliveryDate));
    console.log('drop',formattedDeliveryDate)
  },[selectedDate,selectedDeliveryDate,dispatch] );

  return (
    <>
      <div className={`${classes.datecontainer} row`} style={{ margin: '0', padding: '0' }}>
        <div className=' col col-xs-12'>
          <Form.Group>
            <Form.Label className={classes.label}>Pick-Up date:<img src={trolley} width={'30px'} alt="trolley" /></Form.Label><br />

            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className={`${classes.date} form-control`}
              ref={datepickerRef}
            />
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className={classes.calicon}
              onClick={handleIconClick}
            />
          </Form.Group>
        </div>
        <div className='col col-xs-12'>
          <Form.Group>
            <Form.Label className={classes.label}>Delivery date:<img src={delivery} width={'30px'} alt="delivery" /></Form.Label><br />

            <DatePicker
              selected={selectedDeliveryDate}
              
              dateFormat="dd/MM/yyyy"
              className={`${classes.date} form-control`}
              
              // Disable the delivery date picker for deliveryType 3
            />
            
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className={classes.calicon}
              onClick={handleIconClick}
            />
          </Form.Group>
        </div>
      </div>
    </>
  );
}

export default DatePick;
