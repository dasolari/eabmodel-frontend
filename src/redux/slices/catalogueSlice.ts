import { CatalogueState } from '../types/CatalogueTypes';
import { createSlice } from '@reduxjs/toolkit';
import { Action, baseRequestStatusReducers } from './base';

const initialState: CatalogueState = {
  products: [],
  getCatalogueStatus: {
    loading: false,
    success: false,
    error: false,
  },
  addProductToCatalogueStatus: {
    loading: false,
    success: false,
    error: false,
  },
  addProductsToCatalogueStatus: {
    loading: false,
    success: false,
    error: false,
  },
  deleteProductFromCatalogueStatus: {
    loading: false,
    success: false,
    error: false,
  },
  editProductFromCatalogueStatus: {
    loading: false,
    success: false,
    error: false,
  },
};

const successGetCatalogue = (state: CatalogueState, action: Action) => {
  return {
    ...state,
    products: [...action?.payload],
    getCatalogueStatus: { loading: false, success: true, error: false },
  };
};

const successAddProductToCatalogue = (state: CatalogueState, action: Action) => {
  return {
    ...state,
    products: [...state.products, action.payload],
    addProductToCatalogueStatus: {
      loading: false,
      success: true,
      error: false,
    },
  };
};

const successAddProductsToCatalogue = (state: CatalogueState) => {
  return {
    ...state,
    addProductsToCatalogueStatus: {
      loading: false,
      success: true,
      error: false,
    },
  };
};

const successDeleteProductFromCatalogue = (state: CatalogueState, action: Action) => {
  const newArray = state.products.filter((product) => product.id !== action?.payload?.id);
  return {
    ...state,
    products: newArray,
    deleteProductFromCatalogueStatus: {
      loading: false,
      success: true,
      error: false,
    },
  };
};

const successEditProductFromCatalogue = (state: CatalogueState, action: Action) => {
  const newArray = state.products.filter((product) => product.id !== action?.payload?.id);
  return {
    ...state,
    products: newArray,
    editProductFromCatalogueStatus: {
      loading: false,
      success: true,
      error: false,
    },
  };
};

const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState,
  reducers: {
    ...baseRequestStatusReducers('getCatalogue', initialState, null, successGetCatalogue),
    ...baseRequestStatusReducers('addProductToCatalogue', initialState, null, successAddProductToCatalogue),
    ...baseRequestStatusReducers('addProductsToCatalogue', initialState, null, successAddProductsToCatalogue),
    ...baseRequestStatusReducers('deleteProductFromCatalogue', initialState, null, successDeleteProductFromCatalogue),
    ...baseRequestStatusReducers('editProductFromCatalogue', initialState, null, successEditProductFromCatalogue),
    resetCatalogue: (state: CatalogueState) => {
      return {
        ...state,
        ...initialState,
        // ...state.products,
      };
    },
  },
});

export const catalogueReducer = catalogueSlice.reducer;
export const catalogueActions = catalogueSlice.actions;
