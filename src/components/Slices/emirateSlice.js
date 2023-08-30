// emirateSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('emirateNumber')

const emirateSlice = createSlice({
  name: 'emirate',
  initialState, // Initial state for the emirateId
  reducers: {
    setEmirateId: (state, action) => {
      return action.payload; // Payload will be the emirateId value
    },
  },
});

export const { setEmirateId } = emirateSlice.actions;
export default emirateSlice.reducer;
