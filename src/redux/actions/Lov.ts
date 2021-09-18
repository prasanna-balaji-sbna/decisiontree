
import { Dispatch } from 'redux';
import { AppActions } from '../../types';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'axios';
import { showError } from '@crema/utility/Utils';
import {GET_AllLIST,GET_LOV,CREATE_LOV,UPDATE_LOV,DELETE_LOV } from "types/actions/Lov.action";
import { toast } from 'react-toastify';

toast.configure();

export const getAllList = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(global.configData?.GetLists)
        .then(res=>{
            dispatch(fetchSuccess());
            dispatch({  
                type: GET_AllLIST,
                payload: res.data,
            });console.log(res.data)
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

export const getLov = (data:any) => {
  //  console.log(data,"data")
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(global.configData?.GetLOV+"?ListID="+data.id  ).then(res => {
            dispatch(fetchSuccess());          
            dispatch({
                type: GET_LOV,
                payload: res.data,
            });console.log(res.data)
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

export const createLov = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        
        axios.post(global.configData?.CreateLOV,{data} ).then(res => {
            dispatch(fetchSuccess());
            toast.success('LOV created sucessfully ');

            dispatch({
                type: CREATE_LOV,
                payload: true,
            });
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};
export const updateLov = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post(global.configData?.UpdateLOV,{data}).then(res => {
            dispatch(fetchSuccess());
            toast.success('LOV updated sucessfully ');

            dispatch({
                type: UPDATE_LOV,
                payload: true,
            });
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};
export const deleteLov = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        
    axios.delete(global.configData?.DeleteLOV+"?LovID="+data.LovID).then(res => {
            dispatch(fetchSuccess());
            toast.success('LOV deleted sucessfully ');

            dispatch({
                type: DELETE_LOV,
                payload: true,
            });console.log(data.LovID)
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};
