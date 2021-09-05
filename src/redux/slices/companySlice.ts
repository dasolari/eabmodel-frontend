import { CompanyState } from '../types/CompanyTypes';
import { createSlice } from '@reduxjs/toolkit';
import { Action, baseRequestStatusReducers } from './base';

const initialState: CompanyState = {
  id: '',
  name: '',
  email: '',
  shops: [],
  users: [],
  registerCompanyStatus: {
    loading: false,
    success: false,
    error: false,
  },
  loginCompanyStatus: {
    loading: false,
    success: false,
    error: false,
  },
  logoutCompanyStatus: {
    loading: false,
    success: false,
    error: false,
  },
  getCompanyUsersStatus: {
    loading: false,
    success: false,
    error: false,
  },
  getCompanyShopsStatus: {
    loading: false,
    success: false,
    error: false,
  },
};

const successRegisterCompany = (state: CompanyState, action: Action) => {
  return {
    ...state,
    ...action.payload,
    registerCompanyStatus: { loading: false, success: true, error: false },
  };
};

const successLoginCompany = (state: CompanyState, action: Action) => {
  return {
    ...state,
    ...action.payload,
    loginCompanyStatus: { loading: false, success: true, error: false },
  };
};

const successLogoutCompany = (state: CompanyState) => {
  return {
    ...state,
    ...initialState,
    logoutCompanyStatus: { loading: false, success: true, error: false },
  };
};

const successGetCompanyUsers = (state: CompanyState, action: Action) => {
  return {
    ...state,
    ...action.payload,
    getCompanyUsersStatus: { loading: false, success: true, error: false },
  };
};

const successGetCompanyShops = (state: CompanyState, action: Action) => {
  return {
    ...state,
    ...action.payload,
    getCompanyUsersStatus: { loading: false, success: true, error: false },
  };
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    ...baseRequestStatusReducers('registerCompany', initialState, null, successRegisterCompany),
    ...baseRequestStatusReducers('loginCompany', initialState, null, successLoginCompany),
    ...baseRequestStatusReducers('logoutCompany', initialState, null, successLogoutCompany),
    ...baseRequestStatusReducers('getCompanyUsers', initialState, null, successGetCompanyUsers),
    ...baseRequestStatusReducers('getCompanyShops', initialState, null, successGetCompanyShops),
    resetCompanyStatus: (state: CompanyState) => {
      return {
        ...state,
        loginCompanyStatus: initialState.loginCompanyStatus,
        logoutCompanyStatus: initialState.logoutCompanyStatus,
      };
    },
    resetCompany: (state: CompanyState) => {
      return {
        ...state,
        ...initialState,
      };
    },
    removeUserCompany: (state: CompanyState, action: Action) => {
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    },
    handleUserReassign: (state: CompanyState, action: Action) => {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.userId) {
            return { ...user, shopId: action.payload.shopId };
          }
          return user;
        }),
      };
    },
  },
});

export const companyReducer = companySlice.reducer;
export const companyActions = companySlice.actions;
