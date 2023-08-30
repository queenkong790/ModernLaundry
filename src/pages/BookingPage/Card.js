
import { useState,useEffect } from 'react';
import classes from './Card.module.css'
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare,faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import test from '../../assets/test.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart,removeItemFromCart } from '../../components/Slices/cartSlice';

function Card({ide,img1, header, price,emirateNumber, deliveryType}){
    
  const [currentPrice, setCurrentPrice] = useState(price);
   
  /*  const prevQuantity=useSelector(state =>
      state.cart.items.find(item => item.ide === ide)?.quantity || 0
    );
    const prevService=useSelector(state =>
      state.cart.items.find(item => item.ide === ide)?.selectedService || 0
    );
    const prevDelivery=useSelector(state =>
      state.cart.items.find(item => item.ide === ide)?.Delivery || 0
    );*/
    const { quantity: prevQuantity, selectedService: prevService } = useSelector(state =>
      state.cart.items.find(item => item.ide === ide) || { quantity: 0, selectedService: 'Dryclean' }
    );
    
    const [quantity, setQuantity] = useState(prevQuantity)
   
    const [selectedService, setSelectedService] = useState(prevService);
    const [Delivery,setdelivery]=useState('Folded')
    const [foldedChecked, setFoldedChecked] = useState(true);
  //const [hangerChecked, setHangerChecked] = useState(false);
  const [defaultValuesSet, setDefaultValuesSet] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    Datatosend();
  }, [quantity]);

  // Call Datatosend whenever selectedService or foldedChecked changes
  useEffect(() => {
    Datatosend();
  }, [selectedService, foldedChecked]);

  // Call Datatosend whenever the component is first rendered or ide changes
  useEffect(() => {
    Datatosend();
  }, [ide]);
  useEffect(() => {
    Datatosend();
  }, [deliveryType]);

  const handleCheckboxChange = (event) => {
    const val = event.target.value;
    //setdelivery(val)
    if (val === '1') {
      setFoldedChecked(true);
      //setHangerChecked(false)
      setdelivery('Folded')
    } else if (val === '2') {
      setFoldedChecked(false);
      //setFoldedChecked(false)
      setdelivery('Hanger')
    }
    
    //Datatosend();
  };
  const handleQuantityIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1); // Increment the local quantity state
    //Datatosend()
    
      
  };

  const handleQuantityDecrement = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1); // Decrement the local quantity state
      //Datatosend()
    }
  };
   
      
    
      const handleRadioChange = (event) => {
        const selectedValue = event.target.value;
        // Perform the action based on the selected value
        setSelectedService(selectedValue);
        //onQuantityChange(ide,quantity,selectedService)
      };
      let id = emirateNumber?.toString()
     
      const selectedPrices = (currentPrice?.filter(
        obj => obj.service === selectedService && deliveryType == obj.deliveryType && quantity > 0
      ).map(obj => obj.price));
      
      
       if(selectedPrices.length == 0 )
       {
        selectedPrices[0] = 0
       }
       const finalprice=((parseFloat(selectedPrices[0]).toFixed(2))*parseFloat(quantity)).toFixed(2)
       //console.log(finalprice)
       const priceForEach=(parseFloat(selectedPrices[0]))
      // console.log(priceForEach)
       
       
       
  
/*
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
      onQuantityChange(ide, newQuantity, selectedService);
    }
  };*/
  const Datatosend=()=>{
    const newQuantity = parseInt(quantity, 10);
    if (newQuantity!==0){
      setQuantity(newQuantity)
      dispatch(addItemToCart({ ide,header, selectedService,deliveryType, finalprice, quantity,Delivery,priceForEach }));
    console.log('Data to send:')
    console.log('id:',ide,'header:', header, 'serviceType;',selectedService, 'price;',finalprice,'quanitity:', quantity,'Delivery:',Delivery,'DeliveryType',deliveryType);
    }else if(newQuantity===0){
      dispatch(removeItemFromCart({ ide }));
    }
    
  }
  
    return (
        <div className='container'>
        <div className={` row`} style={{margin:'0',padding:'0'}}>

            <div className={`${classes.card} col-md-12`}>

                <h4 className={classes.header}>{header} </h4>
                <div className={`${classes.body} row`} style={{margin:'0',padding:'5px'}}>
                    <div className={` ${classes.Productimg} col text-center`}>
                    <img height={80} src={img1}></img>
                    <div className={classes.responsive}>
                                <div className={`${classes.check} text-center`}>
                                <label><FontAwesomeIcon icon={faPlusSquare} onClick={handleQuantityIncrement}/>{quantity} <FontAwesomeIcon icon={faMinusSquare} onClick={handleQuantityDecrement}/></label><br/>
                             
                            
                                </div>
                    </div>
                    </div>
                        
                    <div className={` ${classes.qty} col`}>
                        
                        <div className= {`${classes.check} text-center`}>
                            <label style={{fontSize:'30px'}}>{quantity}</label><br/>
                            <label><FontAwesomeIcon icon={faPlusSquare} onClick={handleQuantityIncrement}> </FontAwesomeIcon> &nbsp;<FontAwesomeIcon icon={faMinusSquare} onClick={handleQuantityDecrement}></FontAwesomeIcon ></label>
                            
                        </div>
                        <div className={`${classes.sdt} `}>Quantity</div>
                    </div>
                    <div className={` ${classes.qty} col`}>
                
                        <div className={classes.check}>
                            <label className={classes.label}>
                                <input type='radio' name={`group1-${ide}`}  value="Dryclean" onChange={handleRadioChange} checked={selectedService === 'Dryclean' && quantity>0}/>
                                Dry clean
                            </label>
                            <label className={classes.label}>
                                <input type='radio' name={`group1-${ide}`}  value="Laundry" onChange={handleRadioChange} checked={selectedService === 'Laundry' && quantity>0}/>
                                Laundry
                            </label>
                            <label className={classes.label}>
                                <input type='radio' name={`group1-${ide}`}  value="Press" onChange={handleRadioChange} checked={selectedService === 'Press' && quantity>0}/>
                                Press
                            </label>
                        </div>
                        <div className={`${classes.sdt} `}>Service</div>
                    </div>
                    <div className={`  ${classes.qty} col`}>
                    
                        <div className={classes.check}> 
                        <label className={classes.label}>
                            <input type='radio' value = '1' name={`group2-${ide}`} onChange={handleCheckboxChange} checked={foldedChecked && quantity>0} />
                            Folded
                        </label>
                        <label className={classes.label}>
                            <input type='radio' value = '2' name={`group2-${ide}`} onChange={handleCheckboxChange} />
                            Hanger
                        </label>
                        
                        </div>
                        <div className={`${classes.sdt} `}>Delivery</div>
                    </div>
                    <div className={`  ${classes.qty} col`}>
                    
                    <div className={`${classes.check} text-center`}>
                        <label>AED {((parseFloat(selectedPrices[0]).toFixed(2))*parseFloat(quantity)).toFixed(2)}</label>
                    </div>
                    <div className={`${classes.sdt} `}>Total</div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
        </div>
    )
}

export  default Card ;