import React, { ReactNode, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import qs from 'qs';
import AppContext from './AppContext';
import { useAuthToken } from './AppHooks';
import { Loader } from '../index';
import { checkPermission } from './Utils';
import { authRole, defaultUser, initialUrl } from '../../shared/constants/AppConst';
// authRole, defaultUser,
import { setInitialPath } from '../../redux/actions';
import { AppState } from '../../redux/store';
import AppContextPropsType from '../../types/AppContextPropsType';
import { NavStyle, ThemeMode, ThemeStyle } from '../../shared/constants/AppEnums';
import { UPDATE_AUTH_USER } from 'types/actions/Auth.actions';
// import { UPDATE_AUTH_USER } from 'types/actions/Auth.actions';
// import axios from 'axios';

interface AuthRoutesProps {
  children: ReactNode;
}

const AuthRoutes: React.FC<AuthRoutesProps> = ({ children }) => {
  const { pathname, search } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    routes,
    changeNavStyle,
    updateThemeStyle,
    updateThemeMode,
    setRTL,
  } = useContext<AppContextPropsType>(AppContext);

  const [loading, user] = useAuthToken();
  const { initialPath } = useSelector<AppState, AppState['settings']>(
    ({ settings }) => settings,
  );
  const currentRoute = matchRoutes(routes, pathname)[0].route;
  // let isPermitted = checkPermission(currentRoute.auth, user ? user.role : null);
  let isPermitted = checkPermission(currentRoute.auth, user);
  // ---------------------------------------for notification-------------------------
  // const messageHistory = useRef([]);

  // const {
  //     lastMessage,
  // } = useWebSocket(SocketUrl);

  // const sendNotifi = (data: any) => {
  //   global.count = 0;
  //     if (localStorage.getItem("RoleName") === authRole.product[0]) {
  //         if (data != null) {
  //             var options: NotificationOptions = {
  //                 body: "New Payment Added",
  //                 icon: "/assets/images/appLogo.png",
  //                 dir: "ltr"
  //             };
  //             global.notifi = new Notification("New Update", options);
  //             global.notifi.onclick = function () {
  //                 window.open(NotifiOpenUrl);
  //             };
  //             global.notifi.onshow = function () {
  //               ++global.count;
  //               console.log(global.count);
  //                 console.log("showeddddddddddddd");
  //             };
  //         }
  //     }
  //     return data;
  // }
  // messageHistory.current = useMemo(() =>
  //     sendNotifi(lastMessage), [lastMessage]
  // );

  // useEffect(() => {
  //   axios.get("./config.json").then(res => {
  //     global.configData = res.data;
  //   })
  // },[]);

  // ---------------------------------------for notification-------------------------
  useEffect(() => {

    function setInitPath() {
      if (localStorage.getItem("UserId") != null) {
        global.userId = localStorage.getItem("UserId");
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: {
            authType: localStorage.getItem("token_type"),
            displayName: localStorage.getItem("username"),
            email: localStorage.getItem("username"),
            role: localStorage.getItem("RoleName"),
            photoURL: defaultUser.photoURL,
            token: localStorage.getItem("Token")
          },
        });
        if (localStorage.getItem("RoleName") === authRole.product[0]) {
          Notification.requestPermission();
        }
      }
      if (
        initialPath === '/' && 
        [
          '/signin',
          '/signup',
          '/confirm-signup',
          '/reset-password',
          '/error-pages/error-404',
          '/forget-password',

        ].indexOf(pathname) === -1
      ) {
        if (isPermitted) {
          dispatch(setInitialPath(pathname));
        } else {
          dispatch(setInitialPath(undefined));
        }
      }
    }

    setInitPath();
  }, [dispatch, isPermitted, initialPath, pathname]);

  useEffect(() => {
    function handleQueryParams() {
      const query = qs.parse(search.split('?')[1]);
      if (query.layout) {
        changeNavStyle(query.layout as NavStyle);
      }
      if (query.mode) {
        updateThemeMode(query.mode as ThemeMode);
      }
      if (query.rtl) {
        setRTL(true);
      }
      if (query.style) {
        updateThemeStyle!(query.style as ThemeStyle);
      }
    }

    if (search) {
      handleQueryParams();
    }
  }, [changeNavStyle, updateThemeMode, setRTL, updateThemeStyle, search]);

  useEffect(() => {
 

    
    if (!loading) {
      console.log(user);
      console.log(isPermitted);
      console.log(pathname);
      if (!user && !isPermitted) {
        if (pathname === '/forget-password') {
          history.push(pathname); // allowed route

        }
        else if (pathname === '/reset-password') {
          history.push(pathname); // allowed route

        }
        else {
          history.push('/signin'); // allowed route
        }
      }
      else if (user && !isPermitted) {
        history.push('/error-pages/error-404'); // Not found
      }
      else if (user && isPermitted) {
        if (
          pathname === '/' ||
          pathname === '/signin' ||
          pathname === '/signup' ||
          pathname === '/forget-password' ||
          pathname === '/reset-password'
        ) {
          history.push(pathname);

        } else if (initialPath && initialUrl !== initialPath && initialPath !== '/') {
          history.push(initialPath);
        }
      }
    }
  }, [user, loading, initialPath, isPermitted, pathname, history]);

  return loading ? <Loader /> : <>{children}</>;
};

export default AuthRoutes;
