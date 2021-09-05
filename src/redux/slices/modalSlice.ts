import { createSlice } from '@reduxjs/toolkit';
import { PopUpState } from '../types/ModalTypes';

const initialState: PopUpState = {
  open: false,
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showLogIn: (state: PopUpState) => {
      return {
        ...state,
        open: true,
      };
    },
    closeLogIn: (state: PopUpState) => {
      return {
        ...state,
        open: false,
      };
    },
  },
});

export const modalReducer = modal.reducer;
export const modalActions = modal.actions;
