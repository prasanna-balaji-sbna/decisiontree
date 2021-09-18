export const GET_MODULES = 'GET_MODULES';
export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_PROBLEMS_BYMODCAT = 'GET_PROBLEMS_BYMODCAT';
export const GET_ALL_PROBS = 'GET_ALL_PROBS';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const INITIAL_FLOW_ELEMENTS = 'INITIAL_FLOW_ELEMENTS';
export const NEXT_FLOW_ELEMENTS = 'NEXT_FLOW_ELEMENTS';
export const SAVE_UPDATE_IMAGE = 'SAVE_UPDATE_IMAGE';
export const GET_ALL_IMAGESBY_GROUPID = 'GET_ALL_IMAGESBY_GROUPID';
export const DELETE_IMAGES = 'DELETE_IMAGES';
export const GET_ALL_GROUPS = 'GET_ALL_GROUPS';


export interface SetgetModules {
  type: typeof GET_MODULES;
  payload: any | null;
}
export interface SetgetCategories {
  type: typeof GET_CATEGORY;
  payload: any | null;
}
export interface GetProblemsByCategoriesModules {
  type: typeof GET_PROBLEMS_BYMODCAT;
  payload: any | null;
}
export interface GetAllProbs {
  type: typeof GET_ALL_PROBS;
  payload: any | null;
}
export interface UploadFile {
  type: typeof UPLOAD_FILE;
  payload: any | null;
}
export interface GetInitialFlowElements {
  type: typeof INITIAL_FLOW_ELEMENTS;
  payload: any | null;
}
export interface GetNextFlowElements {
  type: typeof NEXT_FLOW_ELEMENTS;
  payload: any | null;
}
export interface SaveOrUpdateImage {
  type: typeof SAVE_UPDATE_IMAGE;
  payload: any | null;
}
export interface deleteImages {
  type: typeof DELETE_IMAGES;
  payload: any | null;
}
export interface GetAllImagesByGroupID {
  type: typeof GET_ALL_IMAGESBY_GROUPID;
  payload: any | null;
}
export interface GetAllGroups {
  type: typeof GET_ALL_GROUPS;
  payload:any | null;
}
export type PostedProbsActions =
  | SetgetModules
  | SetgetCategories
  | GetProblemsByCategoriesModules
  | GetAllProbs
  | UploadFile
  | GetInitialFlowElements
  | GetNextFlowElements
  | SaveOrUpdateImage
  | deleteImages
  | GetAllImagesByGroupID
  | GetAllGroups