import { BaseRequestStatus } from './base';
import { UserState } from './UserTypes';

export interface CompanyState {
  id: string;
  name: string;
  email: string;
  shops: ShopBackendState[];
  users: UserState[];
  registerCompanyStatus: BaseRequestStatus;
  loginCompanyStatus: BaseRequestStatus;
  logoutCompanyStatus: BaseRequestStatus;
  getCompanyUsersStatus: BaseRequestStatus;
  getCompanyShopsStatus: BaseRequestStatus;
}

export interface PostCompanyFields {
  name: string;
  password: string;
}

export interface RegisterCompanyFields {
  name: string;
  email: string;
  password: string;
}

export interface ShopBackendState {
  id: string;
  companyId: string;
  name: string;
  location: string;
}

export interface CompanyBackendState {
  id: string;
  name: string;
  email: string;
  shops: ShopBackendState[];
}
