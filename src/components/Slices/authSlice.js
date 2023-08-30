// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const secretKey='18'
const initialState = {
  
  customerData: {},
  loggedIn: Cookies.get('encryptedCustomerData') !== undefined
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      
     const encryptedData = Cookies.get('encryptedCustomerData');
      if (encryptedData) {
        const decryptedBytes = CryptoJS.AES.decrypt(
          encryptedData,
          secretKey
        );
        const decryptedData = JSON.parse(
          decryptedBytes.toString(CryptoJS.enc.Utf8)
        );

        
        state.customerData = decryptedData;
        console.log(state.customerData)
        state.loggedIn = true;
        }
      
    },
    logout: (state) => {
      state.loggedIn = false;
      state.customerData ={};
      Cookies.remove('encryptedCustomerData');
    },
    setDecryptedCustomerData: (state, action) => {
      state.customerData = action.payload;
    },
  },
});

export const { login, logout ,setDecryptedCustomerData} = authSlice.actions;
export default authSlice.reducer;
