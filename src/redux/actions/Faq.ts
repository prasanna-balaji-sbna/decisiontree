import { Dispatch } from 'redux';
import { AppActions } from '../../types';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'axios';
import { showError } from '@crema/utility/Utils';
import { GET_FAQ,CREATE_FAQ,UPDATE_FAQ } from 'types/actions/Faq.action';
import { toast } from 'react-toastify';
toast.configure();

export const GetFAQ = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(global.configData?.getfaq + "?ModuleId=" + data.ModuleId +
        "&CategoryId=" + data.CategoryId)
        .then(res => {
            dispatch(fetchSuccess());
            dispatch({
                type: GET_FAQ,
                payload: res.data,
            });console.log(res.data)
        }).catch(error => {
           
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

export const CreateFAQ = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
          
        axios.post(global.configData?.updatefaq, {data} ).then(res => {
            dispatch(fetchSuccess());
            toast.success("FAQ created successfully")
            dispatch({
                type: CREATE_FAQ,
                payload: true,
            });
        }).catch(error => {
            dispatch({
                type: CREATE_FAQ,
                payload: null
            });
            
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

export const UpdateFAQ = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        
        axios.post(global.configData?.updatefaq, {data}).then(res => {
            dispatch(fetchSuccess());
            toast.success("FAQ updated successfully")
            dispatch({
                type: UPDATE_FAQ,
                payload: true,
            });
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};



