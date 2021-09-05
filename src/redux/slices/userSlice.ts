import { UserState, Session } from '../types/UserTypes';
import { createSlice } from '@reduxjs/toolkit';
import { Action, baseRequestStatusReducers } from './base';

const initialState: UserState = {
  username: 'defaultUser',
  email: '',
  id: '',
  companyId: '',
  shopId: '',
  sessionType: Session.ANONYMOUS,
  loginUserStatus: {
    loading: false,
    success: false,
    error: false,
  },
  logoutUserStatus: {
    loading: false,
    success: false,
    error: false,
  },
  registerUserStatus: {
    loading: false,
    success: false,
    error: false,
  },
  deleteUserStatus: {
    loading: false,
    success: false,
    error: false,
  },
  reassignUserShopStatus: {
    loading: false,
    success: false,
    error: false,
  },
};

const successRegisterUser = (state: UserState) => {
  return {
    ...state,
    registerUserStatus: {
      loading: false,
      success: true,
      error: false,
    },
  };
};

const successLoginUser = (state: UserState, action: Action) => {
  return {
    ...state,
    ...action.payload,
    loginUserStatus: {
      loading: false,
      success: true,
      error: false,
    },
    logoutUserStatus: { loading: false, success: false, error: false },
  };
};

const successLogoutUser = (state: UserState) => {
  return {
    ...state,
    ...initialState,
    logoutUserStatus: { loading: false, success: true, error: false },
  };
};

const successDeleteUser = (state: UserState) => {
  return {
    ...state,
    deleteUserStatus: { loading: false, success: true, error: false },
  };
};

const successReassignUserShop = (state: UserState, action: Action) => {
  return {
    ...state,
    ...action.payload,
    reassignUserShopStatus: { loading: false, success: true, error: false },
  };
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    ...baseRequestStatusReducers('registerUser', initialState, null, successRegisterUser),
    ...baseRequestStatusReducers('loginUser', initialState, null, successLoginUser),
    ...baseRequestStatusReducers('logoutUser', initialState, null, successLogoutUser),
    ...baseRequestStatusReducers('deleteUser', initialState, null, successDeleteUser),
    ...baseRequestStatusReducers('reassignUserShop', initialState, null, successReassignUserShop),
    resetUserStatus: (state: UserState) => {
      return {
        ...state,
        loginUserStatus: initialState.loginUserStatus,
        logoutUserStatus: initialState.logoutUserStatus,
      };
    },
    resetUser: (state: UserState) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
