// store.js
import { configureStore } from '@reduxjs/toolkit';
import emirateReducer from './emirateSlice';
import authreducer from './authSlice'
import cartReducer from './cartSlice'
import guestReducer from './guestSlice';

const store = configureStore({
  reducer: {
    emirate: emirateReducer,
    auth:authreducer,
    cart: cartReducer,
    guest: guestReducer
    // Add other reducers if needed
  },
});

export default store;
