import React from "react";
import { useState } from "react";
import axios from "axios";


const CheckApi = () => {
  const [url, setUrl] = useState('https://jogettestdx8.ghobash.com:8443/jw/api/list/list_customersAPI');
  const [key, setKey] = useState('dbd603e47c4543d1ab88983e637d100d');
  const [id, setId] = useState('API-f54eb871-4796-4bf5-9d28-1ccdee50baf7');
  const [Data,changeData]=useState([])

  async function buttonHandler() {
    console.log('fetching...')
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/js",
        api_key: key,
        api_id: id,
      },
    };


    try {
      const  data = await axios.get(url, (id || key) && config);
      //console.log({ data });
      changeData({data});
      console.log(Data)
      
    } catch (error) {
      console.error(error);
    }
  }

  
};

export default CheckApi;