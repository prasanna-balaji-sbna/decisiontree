import { AppActions } from "types";
import { UPDATE_USER, CREATE_USER, DELETE_USER, GET_USER, GET_LOV, GET_ROLES_LIST, GET_STATUS_LIST } from 'types/actions/User.action';

const INIT_STATE: {
  dataUpdate: any | null;
  dataCreate: any | null;
  dataGetUser: any | null,
  dataGetLov: any | null,
  dataDelete: any | null,
  dataRoleList: any | null,
  dataStatusList: any | null
} = {
  dataUpdate: null,
  dataCreate: null,
  dataGetUser: null,
  dataGetLov: null,
  dataDelete: null,
  dataRoleList: null,
  dataStatusList: null

}
const User = (state = INIT_STATE, action: AppActions) => {
  switch (action.type) {
    case UPDATE_USER: {
      return {
        ...state,
        dataUpdate: action.payload,
      };
    }
    case CREATE_USER: {
      return {
        ...state,
        dataCreate: action.payload,
      };
    }
    case GET_USER: {
      return {
        ...state,
        dataGetUser: action.payload,
      };
    }
    case GET_LOV: {
      return {
        ...state,
        dataGetLov: action.payload,
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        datadeleteuser: action.payload,
      };
    }
    case GET_ROLES_LIST: {
      return {
        ...state,
        dataRoleList: action.payload,
      };
    }
    case GET_STATUS_LIST: {
      return {
        ...state,
        dataStatusList: action.payload,
      };
    }
    default:
      return state;
  }
};
export default User;