import {  AppActions } from "types";
import { GET_BLOGS,CREATE_BLOG,UPDATE_BLOG } from "types/actions/ManageBlogs.action";

const INIT_STATE: { 
     getBlogdata: any;
     createBlogdata: any | null;
     updateBlogdata: any | null;
     } = {
        getBlogdata: null,
        createBlogdata: null,
        updateBlogdata: null,
};

const ManageBlog = (state = INIT_STATE, action: AppActions) => {
  switch (action.type) {
    case GET_BLOGS: {
      return {
        ...state,
        getBlogdata: action.payload,
      };
    }
    case CREATE_BLOG: {
      return {
        ...state,
        createBlogdata: action.payload,
      };
    }
    case UPDATE_BLOG: {
      return {
        ...state,
        updateBlogdata: action.payload,
      };
    }
  
default:
      return state;
  }
};
export default ManageBlog ;
