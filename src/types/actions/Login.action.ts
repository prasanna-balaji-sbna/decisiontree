
export const LOGIN = 'LOGIN';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const VERIFY_FORGOT_PASSWORD = 'VERIFY_FORGOT_PASSWORD';
export const GET_ROLE_FIRST_USER = 'GET_ROLE_FIRST_USER';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export interface login {
  type: typeof LOGIN;
  payload: any | null;
}
export interface resetPassword {
  type: typeof RESET_PASSWORD;
  payload: any | null
}
export interface forgotPassword {
  type: typeof FORGOT_PASSWORD;
  payload: any | null
}
export interface verifyforgotPassword {
  type: typeof VERIFY_FORGOT_PASSWORD;
  payload: any | null
}
export interface getUserRolesFirstUser {
  type: typeof GET_ROLE_FIRST_USER;
  payload: any | null
}
export interface getloginError {
  type: typeof LOGIN_ERROR;
  payload: any | null
}
export type LoginActions =

  | login
  | resetPassword
  | forgotPassword
  | verifyforgotPassword
  | getUserRolesFirstUser
  | getloginError;
