import { Dispatch } from 'redux';
import { AppActions } from '../../types';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'axios';
import { showError } from '@crema/utility/Utils';
import { GET_LIST,CREATE_LIST,UPDATE_LIST ,DELETE_LIST} from 'types/actions/list.action';
import { toast } from 'react-toastify';
toast.configure();

export const GetList = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(global.configData?.GetLists, {data}).then(res => {
            dispatch(fetchSuccess());
            dispatch({
                type: GET_LIST,
                payload: res.data,
            });console.log(res.data)
        }).catch(error => {
           
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

export const CreateList = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
          
        axios.post(global.configData?.CreateList, {data} ).then(res => {
            dispatch(fetchSuccess());
            toast.success(" List created successfully")
            dispatch({
                type: CREATE_LIST,
                payload: true,
            });
        }).catch(error => {
            dispatch({
                type: CREATE_LIST,
                payload: null
            });
            
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

export const UpdateList = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        
        axios.post(global.configData?.UpdateList, {data}).then(res => {
            dispatch(fetchSuccess());
            toast.success(" List updated successfully")
            dispatch({
                type: UPDATE_LIST,
                payload: true,
            });
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

export const DeleteList = (data:any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.delete(global.configData?.DeleteList+"?listId="+data.listId).then(res => {
            dispatch(fetchSuccess());
            toast.success(" List deleted successfully")
            dispatch({
                type: DELETE_LIST,
                payload: true,
            });console.log(data.ListID)
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

