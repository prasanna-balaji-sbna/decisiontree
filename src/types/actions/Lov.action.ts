export const GET_AllLIST = 'GET_AllLIST';
export const GET_LOV = 'GET_LOV';
export const CREATE_LOV = 'CREATE_LOV';
export const UPDATE_LOV = 'UPDATE_LOV';
export const DELETE_LOV = 'DELETE_LOV';


export interface SetAllListActions {
  type: typeof GET_AllLIST;
  payload: any | null;
}
export interface SetGetLovActions {
  type: typeof GET_LOV;
  payload: any | null;
}
export interface SetCreateLovActions {
  type: typeof CREATE_LOV;
  payload: any | null;
}
export interface SetUpdateLovdActions {
    type: typeof UPDATE_LOV;
    payload: any | null;
  }
  export interface SetDeleteLovActions {
    type: typeof DELETE_LOV;
    payload: any | null;
  }
 

export type LovActions =
  | SetAllListActions
  | SetGetLovActions
  | SetCreateLovActions
  | SetUpdateLovdActions
  | SetDeleteLovActions
 