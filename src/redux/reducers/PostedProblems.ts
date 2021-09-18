import { AppActions } from "types";
import { DELETE_IMAGES, GET_ALL_GROUPS, GET_ALL_IMAGESBY_GROUPID, GET_ALL_PROBS, GET_CATEGORY, GET_MODULES, GET_PROBLEMS_BYMODCAT,INITIAL_FLOW_ELEMENTS,NEXT_FLOW_ELEMENTS,SAVE_UPDATE_IMAGE,UPLOAD_FILE } from "types/actions/ProblemsPosted.action";

const INIT_STATE: {
    getmodulesdata: any;
    getcategoriesdata: any | null;
    getpostedproblemsalldata: any | null;
    getpostedproblemsbyIdsdata: any | null;
    uploadFile:any|null;
    getinitialFlowElementsdata:any|null;
    getnextFlowElementsdata:any|null;
    saveOrUpdateImage:any|null;
    getAllImages:any|null;
    deleteImage:any|null;
    getAllGroups:any|null;
} = {
    getmodulesdata: null,
    getcategoriesdata: null,
    getpostedproblemsalldata: null,
    getpostedproblemsbyIdsdata: null,
    uploadFile:null,
    getinitialFlowElementsdata:[],
    getnextFlowElementsdata:null,
    saveOrUpdateImage:null,
    getAllImages:[],
    deleteImage:null,
    getAllGroups:null

};

const PostedProblems = (state = INIT_STATE, action: AppActions) => {
    switch (action.type) {
        case GET_ALL_PROBS: {
            return {
                ...state,
                getpostedproblemsalldata: action.payload,
            };
        }
        case GET_MODULES: {
            return {
                ...state,
                getmodulesdata: action.payload,
            };
        }
        case GET_CATEGORY: {
            return {
                ...state,
                getcategoriesdata: action.payload,
            };
        }
        case GET_PROBLEMS_BYMODCAT: {
            return {
                ...state,
                getpostedproblemsbyIdsdata: action.payload,
            };
        }
        case UPLOAD_FILE: {
            return {
                ...state,
                uploadFile: action.payload,
            };
        }
        case INITIAL_FLOW_ELEMENTS: {
            return {
                ...state,
                getinitialFlowElementsdata: action.payload,
            };
        }
        case NEXT_FLOW_ELEMENTS: {
            return {
                ...state,
                getnextFlowElementsdata: action.payload,
            };
        }
        case SAVE_UPDATE_IMAGE: {
            return {
                ...state,
                saveOrUpdateImage: action.payload,
            };
        }
        case GET_ALL_IMAGESBY_GROUPID: {
            return {
                ...state,
                getAllImages: action.payload,
            };
        }
        case DELETE_IMAGES: {
            return {
                ...state,
                deleteImage: action.payload,
            };
        }
        case GET_ALL_GROUPS: {
            return {
                ...state,
                getAllGroups : action.payload,
            };
        }
        default:
            return state;
    }
};
export default PostedProblems;
