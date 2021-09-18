export const GET_MODULE = 'GET_MODULE';
export const GET_CATEGORY = 'GET_CATEGORY';
export const CATEGORY_ENABLE = 'CATEGORY_ENABLE';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export interface Setgetmodule {
  type: typeof GET_MODULE;
  payload: any | null;
}
export interface Setgetcategory {
  type: typeof GET_CATEGORY;
  payload: any | null;
}
export interface Setcategoryenable {
  type: typeof CATEGORY_ENABLE;
  payload: any | null;
}

export interface Setcreatecategory {
  type: typeof CREATE_CATEGORY;
  payload: any | null;
}
export interface Setupdatecategory {
  type: typeof UPDATE_CATEGORY;
  payload: any | null;
}
export interface Setdeletecategory {
  type: typeof DELETE_CATEGORY;
  payload: any | null;
}

export type CategoryActions =
  | Setgetmodule
  | Setgetcategory
  | Setcategoryenable
  | Setcreatecategory
  | Setupdatecategory
  | Setdeletecategory