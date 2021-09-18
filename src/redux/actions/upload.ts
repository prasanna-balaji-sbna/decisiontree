import { Dispatch } from 'redux';
import { AppActions } from '../../types';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'axios';
import { showError } from '@crema/utility/Utils';
import { toast } from 'react-toastify';
import { POSTPROB_VOICE,UPLOAD_PICTURE,POST_PROBLEM } from 'types/actions/upload.action';
toast.configure();

export const postproblem= () => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(""
            //         global.configData?.GetAllList+"?PageNo="+data.PageNo + "&PageSize="+data.PageSize 
            //     +"&OrderColumn=" +data.OrderColumn 
            //    +"&OrderType="+data.OrderType + "&FieldName=" +data.FieldName
            //    +"&FieldValue="+data.FieldValue+ "&Operator=" +data.Operator
        ).then(res => {
            dispatch(fetchSuccess());
            dispatch({
                type: POST_PROBLEM,
                payload: res.data,
            });
            // toast.success("File Uploaded successfully !!!")
        }).catch(error => {

            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};


export const postprobvoice= () => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get("").then(res => {
            dispatch(fetchSuccess());
            // toast.success(" List updated successfully")
            dispatch({
                type: POSTPROB_VOICE,
                payload: res.data,
            });
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};
export const UploadPicture = (data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post("").then((res: any) => {
            dispatch(fetchSuccess());
            dispatch({
                type: UPLOAD_PICTURE,
                payload: res.data
            })
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};
