import { showError } from '@crema/utility/Utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { AppActions } from '../../types';
import { CREATE_USER, UPDATE_USER, GET_USER, DELETE_USER, GET_LOV, GET_ROLES_LIST, GET_STATUS_LIST } from 'types/actions/User.action'
import { fetchError, fetchStart, fetchSuccess } from './Common';


export const getUser = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(global.configData?.GetAllUser)
            .then(res => {
                dispatch(fetchSuccess());
                res.data.List.forEach((s:any)=>
                {                     
                  s.Name = s.FirstName + " "+s.LastName;
                })
                dispatch({
                    type: GET_USER,
                    payload: res.data
                });
            })
            .catch(error => {
                showError(error);
                dispatch(fetchError(error));
            })
    };
};
export const getLov = (data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(global.configData?.GetLOV, { data })
            .then(res => {

                dispatch(fetchSuccess());
                res.data.List.forEach((s: any) => {
                    s.Name = s.FirstName + " " + s.LastName;
                })
                dispatch({
                    type: GET_LOV,
                    payload: res.data
                });
            })
            .catch(error => {
                showError(error);
                dispatch(fetchError(error));
            })
    };
};
export const createUser = (data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post(global.configData?.CreateUser, { data }).then(res => {

            dispatch(fetchSuccess());
            dispatch({
                type: CREATE_USER,
                payload: true
            })
            toast.success('User Created Successfully ')
        }).catch(error => {
            dispatch(fetchError(error));
            showError(error);
        })
    }
}
export const updateUser = (data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post(global.configData?.Updateuser, { data }).then(res => {
            dispatch(fetchSuccess());
            dispatch({
                type: UPDATE_USER,
                payload: true
            })
            toast.success('User Updated Successfully ')
        }).catch(error => {
            dispatch(fetchError(error));
            showError(error);
        })
    }
}
export const deleteUser = (data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post(global.configData?.Deleteuser, { data }).then(res => {
            dispatch(fetchSuccess());
            dispatch({
                type: DELETE_USER,
                payload: true
            })
            toast.success('User Deleted Successfully ')
        }).catch(error => {
            dispatch(fetchError(error));
            showError(error);
        })
    }
}
export const getRolesList = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(fetchStart());


        axios.get(global.configData?.getallroles).then(res => {

            dispatch(fetchSuccess());
            res.data.forEach((e: any) => {
                e.roleId = e.roleId.toString();
            });
            dispatch({
                type: GET_ROLES_LIST,
                payload: res.data
            })


        })
            .catch(error => {

                dispatch(fetchError(error));
                showError(error);
            })
    }

}
export const getStatusList = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(fetchStart());


        axios.get(global.configData?.getAllStatusLov).then(res => {

            dispatch(fetchSuccess());           
            dispatch({
                type: GET_STATUS_LIST,
                payload: res.data
            })


        })
            .catch(error => {

                dispatch(fetchError(error));
                showError(error);
            })
    }

}
