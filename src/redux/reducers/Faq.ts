import {  AppActions } from "types";
import { GET_FAQ,CREATE_FAQ,UPDATE_FAQ } from "types/actions/Faq.action";

const INIT_STATE: { 
     getFaqdata: any;
     createFaqdata: any | null;
     updateFaqdata: any | null;
     } = {
        getFaqdata: null,
        createFaqdata: null,
        updateFaqdata: null,
};

const ListDetails = (state = INIT_STATE, action: AppActions) => {
  switch (action.type) {
    case GET_FAQ: {
      return {
        ...state,
        getFaqdata: action.payload,
      };
    }
    case CREATE_FAQ: {
      return {
        ...state,
        createFaqdata: action.payload,
      };
    }
    case UPDATE_FAQ: {
      return {
        ...state,
        updateFaqdata: action.payload,
      };
    }
   
default:
      return state;
  }
};
export default ListDetails ;
