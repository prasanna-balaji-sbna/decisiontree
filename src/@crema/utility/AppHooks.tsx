import {useDispatch, useSelector} from 'react-redux';
import {ComponentType, useEffect, useState} from 'react';
import {fetchStart, fetchSuccess} from '../../redux/actions';
import {defaultUser} from '../../shared/constants/AppConst';
import {AppState} from '../../redux/store';
import {UPDATE_AUTH_USER} from '../../types/actions/Auth.actions';
import {AuthUser} from '../../types/models/AuthUser';

export const useAuthToken = (): [boolean, AuthUser | null] => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {user} = useSelector<AppState, AppState['auth']>(({auth}) => auth);

  useEffect(() => {
    const validateAuth = async () => {
      dispatch(fetchStart());
      const token = localStorage.getItem('token');
      console.log(token);
      
      if (!token) {
        dispatch(fetchSuccess());
        return;
      }
      try {
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: {
            authType: localStorage.getItem("token_type"),
            displayName: localStorage.getItem("username"),
            email: localStorage.getItem("username"),
            role: localStorage.getItem("RoleName"),
            photoURL: defaultUser.photoURL,
            token:localStorage.getItem("Token")
          },
        });
        return;
      } catch (err) {
        dispatch(fetchSuccess());
        return;
      }
    };

    const checkAuth = () => {
      Promise.all([validateAuth()]).then(() => {
        setLoading(false);
      });
    };
    checkAuth();
  }, [dispatch]);

  return [loading, user];
};

export const useAuthUser = (): AuthUser | null => {
  const {user} = useSelector<AppState, AppState['auth']>(({auth}) => auth);
  if (user) {
    return user;
  }
  return null;
};

export const retry = (fn:any, retriesLeft = 5, interval = 1000) => {
  return new Promise<{default:ComponentType<any>}>((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error:any) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
}


