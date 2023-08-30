import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './components/Slices/store';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import {setDecryptedCustomerData} from './components/Slices/authSlice'
import { setDecryptedGuestData } from './components/Slices/guestSlice';
// index.js
const encryptedData = Cookies.get('encryptedCustomerData');
const guest=Cookies.get('guestLogin')

if (encryptedData) {
  try {
    const Key='18'
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, Key);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const customerData = JSON.parse(decryptedData);
    
    store.dispatch(setDecryptedCustomerData(customerData));
  } catch (error) {
    console.error('Error decrypting customer data:', error);
  }
}
if(guest){
  const Key='18'
    const decryptedBytes = CryptoJS.AES.decrypt(guest, Key);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const customerData = JSON.parse(decryptedData);
    
    store.dispatch(setDecryptedGuestData(customerData));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
