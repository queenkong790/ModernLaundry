import React, { useState,useRef,useEffect } from 'react';
import classes from './SearchButton.module.css';
import Card from '../pages/BookingPage/Card';

function filterByValue(Data, searchVal) {
  return Data.filter(item => item.item_name && item.item_name.toLowerCase().includes(searchVal.toLowerCase()));
}
const SearchButton = ({Data,setSearchedItem,setOpenSearch}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  
  const handleSearchInputChange = (event) => {
    const searchVal = event.target.value.trim();
    setSearchValue(searchVal);
    console.log(searchVal)
    if (searchVal === '') {
      
      setFilteredData([]);
    } else {
      const filteredData = filterByValue(Data, searchVal);
      setFilteredData(filteredData);
    }
    /*const filteredData = filterByValue(Data, searchVal);
    setFilteredData(filteredData);*/
    
  };
  
   const listClick=(item)=>{
    
   
   setFilteredData([])
   setSearchedItem(item)
   setOpenSearch(true)
   }
  

  return (
    <>
    <section className={`${classes.body} row`}>
      <div>
        <form action="" className='col'>
            <input type="search" placeholder="Search..." onChange={handleSearchInputChange}/>
            
        </form>
        </div>
        <ul >

           {filteredData.length > 0 ? (
        filteredData.map((item) => (
            <li onClick={()=>listClick(item)} className={classes.item} key={item.item_ID}>{item.item_name}</li>
        ))
      ) : (
        <span></span>
      )}
        </ul>
    </section>
    
    </>
  );
};

export default SearchButton;
