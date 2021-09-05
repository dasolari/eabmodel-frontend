// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck projectActions properties generated at runtime
import { userActions } from '../slices/userSlice';
import userServices from '../../services/userServices';
import { buildInteractor, buildInteractorNoParams, buildInteractorDirectActionNoParams } from './base';

export const registerUserInteractor = buildInteractor(
  userActions.loadingRegisterUser,
  userActions.successRegisterUser,
  userActions.errorRegisterUser,
  userServices.postUserRegister,
);

export const loginUserInteractor = buildInteractor(
  userActions.loadingLoginUser,
  userActions.successLoginUser,
  userActions.errorLoginUser,
  userServices.postUserLogin,
);

export const logoutUserInteractor = buildInteractorNoParams(
  userActions.loadingLogoutUser,
  userActions.successLogoutUser,
  userActions.errorLogoutUser,
  null,
);

export const deleteUserInteractor = buildInteractor(
  userActions.loadingDeleteUser,
  userActions.successDeleteUser,
  userActions.errorDeleteUser,
  userServices.deleteUser,
);

export const reassignUserShopInteractor = buildInteractor(
  userActions.loadingReassignUserShop,
  userActions.successReassignUserShop,
  userActions.errorReassignUserShop,
  userServices.reassignUserShop,
);

export const resetRegisterUserInteractor = buildInteractorDirectActionNoParams(userActions.resetRegisterUser);

export const resetLoginUserInteractor = buildInteractorDirectActionNoParams(userActions.resetLoginUser);

export const resetLogoutUserInteractor = buildInteractorDirectActionNoParams(userActions.resetLogoutUser);

export const resetUserStatusInteractor = buildInteractorDirectActionNoParams(userActions.resetUserStatus);

export const resetUserInteractor = buildInteractorDirectActionNoParams(userActions.resetUser);

export const resetDeleteUserInteractor = buildInteractorDirectActionNoParams(userActions.resetDeleteUser);

export const resetReassignUserInteractor = buildInteractorDirectActionNoParams(userActions.resetReassignUserShop);
