import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AppAnimate from '../../../@crema/core/AppAnimate';
import { CremaTheme } from '../../../types/AppContextPropsType';
import { Fonts } from '../../../shared/constants/AppEnums';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ForgotPassoword, verifyForgotPassword } from 'redux/actions/Login';
import { AppState } from 'redux/store';
// ------------------------------------------customized style -----------------------------------
const useStyles = makeStyles((theme: CremaTheme) => ({
  styledImg: {
    display: 'inline-block',
    height: '60px',
    [theme.breakpoints.up('lg')]: {
      height: '60px'
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
// ------------------------------------------ for toast  -----------------------------------
toast.configure()

const ForgetPassword: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { dataForgotPass, dataVerifyForgotPass } = useSelector<AppState, AppState['login']>(
    ({ login }) => login,
  );
  useEffect(() => {

  }, [dispatch]);
  const classes = useStyles();
  const history = useHistory();

  // ------------------------------------------ all states  -----------------------------------

  const [forgetData, setForgetData] = useState({
    email: "",
    otp: "",
    otpsent: false,
    newpassword: "",
    confirmpassword: ""
  });
  // -----------------------------------------validating the form inputs-------------------

  const validateForm = (condition: any) => {

    let FormIsValid = true;
    let value = { ...forgetData };
    if (condition === "forgot") {

      if (!value['email']) {
        FormIsValid = false;
        toast.warning('Email is required')

      }

      if (forgetData['email']) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(value["email"])) {
          FormIsValid = false;

          toast.error('Email is not Valid');

        }
      }
    }
    if (condition === "reset") {
      if (!value['otp']) {
        FormIsValid = false;

        toast.warning('OTP is required')

      }
      if (!value['newpassword']) {
        FormIsValid = false;

        toast.warning('New Password is required')

      }
      if (!value['confirmpassword']) {
        FormIsValid = false;

        toast.warning('Confirm Password is required')

      }
      if (value['newpassword'] && value['confirmpassword']) {
        if (value["newpassword"] !== value["confirmpassword"]) {

          FormIsValid = false;
          toast.error('Passwords dont match');

        }

      }
    }
    return FormIsValid
  }
  if (dataForgotPass) {
    setForgetData({ ...forgetData, otpsent: true })
  }
  if (dataVerifyForgotPass) {
    history.push('/signin')
  }
  // ---------------------------------------submit the input fields--------------------------
  const forgotpassword = () => {
    if (validateForm("forgot")) {
      let data =
      {
        username: forgetData['email']
      }
      dispatch(ForgotPassoword(data));


    }
  }
  // ---------------------------------------to submit reset details---------------------------------
  const resetSubmit = () => {
    let data =
    {
      "username": forgetData.email,
      "password": forgetData.newpassword,
      "code": forgetData.otp
    }
    dispatch(verifyForgotPassword(data))
  }

  return (

    <AppAnimate animation='transition.slideUpIn' delay={200}>
      {forgetData.otpsent === false ?
        //  --------------------------------------------forgot password----------------------------------
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
                  <Box >


                  <img  className={classes.styledImg} src='/assets/images/SBNA.png' alt="SBNA"></img>

                  </Box>
                </Grid>



                <Grid item xs={12} lg={12} className={classes.gridItem}>
                  <Box mb={{ xs: 6, xl: 8 }} fontWeight={Fonts.BOLD} fontSize={20}>
                    <IntlMessages id='common.forgetPassword' />
                  </Box>
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12} className={classes.gridItem}>
                  <TextField
                    name='email'
                    onChange={(event) => { setForgetData({ ...forgetData, email: event.target.value }) }}
                    variant="outlined"
                    className={classes.textField}
                    label={<IntlMessages id='common.email' />}>
                  </TextField>
                </Grid>

                <Grid item xs={12} lg={12} className={classes.gridItem}>
                  <Button
                    //  component={Link}
                    //  to="/Reset-Password"
                    variant='contained'
                    color='primary'
                    type='submit'
                    className={classes.btnRootFull}
                    onClick={forgotpassword}
                  >
                    <IntlMessages id='common.proceed' />
                  </Button>
                </Grid>
                <Grid item xs={12} lg={12} className={classes.gridItem}>
                  <Button
                    component={Link}
                    to="/signin"
                    variant='contained'
                    color='primary'

                    className={classes.btnRootFull}

                  >
                    <IntlMessages id='common.cancel' />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Box>
        :
        //  --------------------------------------------reset password----------------------------------
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
                  <Box >


                    <img className={classes.styledImg} src='/assets/images/mainSBNA.png' alt="SBNA"></img>
                  </Box>
                </Grid>

                <Grid item xs={12} lg={12} className={classes.gridItem}>
                  <Box mb={{ xs: 6, xl: 8 }} fontWeight={Fonts.BOLD} fontSize={20}>
                    <IntlMessages id='common.resetMyPassword' />
                  </Box>

                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12} className={classes.gridItem}>
                  <TextField
                    value={forgetData.otp}
                    name='otp'
                    onChange={(event) => { setForgetData({ ...forgetData, otp: event.target.value }) }}
                    variant="outlined"
                    className={classes.textField}
                    label={<IntlMessages id='common.otp' />}>
                  </TextField>
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12} className={classes.gridItem}>
                  <TextField
                    value={forgetData.newpassword}
                    name='newpassword'
                    onChange={(event) => { setForgetData({ ...forgetData, newpassword: event.target.value }) }}
                    variant="outlined"
                    className={classes.textField}
                    label={<IntlMessages id='common.newPassword' />}>
                  </TextField>
                </Grid>
                <Grid item xs={12} lg={12} md={12} sm={12} className={classes.gridItem}>
                  <TextField
                    value={forgetData.confirmpassword}
                    name='confirmpassword'
                    onChange={(event) => { setForgetData({ ...forgetData, confirmpassword: event.target.value }) }}
                    variant="outlined"
                    className={classes.textField}
                    label={<IntlMessages id='common.confirmpassword' />}>
                  </TextField>
                </Grid>
                <Grid item xs={12} lg={12} className={classes.gridItem}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={resetSubmit}
                    className={classes.btnRootFull}

                  >
                    <IntlMessages id='common.proceed' />
                  </Button>
                </Grid>
                <Grid item xs={12} lg={12} className={classes.gridItem}>
                  {/* <Button
              variant='contained'
              color='primary'
              
              className={classes.btnRootFull}
           
            >
          <IntlMessages id='common.resendotp' />
            </Button> */}
                </Grid>
                <Grid item xs={12} lg={12} className={classes.gridItem}>
                  <Button
                    component={Link}
                    to="/signin"
                    variant='contained'
                    color='primary'

                    className={classes.btnRootFull}

                  >
                    <IntlMessages id='common.cancel' />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>

        </Box>
      }
    </AppAnimate>

  )
};

export default ForgetPassword;
