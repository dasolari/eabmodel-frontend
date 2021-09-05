import { ShopState } from '../types/ShopTypes';
import { createSlice } from '@reduxjs/toolkit';
import { Action, baseRequestStatusReducers } from './base';

const initialState: ShopState = {
  id: '',
  companyId: '',
  name: '',
  location: '',
  shops: [],
  addShopStatus: {
    loading: false,
    success: false,
    error: false,
  },
  removeShopStatus: {
    loading: false,
    success: false,
    error: false,
  },
  updateShopStatus: {
    loading: false,
    success: false,
    error: false,
  },
};

const successAddShop = (state: ShopState, action: Action) => {
  return {
    ...state,
    shops: [...state.shops, action.payload],
    addShopStatus: { loading: false, success: true, error: false },
  };
};

const successRemoveShop = (state: ShopState) => {
  return {
    ...state,
    removeShopStatus: { loading: false, success: true, error: false },
  };
};

const successUpdateShop = (state: ShopState, action: Action) => {
  return {
    ...state,
    ...action.payload,
    updateShopStatus: { loading: false, success: true, error: false },
  };
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    ...baseRequestStatusReducers('addShop', initialState, null, successAddShop),
    ...baseRequestStatusReducers('removeShop', initialState, null, successRemoveShop),
    ...baseRequestStatusReducers('updateShop', initialState, null, successUpdateShop),
    setShops: (state: ShopState, action: Action) => {
      return {
        ...state,
        shops: action.payload,
      };
    },
    setShop: (state: ShopState, action: Action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetShopStatus: (state: ShopState) => {
      return {
        ...state,
        addShopStatus: initialState.addShopStatus,
        removeShopStatus: initialState.removeShopStatus,
        updateShopStatus: initialState.updateShopStatus,
      };
    },
    resetShop: (state: ShopState) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const shopReducer = shopSlice.reducer;
export const shopActions = shopSlice.actions;
