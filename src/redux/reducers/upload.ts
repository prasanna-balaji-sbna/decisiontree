import { AppActions } from "types";
import { UPLOAD_PICTURE,POST_PROBLEM,POSTPROB_VOICE} from "types/actions/upload.action";

const INIT_STATE: {
    postprobdata: any;
    postprobvoicedata: any | null;
    uploadPicture:any|null;
    
} = {
    postprobdata: null,
    postprobvoicedata: null,
     uploadPicture:null,
};

const Upload = (state = INIT_STATE, action: AppActions) => {
    switch (action.type) {
        case POST_PROBLEM: {
            return {
                ...state,
                postprobdata: action.payload,
            };
        }
        case POSTPROB_VOICE: {
            return {
                ...state,
                postprobvoice: action.payload,
            };
        }
        
        case UPLOAD_PICTURE: {
            return {
                ...state,
                uploadPicture: action.payload,
            };
        }
        default:
            return state;
    }
};
export default Upload;
