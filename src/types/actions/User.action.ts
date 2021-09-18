export const GET_USER = 'GET_USER';
export const GET_LOV = 'GET_LOV';
export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_ROLES_LIST = 'GET_ROLES_LIST';
export const GET_STATUS_LIST = 'GET_STATUS_LIST';
export interface Setgetuser {
    type: typeof GET_USER,
    payload: any | null
}
export interface Setgetlov {
    type: typeof GET_LOV,
    payload: any | null
}
interface Setcreateuser {
    type: typeof CREATE_USER,
    payload: any | null
}
export interface Setupdateuser {
    type: typeof UPDATE_USER,
    payload: any | null
}
export interface Setdeleteuser {
    type: typeof DELETE_USER,
    payload: any | null
}
export interface getRolesList {
    type: typeof GET_ROLES_LIST,
    payload: any | null
}
export interface getAllStatusList {
    type: typeof GET_STATUS_LIST,
    payload: any | null
}
export type UserActions =
    | Setgetuser
    | Setgetlov
    | Setcreateuser
    | Setupdateuser
    | Setdeleteuser
    | getRolesList
    | getAllStatusList;

