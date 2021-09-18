import { AppActions } from "types";
import { GET_MODULE, GET_CATEGORY, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, CATEGORY_ENABLE } from "types/actions/Category.action";

const INIT_STATE: {
  getmoduledata: any;
  getcatagorydata: any | null;
  createcategorydata: any | null;
  updatecategorydata: any | null;
  deletecategorydata: any | null;
  categoryenabledata: any | null;
} = {
  getmoduledata: null,
  getcatagorydata: null,
  createcategorydata: null,
  updatecategorydata: null,
  deletecategorydata: null,
  categoryenabledata: null
};

const CategoryDetails = (state = INIT_STATE, action: AppActions) => {
  switch (action.type) {
    case GET_MODULE: {
      return {
        ...state,
        getmoduledata: action.payload,
      };
    }
    case GET_CATEGORY: {
      return {
        ...state,
        getcatagorydata: action.payload,
      };
    }
    case CATEGORY_ENABLE: {
      return {
        ...state,
        categoryenabledata: action.payload,
      };
    }

    case CREATE_CATEGORY: {
      return {
        ...state,
        createcatagorydata: action.payload,
      };
    }

    case UPDATE_CATEGORY: {
      return {
        ...state,
        updatecategorydata: action.payload,
      };
    }
    case DELETE_CATEGORY: {
      return {
        ...state,
        deletecatagorydata: action.payload,
      };
    }
    default:
      return state;
  }
};
export default CategoryDetails;
