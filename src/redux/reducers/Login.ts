import {AppActions} from '../../types';
import {LOGIN,RESET_PASSWORD,FORGOT_PASSWORD, LOGIN_ERROR,GET_ROLE_FIRST_USER, VERIFY_FORGOT_PASSWORD} from '../../types/actions/Login.action';

const INIT_STATE: {
  dataLogin: any | null;
  dataReset: any | null;
  dataForgotPass: any | null,
  dataUserRoleFirstLog : any | null,
  dataLoginError: any | null,
  dataVerifyForgotPass : boolean | null
} = {
  dataLogin: null,
  dataReset: null,
  dataForgotPass: null,
  dataUserRoleFirstLog :  null,
  dataLoginError:  null,
  dataVerifyForgotPass:false
  
}
const Login = (state = INIT_STATE, action: AppActions) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        dataLogin: action.payload,
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        dataReset: action.payload,
      };
    }
    case FORGOT_PASSWORD: {
      return {
        ...state,
        dataForgotPass: action.payload,
      };
    }
    case VERIFY_FORGOT_PASSWORD:{
      return{
        ...state,
        dataVerifyForgotPass : action.payload
      }
    } 
     case LOGIN_ERROR: {
      return {
        ...state,
        dataLoginError: action.payload,
      };
    }
    case GET_ROLE_FIRST_USER : {
      return{
        ...state,
        dataUserRoleFirstLog:action.payload
        
      } ;    
    }
    default:
      return state;
  }
};
export default Login;
