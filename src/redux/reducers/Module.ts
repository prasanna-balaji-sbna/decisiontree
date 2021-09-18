import {  AppActions } from "types";
import { GETALL_MODULE,MODULE_ENABLE,CREATE_MODULE,UPDATE_MODULE, DELETE_MODULE } from "types/actions/Module.action";

const INIT_STATE: { 
     getallmoduledata: any ;
     moduleenabledata: any | null;
     createmoduledata: any | null;
     updatemoduledata: any | null;
     deletemoduledata: any | null;
     } = {
     getallmoduledata: null,
     moduleenabledata:null,
     createmoduledata: null,
     updatemoduledata: null,
     deletemoduledata: null,
};

const ModuleDetails = (state = INIT_STATE, action: AppActions) => {
  switch (action.type) {
    case GETALL_MODULE: {
      return {
        ...state,
        getallmoduledata: action.payload,
      };
    }
    case MODULE_ENABLE: {
        return {
          ...state,
          moduleenabledata: action.payload,
        };
      }
     
    case CREATE_MODULE: {
      return {
        ...state,
        createmoduledata: action.payload,
      };
    }

    case UPDATE_MODULE: {
      return {
        ...state,
        updatemoduledata: action.payload,
      };
    }
    case DELETE_MODULE: {
      return {
        ...state,
        deletemoduledata: action.payload,
      };
    }
default:
      return state;
  }
};
export default ModuleDetails ;
