export const GET_LIST= 'GET_LIST';
export const CREATE_LIST= 'CREATE_LIST';
export const UPDATE_LIST= 'UPDATE_LIST';
export const DELETE_LIST = 'DELETE_LIST';

export interface Setgetlist {
  type: typeof GET_LIST;
  payload: any | null;
}
export interface Setcreatelist {
  type: typeof CREATE_LIST;
  payload: any | null;
}
export interface Setupdatelist {
  type: typeof UPDATE_LIST;
  payload: any | null;
}
export interface Setdeletelist {
  type: typeof DELETE_LIST;
  payload: any | null;
}

export type ListActions =
  | Setgetlist
  | Setcreatelist
  | Setupdatelist
  | Setdeletelist 