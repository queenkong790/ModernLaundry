// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const initialState = {
  loggedIn: Cookies.get('guestLogin')!==undefined,
  customerData:{}
};

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    guestlogin: (state) => {
      const encryptedData = Cookies.get('guestLogin');
      if (encryptedData) {
        const Key='18'
        const decryptedBytes = CryptoJS.AES.decrypt(
          encryptedData,
          Key
        );
        const decryptedData = JSON.parse(
          decryptedBytes.toString(CryptoJS.enc.Utf8)
        );

        
        state.customerData = decryptedData;
      state.loggedIn = true;
      console.log(state.customerData)
    }
  },
    guestlogout: (state) => {
      state.loggedIn = false;
      localStorage.removeItem('guestLogin')
      state.customerData ={};
      Cookies.remove('guestLogin')
      //localStorage.removeItem('email')
      //localStorage.removeItem('emirate')
    },
    setDecryptedGuestData: (state, action) => {
      state.customerData = action.payload;
    }
  },
});

export const { guestlogin, guestlogout,setDecryptedGuestData } = guestSlice.actions;
export default guestSlice.reducer;
