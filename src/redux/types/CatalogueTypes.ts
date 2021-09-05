import { BaseRequestStatus } from './base';

export interface CatalogueState {
  products: Product[];
  getCatalogueStatus: BaseRequestStatus;
  addProductToCatalogueStatus: BaseRequestStatus;
  addProductsToCatalogueStatus: BaseRequestStatus;
  deleteProductFromCatalogueStatus: BaseRequestStatus;
  editProductFromCatalogueStatus: BaseRequestStatus;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  os: string;
  color: string;
  inches: number;
  price: number;
  image: string;
}

export interface ProductPostFields {
  shopId: string;
  name: string;
  brand: string;
  os: string;
  color: string;
  inches: string;
  price: string;
  image: string;
}

export interface ProductPutFields {
  id: string;
  shopId: string;
  name: string;
  brand: string;
  os: string;
  color: string;
  inches: number;
  price: number;
  image: string;
}
