// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const calculateTotalAmount = (cart) => {
  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.finalprice) * item.quantity, 0);
  return totalPrice.toFixed(2);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: "0.00",
    pickupDate:'pick',
    deliveryDate:'drop'
  },
  reducers: {
    addItemToCart: (state, action) => {
      const { ide, header, selectedService, deliveryType,finalprice, quantity,Delivery,priceForEach } = action.payload;
      const existingItem = state.items.find((item) => item.ide === ide);

      if (existingItem) {
        // If the item already exists in the cart, update its quantity, delivery type, and selected price
        existingItem.quantity = quantity;
        existingItem.selectedService = selectedService;
        existingItem.finalprice = finalprice;
        existingItem.deliveryType = deliveryType;
        existingItem.Delivery=Delivery;
        existingItem.priceForEach=priceForEach;

      } else {
        // If the item is not in the cart, add it as a new item
        state.items.push({ ide, header, selectedService,deliveryType, finalprice, quantity,Delivery });
      }
      state.items.forEach((item) => {
        item.deliveryType = deliveryType;
      });
      //state.totalAmount = calculateTotalAmount(state);
      
    },
    updateTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
      console.log(state.totalPrice)
    },

    updateTotalQuantity: (state, action) => {
      state.totalQuantity = action.payload;
    },
    updatePickupDate: (state, action) => {
      state.pickupDate = action.payload;
    },
    updateDeliveryDate: (state, action) => {
      state.deliveryDate = action.payload;
    },
    removeItemFromCart: (state, action) => {
      const { ide } = action.payload;
      //return state.filter((item) => item.ide !== ide);
      state.items = state.items.filter((item) => item.ide !== ide);
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = calculateTotalAmount(state.items);
    },
    clearCartItems: (state) => {
      state.items = []; // Clear the items array
      state.totalQuantity = 0;
      state.totalPrice = "0.00";
      state.pickupDate= 'pick';
      state.deliveryDate= 'drop';
    },
    
  },
});

export const { addItemToCart, removeItemFromCart,updateTotalPrice,updateTotalQuantity ,updatePickupDate,updateDeliveryDate,clearCartItems} = cartSlice.actions;
export default cartSlice.reducer;
