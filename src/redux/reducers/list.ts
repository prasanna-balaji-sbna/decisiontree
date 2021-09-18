import {  AppActions } from "types";
import { GET_LIST,CREATE_LIST,UPDATE_LIST, DELETE_LIST } from "types/actions/list.action";

const INIT_STATE: { 
     getlistdata: any;
     createlistdata: any | null;
     updatelistdata: any | null;
     deletelistdata: any | null;
     } = {
     getlistdata: null,
     createlistdata: null,
     updatelistdata: null,
     deletelistdata: null,
};

const ListDetails = (state = INIT_STATE, action: AppActions) => {
  switch (action.type) {
    case GET_LIST: {
      return {
        ...state,
        getlistdata: action.payload,
      };
    }
    case CREATE_LIST: {
      return {
        ...state,
        createlistdata: action.payload,
      };
    }
    case UPDATE_LIST: {
      return {
        ...state,
        updatelistdata: action.payload,
      };
    }
    case DELETE_LIST: {
      return {
        ...state,
        deletelistdata: action.payload,
      };
    }
default:
      return state;
  }
};
export default ListDetails ;
