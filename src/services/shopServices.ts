/* eslint-disable no-useless-catch */
import { AxiosResponse } from 'axios';
import { PostShopFields } from '../redux/types/ShopTypes';
import { axiosBaseInstance } from './config';

const postShopRegister = async (authFields: PostShopFields): Promise<any> => {
  try {
    const response: AxiosResponse<Record<string, never>> = await axiosBaseInstance({
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      url: '/shop/create',
      data: {
        companyId: authFields.companyId,
        name: authFields.name,
        location: authFields.location,
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const shopServices = {
  postShopRegister,
};

export default shopServices;
