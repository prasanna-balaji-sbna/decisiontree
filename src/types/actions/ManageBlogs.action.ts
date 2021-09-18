export const GET_BLOGS = 'GET_BLOGS';
export const CREATE_BLOG = 'CREATE_BLOG';
export const UPDATE_BLOG = 'UPDATE_BLOG';



export interface getAllBlogsActions {
  type: typeof GET_BLOGS;
  payload: any | null;
}

export interface setCreateBlogActions {
  type: typeof CREATE_BLOG;
  payload: any | null;
}
export interface setUpdateBlogActions {
    type: typeof UPDATE_BLOG;
    payload: any | null;
  }

 

export type ManageBlogActions =
  | getAllBlogsActions
  | setCreateBlogActions
  | setUpdateBlogActions
 