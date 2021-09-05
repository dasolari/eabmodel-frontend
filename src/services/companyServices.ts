/* eslint-disable no-useless-catch */
import { AxiosResponse } from 'axios';
import { PostCompanyFields, RegisterCompanyFields, CompanyBackendState } from '../redux/types/CompanyTypes';
import { axiosBaseInstance } from './config';

const postCompanyLogin = async (authFields: PostCompanyFields): Promise<any> => {
  try {
    const response: AxiosResponse<CompanyBackendState> = await axiosBaseInstance({
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      url: '/company/login',
      data: {
        name: authFields.name,
        password: authFields.password,
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const postCompanyRegister = async (authFields: RegisterCompanyFields): Promise<any> => {
  try {
    const response: AxiosResponse<CompanyBackendState> = await axiosBaseInstance({
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      url: '/company/create',
      data: {
        name: authFields.name,
        email: authFields.email,
        password: authFields.password,
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const getCompanyUsers = async (companyId: string): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'get',
    url: `/company/${companyId}/users`,
  })
    .then((response: AxiosResponse<CompanyBackendState>) => {
      return response?.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

const getCompanyShops = async (companyId: string): Promise<any> => {
  return await axiosBaseInstance({
    headers: { 'Content-Type': 'application/json' },
    method: 'get',
    url: `/company/${companyId}/shops`,
  })
    .then((response: AxiosResponse<CompanyBackendState>) => {
      return response?.data;
    })
    .catch((error: any) => {
      throw error;
    });
};

const companyServices = {
  postCompanyLogin,
  postCompanyRegister,
  getCompanyUsers,
  getCompanyShops,
};

export default companyServices;
