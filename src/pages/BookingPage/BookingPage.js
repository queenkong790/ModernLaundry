import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Card from "./Card";
import DatePick from "./Datepick";
import DeliveryTypes from "./DeliveryTypes";
import Tab from "./Tab";
import classes from './BookingPage.module.css';
import TotalFooter from "./TotalFooter";
import { getProducts } from '../../api';
import SearchButton from "../../components/SearchButton";
import { setEmirateId } from '../../components/Slices/emirateSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from 'react-toastify';


function BookingPage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [Data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Men');
  const [selectedDeliveryType, setSelectedDeliveryType] = useState('');
  const [FilteredData, setFilteredData] = useState([])
  const [openSearch, setOpenSearch] = useState(false)
  const [searchedItem, setSearchedItem] = useState({})
  const [selectedServices, setSelectedServices] = useState({});
  const [loading, setLoading] = useState(true)
  const customerData = useSelector(state => state.auth.customerData)
  const guestData=useSelector(state => state.guest.customerData)
  const emirateNumber=customerData.emirateNumber

  const totalQuanitity = useSelector((state) => state.cart.totalQuantity);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeliveryTypeChange = (deliveryType) => {
    setSelectedDeliveryType(deliveryType);
  };


  useEffect(() => {

    console.log("customer data:",customerData);
    console.log('guest Data',guestData)
    const fetchData = async () => {
      try {
        const response = await getProducts();
        const data = response.data;

        setData(data);
        setLoading(false)
      } catch (error) {
        // Handle the error
      }
    };

    fetchData();

  }, []);

  const filteredData = selectedCategory ? Data.filter(item => {
    const isCategoryMatch = item.item_cat1 === selectedCategory;

    const hasEmirateId = item.pricing.filter(pricing =>
      pricing.emirate_id === emirateNumber?.toString()

    );
    //console.log(hasEmirateId)
    return isCategoryMatch && hasEmirateId;
  }) : Data;


  const handleCategoryChange = (category) => {
    console.log(category)
    setSelectedCategory(category);
  };




  const showitem = (item) => {
    return (<div key={item.itemID} className="col-md-6" style={{ margin: '10px 0px 10px 0px', padding: '0' }}>
      <Card ide={item.itemID} img1={item.image_url} header={item.item_name} price={item.pricing} category={item.item_cat1} emirateNumber={emirateNumber} deliveryType={selectedDeliveryType} />
    </div>)

  }

  return (
<>
      <ToastContainer
        position="top-right"
        className="custom-toast-container"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* {loading && <div className="  d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div class="spinner-border text-secondary" role="status">
          <span class="sr-only">Loading...</span>
        </div></div>}
      {!loading && */}
       <>
        <div className={classes.search}>
          <SearchButton Data={filteredData} setSearchedItem={setSearchedItem} setOpenSearch={setOpenSearch} />
        </div>
        
        <div>
          <div className={classes.cart}>


            <Link to={'/Order-now'}><FontAwesomeIcon icon={faCartShopping} style={{ color: 'white' }} /></Link>
            {totalQuanitity !== 0 ? <div className={classes.cartcount}>{totalQuanitity}</div> : <></>}
          </div>
        </div>
        <div className={`${classes.body} container`}>



          <div className="d-flex row" style={{ marginTop: '0px', paddingTop: '0px', marginBottom: '0' }}>
            <div className="col-md-6">
              <DeliveryTypes onDeliveryTypeChange={handleDeliveryTypeChange} />
            </div>
            <div className="col-md-6">
              <DatePick deliveryType={selectedDeliveryType} />
            </div>
          </div>
          <div className="row" style={{ marginTop: '0px', paddingTop: '0px', marginBottom: '0' }}>
            {/* Pass the handleCategoryChange function as a prop to Tab component */}
            <Tab onCategoryChange={handleCategoryChange} loading={loading} />
          </div>
          <div className="row" style={{ marginTop: '0px', paddingTop: '0px', marginBottom: '0' }}>


            {!openSearch ? (filteredData.length > 0 ? (

              filteredData.map((item) => (
                <div key={item.itemID} className="col-md-6" style={{ margin: '10px 0px 10px 0px', padding: '0' }}>
                  <Card ide={item.itemID} img1={item.image_url} header={item.item_name} price={item.pricing} category={item.item_cat1} emirateNumber={emirateNumber} deliveryType={selectedDeliveryType} />
                </div>
              ))
            ) : (
              <p className={classes.para}>Loading</p>
            )) : showitem(searchedItem)
            }
          </div>
        </div>
        <TotalFooter Data={filteredData} /></>
        
    </>
  );
}

export default BookingPage;
