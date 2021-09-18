import { Dispatch } from 'redux';
import { AppActions } from '../../types';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'axios';
import { showError } from '@crema/utility/Utils';
import { toast } from 'react-toastify';
import { CATEGORY_ENABLE, CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, GET_MODULE, UPDATE_CATEGORY } from 'types/actions/Category.action';
toast.configure();

export const GetModule= () => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get( global.configData?.getModule).then(res => {
            dispatch(fetchSuccess());
            dispatch({
                type: GET_MODULE,
                payload: res.data,
            });
            console.log(res.data,"Module")
        }).catch(error => {
                          
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};
export const CategoryEnable = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post(global.configData?.disablecategory,{data}).then(res => {
        dispatch(fetchSuccess());
        
        dispatch({
            type: CATEGORY_ENABLE,
            payload:true,
        });
    }).catch(error => {
        showError(error);
        dispatch(fetchError(error.message));
    });
};
};


export const GetCategory= (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get( global.configData?.getdatacategory+"?ModuleID="+data.moduleId).then(res => {
            dispatch(fetchSuccess());
            dispatch({
                type: GET_CATEGORY,
                payload: res.data,
            });
            console.log(res,"allcat")
        }).catch(error => {
                          
            showError(error);
            dispatch(fetchError(error.message));

        });
    };
};

export const CreateCategory = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post(global.configData?.createcategory,{data}).then(res => {
            dispatch(fetchSuccess());
            toast.success(" Category created successfully")
            dispatch({
                type: CREATE_CATEGORY,
                payload: true,
            });
            console.log(res,"test")
        }).catch(error => {
            dispatch({
                type: CREATE_CATEGORY,
                payload: false
            });
            
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

export const UpdateCategory = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post(global.configData?.updatecategory, {data}).then(res => {
            dispatch(fetchSuccess());
            toast.success(" Category updated successfully")
            dispatch({
                type: UPDATE_CATEGORY,
                payload: true,
            });
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

export const DeleteCategory = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.delete(global.configData?.deletecategory+"?CatagoryID="+data.CatagoryID).then(res => {
            dispatch(fetchSuccess());
            toast.success(" Category deleted successfully")
            dispatch({
                type: DELETE_CATEGORY,
                payload: true,
            });
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

