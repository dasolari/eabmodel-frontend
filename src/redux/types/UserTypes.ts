import { BaseRequestStatus } from './base';

export interface UserState {
  id: string;
  username: string;
  email: string;
  companyId: string;
  shopId: string;
  sessionType: Session;
  loginUserStatus: BaseRequestStatus;
  logoutUserStatus: BaseRequestStatus;
  registerUserStatus: BaseRequestStatus;
  deleteUserStatus: BaseRequestStatus;
  reassignUserShopStatus: BaseRequestStatus;
}

export interface PostUserFields {
  username: string;
  email: string;
  password: string;
  shopId: string;
  companyId: string;
}

export interface ReassignUserFields {
  userId: string;
  shopId: string;
}

export interface UserAuthFields {
  email: string;
  password: string;
}

export enum Session {
  ANONYMOUS = 'ANONYMOUS',
  EMPLOYEE = 'EMPLOYEE',
  ADMINISTRATOR = 'ADMINISTRATOR',
}
