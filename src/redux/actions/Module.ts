import { Dispatch } from 'redux';
import { AppActions } from '../../types';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'axios';
import { showError } from '@crema/utility/Utils';
import { toast } from 'react-toastify';
import { GETALL_MODULE,MODULE_ENABLE,CREATE_MODULE, DELETE_MODULE,  UPDATE_MODULE } from 'types/actions/Module.action';
toast.configure();

export const GetAllModule= (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(  global.configData?.getallModule, {data}).then(res => {
            dispatch(fetchSuccess());
            dispatch({
                type: GETALL_MODULE,
                payload: res.data,
            });console.log (res.data)
        }).catch(error => {
                          
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};


export const ModuleEnable = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post(global.configData?.disableModule,{data}).then(res => {
        dispatch(fetchSuccess());
        
        dispatch({
            type: MODULE_ENABLE,
            payload:true,
        });
    }).catch(error => {
        showError(error);
        dispatch(fetchError(error.message));
    });
};
};
export const CreateModule= (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post(global.configData?.CreateModule,{data}).then(res => {
            dispatch(fetchSuccess());
            toast.success(" Module created successfully")
            dispatch({
                type: CREATE_MODULE,
                payload: true,
            });
        }).catch(error => {
            dispatch({
                type: CREATE_MODULE,
                payload: null
            });
            
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

export const UpdateModule = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post(global.configData?.updateModule,{data}).then(res => {
            dispatch(fetchSuccess());
            toast.success(" Module updated successfully")
            dispatch({
                type: UPDATE_MODULE,
                payload: true,
            });
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

export const DeleteModule = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.delete(global.configData?.deleteModule+"?ModuleID="+data.ModuleID).then(res => {
            dispatch(fetchSuccess());
            toast.success(" Module deleted successfully")
            dispatch({
                type: DELETE_MODULE,
                payload: true,
            });console.log(data.ModuleID)
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

