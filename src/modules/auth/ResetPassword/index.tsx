import React, {  useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import Grid from '@material-ui/core/Grid';
import AppAnimate from '../../../@crema/core/AppAnimate';
import { CremaTheme } from '../../../types/AppContextPropsType';
import { Fonts } from '../../../shared/constants/AppEnums';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_AUTH_USER } from 'types/actions/Auth.actions';
import { defaultUser } from 'shared/constants/AppConst';
import { useDispatch, useSelector } from 'react-redux';
import { changeTempPassword } from 'redux/actions/Login';
import { AppState } from 'redux/store';
import {  LOGIN } from 'types/actions/Login.action';

//  --------------------------------------------customized style----------------------------------
const useStyles = makeStyles((theme: CremaTheme) => ({
    styledImg: {
        display: 'inline-block',
        [theme.breakpoints.up('lg')]: {
            paddingRight: 40,
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

const ResetPassword = () => {
    const dispatch = useDispatch();
    const { dataReset } = useSelector<AppState, AppState['login']>(
        ({ login }) => login,
    );
    const history = useHistory();

    const classes = useStyles();
    // ------------------------------------------ all states  -----------------------------------
    const [forgetData, setForgetData] = useState({
        username: "",
        newpassword: "",
        oldpassword: ""
    });
    // useEffect(() => {

    // }, [dispatch]);
    if (dataReset !== null) {
        dispatch({
            type: UPDATE_AUTH_USER,
            payload: {
                authType: dataReset.token_type,
                displayName: dataReset.username,
                email: dataReset.username,
                role: localStorage.getItem("RoleName"),
                photoURL: defaultUser.photoURL,
                token: dataReset.access_token,
            },
        });

       // localStorage.setItem('Token', dataReset.access_token);
        //localStorage.setItem('id_token', dataReset.id_token);
        //localStorage.setItem('token_type', dataReset.token_type);
        //localStorage.setItem('username', dataReset.username);
        //localStorage.setItem('companyId', dataReset.companyId);
        //localStorage.setItem('RefreshToken', dataReset.refresh_token);
        //localStorage.setItem("UserId", dataReset.userId);
        toast.success(dataReset.message);
        //if (localStorage.getItem("RoleName") === "Product Admin" && (dataReset.companyId === "" || dataReset.companyId === null)) 
        
            history.push('/ProblemsSolutions/problemsPosted');
            // window.location.reload();
        
        

    }
    // -----------------------------------------validating the form inputs-------------------
    const validateForm = () => {

        let FormIsValid = true;
        let value = { ...forgetData };

        if (!value['username']) {
            FormIsValid = false;

            toast.warning('Username is required')

        }
        if (!value['newpassword']) {
            FormIsValid = false;

            toast.warning('New Password is required')

        }
        if (!value['oldpassword']) {
            FormIsValid = false;

            toast.warning('Old Password is required')

        }


        return FormIsValid;
    }
    // ----------------------------------cancel button----------------------
    const backtosignin = () => {
        console.log("CANCEL")
               dispatch({type:LOGIN,payload:null})
        history.push('/signin')
    }
    // -----------------------------------------submit input fileds-------------------
    const resetSubmit = () => {
        if (validateForm()) {
            let data =
            {
                username: forgetData['username'],
                oldPassword: forgetData['oldpassword'],
                NewPassword: forgetData['newpassword'],
               // companyCode: localStorage.getItem('companyCode'),
                AcceptedDateTime: localStorage.getItem('AcceptedDateTime')
            }
            dispatch(changeTempPassword(data));


        }

    }




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
                                <Box >


                                <img  className={classes.styledImg} src='/assets/images/SBNA.png' alt="SBNA"></img>

                                </Box>
                            </Grid>

                            <Grid item xs={12} lg={12} className={classes.gridItem}>
                                <Box mb={{ xs: 6, xl: 8 }} fontWeight={Fonts.BOLD} fontSize={20}>
                                    <IntlMessages id='common.resetMyPassword' />
                                </Box>

                            </Grid>
                            <Grid item xs={12} lg={12} md={12} sm={12} className={classes.gridItem}>
                                <TextField
                                    value={forgetData.username}
                                    name='username'
                                    onChange={(event) => { setForgetData({ ...forgetData, username: event.target.value }) }}
                                    variant="outlined"
                                    className={classes.textField}
                                    label={<IntlMessages id='common.email' />}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} lg={12} md={12} sm={12} className={classes.gridItem}>
                                <TextField
                                    value={forgetData.newpassword}
                                    name='newpassword'
                                    onChange={(event) => { setForgetData({ ...forgetData, newpassword: event.target.value }) }}
                                    variant="outlined"
                                    type="password"
                                    className={classes.textField}
                                    label={<IntlMessages id='common.newPassword' />}>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} lg={12} md={12} sm={12} className={classes.gridItem}>
                                <TextField
                                    value={forgetData.oldpassword}
                                    name='oldpassword'
                                    onChange={(event) => { setForgetData({ ...forgetData, oldpassword: event.target.value }) }}
                                    variant="outlined"
                                    type="password"
                                    className={classes.textField}
                                    label={<IntlMessages id='common.oldpassword' />}>
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
                                    onClick={backtosignin}
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

        </AppAnimate>

    )
};

export default ResetPassword;
