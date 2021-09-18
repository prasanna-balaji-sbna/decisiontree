import { AppActions } from "types";
import { GET_AllLIST,GET_LOV,CREATE_LOV,UPDATE_LOV,DELETE_LOV } from "types/actions/Lov.action";

const INIT_STATE: { 
  dataAllList: any | null;
    dataLov: any | null;
      dataCreate: any | null;
      dataUpdate: any | null;
      dataDelete: any | null;
     } = {
        dataAllList: [],
        dataLov: null,
        dataCreate: null,
        dataUpdate: null,
        dataDelete: null,
  };
  

const Lov = (state = INIT_STATE, action: AppActions) => {
  switch (action.type) {
    case GET_AllLIST : {
      return {
        ...state,
        dataAllList: action.payload,
      };
    }
    case GET_LOV: {
      return {
        ...state,
        dataLov: action.payload,
      };
    }
    case CREATE_LOV: {
      return {
        ...state,
        dataCreate: action.payload,
      };
    }
    case UPDATE_LOV: {
        return {
          ...state,
          dataUpdate: action.payload,
        };
      }
      case DELETE_LOV: {
        return {
          ...state,
          dataUpdate: action.payload,
        };
      }
     
      
    default:
      return state;
  }
};
export default Lov;