import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { CircularProgress, makeStyles, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppAnimate from '../../../@crema/core/AppAnimate';
import { CremaTheme } from '../../../types/AppContextPropsType';
import { Fonts } from '../../../shared/constants/AppEnums';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_AUTH_USER } from 'types/actions/Auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin ,getUserRolesFirstUser} from 'redux/actions/Login';
// 
import { GET_ROLE_FIRST_USER, LOGIN_ERROR } from 'types/actions/Login.action';
import { AppState } from 'redux/store';
import { defaultUser } from 'shared/constants/AppConst';
 

toast.configure()

//--------------------------------------------To add the styles and theme----------------------------------------
const useStyles = makeStyles((theme: CremaTheme) => ({
  styledImg: {
    height: '60px',
    display: 'inline-block',
    [theme.breakpoints.up('lg')]: {
      // paddingRight: 40,
    },
  },
  textField: {
    width: '100%',
  },
  btnRootFull: {
    width: '100%',
  },
  card: {
    maxWidth: 1024,
    width: '35%',
    padding: 32,
    overflow: 'hidden',
    boxShadow:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',

  },
  gridContainer: {
    [theme.breakpoints.up('lg')]: {
      alignItems: 'center',
    },
  },
  gridItem: {
    marginBottom: '10px',
    textAlign: 'center',
  },
  checkedItem: {
    marginBottom: '10px',
    textAlign: 'center',
    // marginRight: "100px"
  },
  form: {
    textAlign: 'left',
    marginBottom: 24,
    [theme.breakpoints.up('xl')]: {
      marginBottom: 32,
    },
  },
  button: {
    width: '100%',
    height: 44,
  },
  pointer: {
    cursor: 'pointer',
  },
}));




const Login = () => {
  const dispatch = useDispatch();

  const [Logindata, setLogingData] = useState({
    userName: '',
    password: '',
    hidden: true,
    defaultroleId: 0,
    userId: 0,
    roleId: 0,
    companyCode: '',
    usernameError: "",
    passwordError: "",
    companyCodeError: "",
    IsFirstLogin: false,
    showAlert: true
  });
  //-------------------------------------------setting options--------------------------------------
  const history = useHistory();
  const classes = useStyles();
  
  const { dataLogin, dataUserRoleFirstLog, dataLoginError } = useSelector<AppState, AppState['login']>(
    ({ login }) => login,
  );
  const [loading, setloading] = useState(false);

  // --------------------------- Login event --------------------
  
  const forgotpassword = () => {
    history.push('/forget-password');
  }
 
 // --------------------------- Login event --------------------
 if (dataLoginError) {
  setloading(false);
  dispatch({
    type: LOGIN_ERROR,
    payload: null
  });
}

if (dataUserRoleFirstLog !== null) {
  
  if (dataUserRoleFirstLog.roles !== undefined && dataUserRoleFirstLog.roles !== null) {

    if (dataUserRoleFirstLog.roles !== undefined) {
      dataUserRoleFirstLog.roles.forEach((r: any) => {

        Logindata['roleId'] = r.RoleId;
        localStorage.setItem("RoleName", r.RoleName)
        Logindata['IsFirstLogin'] = dataUserRoleFirstLog.IsFirstLogin;
        // setLogingData(Logindata);

      })
    }
    let data = {
      "username": Logindata.userName,
      "password": Logindata.password,     
      "selectedroleId": Logindata.roleId
    };

    global.userId = dataUserRoleFirstLog.User_ID;
    if (Logindata.IsFirstLogin === false) {
      
      dispatch(userLogin(data));
    }
    else if (Logindata.IsFirstLogin === true) {
     
      setloading(false);
      // if (localStorage.getItem("RoleName") === "Product Admin") {
        console.log("Check whether the code is refelected")
        history.push('/reset-password');
      
      }
    // }

  }
  dispatch({ type: GET_ROLE_FIRST_USER, payload: null });
}

if (dataLogin !== null) {
  dispatch({
    type: UPDATE_AUTH_USER,
    payload: {
      authType: dataLogin.token_type,
      displayName: dataLogin.username,
      email: dataLogin.username,
      role: localStorage.getItem("RoleName"),
      photoURL: defaultUser.photoURL,
      token: dataLogin.access_token,
    },
  });
  localStorage.setItem('Token', dataLogin.access_token);
  localStorage.setItem('id_token', dataLogin.id_token);
  localStorage.setItem('token_type', dataLogin.token_type);
  localStorage.setItem('username', dataLogin.username);
  localStorage.setItem('companyId', dataLogin.companyId);
  localStorage.setItem('RefreshToken', dataLogin.refresh_token);
  localStorage.setItem("UserId", dataLogin.userId);
  global.userId = dataLogin.userId;
  
  console.log(dataLogin,"login")
 

    history.push('/ProblemsSolutions/problemsPosted');
    // window.location.reload();
 

}


  //-------------------------------------------To navigate forget password page----------------------------
  //--------------------------------------To validate the input form values------------------------------------------
  const validateForm = () => {
console.log(Logindata["userName"])
    let formIsValid = true;
    let formdata = {...Logindata}
    if (!formdata["userName"]) {
      console.log("FAS")
      formIsValid = false;
      toast.warning('Username is required');
    }

    if (!formdata["password"]) {
      formIsValid = false;
      toast.warning("Password is required");
    }

   
    return formIsValid;
  }
 
  //------------------------------------------To submit the login credentials------------------------------------------
  const submitForm = () => {
    console.log("Login")
    if (validateForm()) {
      // dispatch({
      //   type: UPDATE_AUTH_USER,
      //   payload: {
      //     authType: "Bearer",
      //     displayName: "test",
      //     email: "test@gmail.com",
      //     role: ['user'],
      //     token: "access_token",
      //   },
      // });
      dispatch(getUserRolesFirstUser(Logindata.userName));
      setloading(true)

      // history.push('/ProblemsSolutions/problemsPosted');
    }
    }



  // -----------------------------------------rendering ui----------------------------------------------
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Box
        pb={6}
        py={{ xl: 8 }}
        display='flex'
        flex={1}
        flexDirection='column'
        alignItems='center'
        justifyContent='center'>

        <Card className={classes.card}>
          <Grid container spacing={5} className={classes.gridContainer}>
            <Grid container className={classes.gridContainer}>
              <Grid item xs={3} lg={3} className={classes.gridItem}>
              </Grid>
              <Grid item xs={6} lg={6} className={classes.gridItem}>
                <Box>
                  <img  className={classes.styledImg} src='/assets/images/SBNA.png' alt="logo"></img>
                </Box>
              </Grid>
              <Grid item xs={12} lg={12} className={classes.gridItem}>
                <Box mb={{ xs: 6, xl: 8 }} fontWeight={Fonts.BOLD} fontSize={20}>
                  <IntlMessages id='common.login' />
                </Box>
              </Grid>
              <Grid item xs={12} lg={12} md={12} sm={12} className={classes.gridItem}>
                <TextField
                  defaultValue={Logindata.userName}
                  name='userName'
                  onChange=
                  {(event:any) => { setLogingData({ ...Logindata, userName: event.target.value }) }}
                  variant="outlined"
                  className={classes.textField}
                  label={<IntlMessages id='common.email' />}>
                </TextField>
              </Grid>
              <Grid item xs={12} lg={12} md={12} sm={12} className={classes.gridItem}>
                <TextField

                  defaultValue={Logindata.password}
                  name='password'
                  onChange={(event) => { setLogingData({ ...Logindata, password: event.target.value }) }}
                  variant="outlined"
                  className={classes.textField}
                  type={Logindata.hidden ? 'password' : 'text'}
                  // InputProps={{ endAdornment: showpassword }}
                  label={<IntlMessages id='common.password' />}>
                </TextField>
              </Grid>
            
            

              <Grid item xs={12} lg={12} className={classes.gridItem}>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  className={classes.btnRootFull}
                  onClick={submitForm}
                >
                  <IntlMessages id='common.login' />
                </Button>
              </Grid>
              <Grid item xs={12} lg={12} className={classes.gridItem}>
                <Button onClick={forgotpassword}> Forgot Password</Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        {loading ? <div className='login-load'>
          <CircularProgress style={{ 'color': 'yellow', 'position': 'absolute', "top": "44vh", 'left': '48%' }} />
        </div> : null}
      </Box>
    </AppAnimate>
  )
  }

export default Login;
