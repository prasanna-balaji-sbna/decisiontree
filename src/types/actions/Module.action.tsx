export const GETALL_MODULE= 'GETALL_MODULE';
export const MODULE_ENABLE= 'MODULE_ENABLE';
export const CREATE_MODULE= 'CREATE_MODULE';
export const UPDATE_MODULE= 'UPDATE_MODULE';
export const DELETE_MODULE = 'DELETE_MODULE';

export interface Setgetallmodule{
  type: typeof GETALL_MODULE;
  payload: any | null;
}
export interface Setmoduleenable{
    type: typeof MODULE_ENABLE;
    payload: any | null;
  }
export interface Setcreatemodule {
  type: typeof CREATE_MODULE;
  payload: any | null;
}
export interface Setupdatemodule {
  type: typeof UPDATE_MODULE;
  payload: any | null;
}
export interface Setdeletemodule{
  type: typeof DELETE_MODULE;
  payload: any | null;
}

export type moduleActions =
  | Setgetallmodule
  | Setmoduleenable
  | Setcreatemodule
  | Setupdatemodule
  | Setdeletemodule