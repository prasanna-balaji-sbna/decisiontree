import { showError } from '@crema/utility/Utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Dispatch } from 'redux';
import { AppActions } from '../../types';
import { LOGIN, RESET_PASSWORD, FORGOT_PASSWORD, LOGIN_ERROR, VERIFY_FORGOT_PASSWORD, GET_ROLE_FIRST_USER } from 'types/actions/Login.action'
import { fetchError, fetchStart, fetchSuccess } from './Common';


export const userLogin = (data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post(global.configData?.login, { data }).then(res => {
            dispatch(fetchSuccess());
            dispatch({
                type: LOGIN,
                payload: res.data
            });
            toast.success('Logged In Successfully ');
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error));
        })
    };
};
export const getUserRolesFirstUser = (data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(global.configData?.GetUserRoles + "?EmailID=" + data)
            .then(res => {

                dispatch(fetchSuccess());
                dispatch({
                    type: GET_ROLE_FIRST_USER,
                    payload: res.data
                });
            })
            .catch(error => {
                console.log(error,"error")
                dispatch(fetchError(error));
                showError(error);
                dispatch({
                    type: LOGIN_ERROR,
                    payload: true
                });

            })
    };
};
export const changeTempPassword = (data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post(global.configData?.changeTempPassword, { data }).then(res => {

            dispatch(fetchSuccess());
            dispatch({
                type: RESET_PASSWORD,
                payload: res.data
            })
            toast.success('Password Changed Successfully ')
        }).catch(error => {
            dispatch(fetchError(error));
            showError(error);
        })
    }
}
export const verifyForgotPassword = (data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post(global.configData?.verifyForgetPassword, { data }).then(res => {
            dispatch(fetchSuccess());
            dispatch({
                type: VERIFY_FORGOT_PASSWORD,
                payload: res.data
            })
            // toast.success('User Updated Successfully !!!')
        }).catch((error: any) => {
            dispatch(fetchError(error));
            showError(error);
        })
    }
}

export const ForgotPassoword = (data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post(global.configData?.forgetPassword, { data }).then(res => {
            dispatch(fetchSuccess());
            dispatch({
                type: FORGOT_PASSWORD,
                payload: true
            })
            // toast.success('User Updated Successfully !!!')
        }).catch(error => {
            dispatch(fetchError(error));
            showError(error);
        })
    }
}