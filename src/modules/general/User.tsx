import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { Select, Card, IconButton, MenuItem } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import AppAnimate from '../../@crema/core/AppAnimate';
import MuiPhoneNumber from "material-ui-phone-number";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ColumnChooser, ColumnDirective, ColumnsDirective, FilterSettingsModel } from '@syncfusion/ej2-react-grids';
import { Edit, Grid as SysGrid, CommandColumn, ColumnMenu, GridComponent, PageSettingsModel, Filter, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
import { Input } from 'reactstrap';
//import Switch from '@material-ui/core/Switch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import ColorPicker from 'material-ui-color-picker';
//import { Loader } from '@crema';
//import useWindowDimensions from '@crema/utility/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/store';
import { createUser, updateUser, getUser, getRolesList, getStatusList } from 'redux/actions/User';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from 'types/actions/User.action'
// import { GET_USER } from 'types/actions/User.action';

// import axios from 'axios';

toast.configure()

const User = () => {

  var grid: SysGrid | null;
  var data: any;
  // --------------------------------------------All States----------------------------------------------
  const [formData, setformData] = useState({
    FirstName: "",
    LastName: "",
    UserName: "",
    RoleID: '',
    Status: '',
    Email: "",
    saveorUpdate: "create",
    PhoneNumber: "",
    EmailID: "",
    UserID: '',
    RecordVersion:''

  })


  const dispatch = useDispatch();
  const filterOptions: FilterSettingsModel = { type: 'Menu' };
  // const [loading, setLoading] = useState(true);
  // const [getId, setgetId] = useState({});
  // const [openDelete, setopenDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const pageOptions: PageSettingsModel = { pageSizes: ["20", "50", "100", "250"], pageSize: 20 };
  // const { height } = useWindowDimensions();  
  const [sendingparam, setsendingparam] = useState({
    orderColumn: 'FirstName',
    orderType: 'asc',
    PageNo: '1',
    PageSize: '20',
    userId: '',
    field: 'ListName',
    value: '',
    //type: 'string',
    matchCase: false,
    operator: 'startswith'
  })

  // --------------------------------------------use effect ----------------------------------------------



  useEffect(() => {
    initialCallFunctions();
    dispatch(getUser())

    // getAllLov(0);

  }// eslint-disable-next-line react-hooks/exhaustive-deps
    , [dispatch]);
  const { dataCreate, dataDelete, dataUpdate, dataGetUser, dataRoleList, dataStatusList } = useSelector<AppState, AppState['user']>(
    ({ user }) => user,
  );
  const initialCallFunctions = () => {
    dispatch(getUser());
    dispatch(getRolesList());
    dispatch(getStatusList());
    console.log(dataRoleList, "dataRoleList")
  }
  if (dataGetUser !== null) {

    setTimeout(() => {

      if (grid !== null && grid !== undefined) {
        grid.dataSource = {
          result: dataGetUser.List,
          // count: dataGetUser.Count,
        }

        if (dataCreate === null && dataUpdate === null && dataDelete === null) {
          // setLoading(false);
        }

      }
    });
  }

  // --------------------------------------------for get all user ----------------------------------------------


  // const getUser = () => {
  //   // dispatch({
  //   //   type: GET_USER,
  //   //   payload: null,
  //   // });
  //   // let data = {
  //   //   PageNo: sendingparam.PageNo,
  //   //   PageSize: sendingparam.PageSize,
  //   //   OrderColumn: sendingparam.orderColumn,
  //   //   OrderType: sendingparam.orderType,
  //   //   FieldName: sendingparam.field,
  //   //   FieldValue: sendingparam.value,
  //   //   Operator: sendingparam.operator,
  //   //   //Type: sendingparam.type,
  //   // }
  //   dispatch(getUser())
  //   //setLoading(true)


  // }

  if (dataCreate) {
    dispatch({
      type: CREATE_USER,
      payload: null,
    });
    dispatch(getUser())
    setShowDialog(false);

  }
  if (dataUpdate) {
    dispatch({
      type: UPDATE_USER,
      payload: null,
    });
    dispatch(getUser())
    setShowDialog(false);

  }
  if (dataDelete) {
    dispatch({
      type: DELETE_USER,
      payload: null,
    });
    dispatch(getUser())
  }

  // const Userdata=
  // [
  //   {
  //     "Name":"Anish",
  //     "LastName":"Kapoor",
  //     "UserName":"Soruabbb",
  //     "RoleName":"Operator",
  //     "Status":"active",
  //     "Email":"anish@gmail.com",
  //     "PhoneNumber":"+1 (343) 567-325"
  //   }
  // ]



  // ----------------------------------------to open and close modal----------------------------

  // const opendeleteModal = (data: any) => {
  //   setgetId(data.ID);
  //   setopenDelete(true);
  // }

  const open = () => { setShowDialog(true); }
  const close = () => { setShowDialog(false); }


  // ---------------------------------------to validate the input form values-------------------

  const validateform = () => {

    let formvalid = true;

    if (!formData["UserName"]) {
      formvalid = false;
      toast.warning("User Name is required");
    }

    if (!formData["FirstName"]) {
      formvalid = false;
      toast.warning("First Name is required");
    }

    if (!formData["LastName"]) {
      formvalid = false;
      toast.warning("Last Name is required");
    }
    if (!formData["RoleID"]) {
      formvalid = false;
      toast.warning("Role is required");
    }
    if (!formData["Status"]) {
      formvalid = false;
      toast.warning("Status is required");
    }
    if (!formData["Email"]) {
      formvalid = false;
      toast.warning("Email is required");
    }

    if (formData.Email.length > 0) {
      if (!validateEmail(formData.Email)) {

        toast.warning('Email ID is invalid');
        formvalid = false
      }
    }

    return formvalid
  }

  const validateEmail = (email: any) => {
    const re = new RegExp(/^(([^<>().,;:\s@"]+(.[^<>().,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z\-0-9]+.)+[a-zA-Z]{2,}))$/);
    return re.test(email);
  };


  // --------------------------list creation popup --------------------------------
  const add = (data: any) => {
    formData.FirstName = "";
    formData.LastName = "";
    formData.RoleID = '';
    formData.Status = '';
    formData.UserName = "";
    formData.Email = "";

    formData.PhoneNumber = "";
    formData.saveorUpdate = "create";

    setformData(formData);
    open();
  }


  // ---------------------------------------for create new list-------------------------

  const submitForm = () => {
    let roleArray: any = [];
    formData.PhoneNumber = (formData.PhoneNumber.toString()).replace(/[^0-9]/g, '')
    dataRoleList.forEach((element: any) => {
      if (element.roleId === formData.RoleID) {
        roleArray.push(element.roleId.toString())
      }
    });
    if (validateform()) {

      let data = {
        "firstName": formData.FirstName,
        "lastName": formData.LastName,
        "status": formData.Status,
        "RoleID": roleArray,
        "EmailID": formData.Email,
        "CreatedBy": "nn",
        "phone": formData.PhoneNumber
      }
      dispatch({
        type: CREATE_USER,
        payload: false,
      })
      //setLoading(true)

      dispatch(createUser(data));

    }
  }


  // ---------------------------------------for edit list data binding -------------------------

  const update = (data: any) => {

    console.log(data, "data")
    formData.FirstName = data.FirstName;
    formData.LastName = data.LastName;
    formData.UserName = data.EmailID;
    formData.RoleID = data.RoleId;
    formData.Status = data.statusLovId;
    formData.Email = data.EmailID;
    formData.PhoneNumber = data.PhoneNumber;
    formData.saveorUpdate = "update";
    formData.UserID = data.User_ID;
    formData.RecordVersion = data.RecordVersion

    setformData(formData);
    console.log(formData, "formData")

    open();
  }
  // ---------------------------------------for update list details  -------------------------

  const UpdateForm = () => {
    let roleArray: any = [];
    formData.PhoneNumber = (formData.PhoneNumber.toString()).replace(/[^0-9]/g, '')
    dataRoleList.forEach((element: any) => {
      if (element.roleId === formData.RoleID.toString()) {
        console.log("roleid")
        roleArray.push(element.roleId.toString())
      }
    });
    console.log(roleArray,"role")
    if (validateform()) {
      dispatch({
        type: UPDATE_USER,
        payload: false,
      })

      let data = {

        "User_ID": formData.UserID,
        "FirstName": formData.FirstName,
        "LastName": formData.LastName,
        "UserName": formData.UserName,
        "Status": formData.Status,
        "RoleID": roleArray,
        "Email": formData.Email,
        "PhoneNumber": formData.PhoneNumber,
        "ModifiedBy":'fa',
        "RecordVersion":formData.RecordVersion + 1
      }


      dispatch(updateUser(data));
      // setLoading(true)


    }

  }





  // --------------------------------------------grid events-----------------------------
  const actionComplete = () => {
    if (grid !== null && grid !== undefined) {
      sendingparam.PageSize = grid.pagerModule.pagerObj.pageSize.toString();
      sendingparam.PageNo = grid.pagerModule.pagerObj.currentPage.toString();
    }
    setsendingparam(sendingparam);

  }
  const actionBegin = (args: any) => {
  }


  const dataStateChange = (args: any) => {
    var type = args.action.requestType.toString();
    if (grid !== null && grid !== undefined) {
      sendingparam.PageSize = grid.pagerModule.pagerObj.pageSize.toString();
      sendingparam.PageNo = grid.pagerModule.pagerObj.currentPage.toString();
    }
    if (type !== "filterchoicerequest") {
      if ((args.sorted || []).length) {
        sendingparam.orderColumn = args.sorted[0].name;
        sendingparam.orderType = args.sorted[0].direction === "descending" ? "desc" : "asc";
      }
    }
    if (type === "filtering" && args.action.action !== "clearFilter") {
      sendingparam.field = args.action.currentFilterObject.field;

      sendingparam.matchCase = args.action.currentFilterObject.matchCase;
      let operator = args.action.currentFilterObject.operator;
      if (operator === "equal") {
        sendingparam.operator = "eq";
      }
      else if (operator === "notequal") {
        sendingparam.operator = "ne";
      }
      else if (operator === "greaterthan") {
        sendingparam.operator = "gt";
      }
      else if (operator === "lessthan") {
        sendingparam.operator = "lt";

      }
      else if (operator === "greaterthanorequal") {
        sendingparam.operator = "ge";

      }
      else if (operator === "lessthanorequal") {
        sendingparam.operator = "le";

      }
      else {
        sendingparam.operator = operator;
      }
      sendingparam.value = args.action.currentFilterObject.value;
    } else {
      if (type === "filtering" && args.action.action === "clearFilter") {
        sendingparam.field = "CategoryName";
        sendingparam.matchCase = false;
        sendingparam.operator = "startswith";
        sendingparam.value = "";
      }
    }
    setsendingparam(sendingparam);
    getUser();


  }
  const handleChange = (event: any) => {
    console.log(event.target.value)
    let form = { ...formData }
    form['Status'] = event.target.value;
    setformData(form);
  };

  const handleRoleChange = (event: any) => {
    console.log(event.target.value)
    // let array: any = [];
    // array.push(event.target.value.toString());
    let form = { ...formData }
    form['RoleID'] = event.target.value;
    setformData(form);
  };

  const handle = (e: any) => {
    formData['PhoneNumber'] = e;
    setformData(formData);
    console.log(e)
  }

  // -----------------------------------------rendering ui----------------------------------------------

  return (

    <AppAnimate animation='transition.slideUpIn' delay={200}>

      <Card className="Card">

        <Box>
          <Box component='h4' mb={3} fontSize={20}>
            User

            <Button style={{ textTransform: 'none', float: "right" }} variant="contained" color="primary" onClick={add}>Create User</Button>


          </Box>

          {/* --------------------------------------------------Table--------------------------------------- */}

          <Grid container >

            <GridComponent filterSettings={filterOptions}
              dataSource={data}
              style={{ marginTop: "5px" }}
              allowPaging={true}
              allowSorting={true}
              width='100%'
              allowFiltering={true}
              pageSettings={pageOptions}
              showColumnMenu={true}
              ref={g => grid = g}
              dataStateChange={(event: any) => dataStateChange(event)}
              actionBegin={(event: any) => actionBegin(event)}
              actionComplete={actionComplete} >

              <ColumnsDirective>
                <ColumnDirective width="50" headerText=" Name" field="Name" type="string" textAlign="Left" />
                <ColumnDirective width="50" headerText="User Name" field="EmailID" type="string" textAlign="Left" />
                <ColumnDirective width="50" headerText="Role Name" field="RoleName" type="string" textAlign="Left" />
                <ColumnDirective width="50" headerText="Status " field="statusLovName" type="string" textAlign="Left" />
                <ColumnDirective width="50" headerText="Phone Number" field="PhoneNumber" textAlign="Left" />
                <ColumnDirective width="50" headerText="Actions" textAlign="Center" template={(rowdata: any) =>
                  <span>
                    <IconButton name="edit" color="secondary" onClick={(event) => update(rowdata)}>
                      <EditIcon />
                    </IconButton>
                    {/* <IconButton className="text-red" color="secondary" onClick={() => opendeleteModal(rowdata)} >
                      <DeleteIcon />
                    </IconButton> */}
                  </span>}
                />

              </ColumnsDirective>

              <Inject services={[Page, Sort, Filter, ColumnMenu, ColumnChooser, Edit, CommandColumn]} />

            </GridComponent>

          </Grid>



          {/* ------------------------Dialog for company create update modal ---------------------------- */}


          <Dialog
            open={showDialog}
            maxWidth="xs"
          >
            {formData.saveorUpdate === "create" ?

              <DialogTitle> Create User</DialogTitle> : <DialogTitle id="simple-dialog-title"> Update User</DialogTitle>}
            <form  >
              <DialogContent dividers>
                <DialogContentText  >

                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>First Name <sup>*</sup></label>

                    </Grid >
                    <Grid item xs={7}>
                      < Input required type="text" name="First Name" style={{ marginTop: " 4px" }} value={formData.FirstName} onChange={(event) => { setformData({ ...formData, FirstName: event.target.value }) }} />
                    </Grid>

                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>Last Name <sup>*</sup></label>
                    </Grid>
                    <Grid item xs={7}>
                      <Input type="text" name="Last Name" style={{ marginTop: " 4px" }} value={formData.LastName} onChange={(event) => { setformData({ ...formData, LastName: event.target.value }) }} />
                    </Grid>
                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>Role <sup>*</sup></label>

                    </Grid >

                    <Grid item xs={7}>
                      <Grid item style={{ marginTop: " 4px", width: "112%", height: "40" }} >
                        <Select
                          // value={formData.RoleID}
                          className="form-control" variant="outlined" style={{ marginTop: " 4px" }} value={formData.RoleID} onChange={handleRoleChange}  >Role<sup></sup>

                          {dataRoleList !== null ? dataRoleList.map((optionSkill: any) => {
                            return (

                              <MenuItem key={optionSkill.roleId} value={optionSkill.roleId} >{optionSkill.roleName}</MenuItem>
                            )
                          }) : ""}

                        </Select>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>Status <sup>*</sup></label>
                    </Grid>
                    <Grid item xs={7}>
                      <Grid item style={{ marginTop: " 4px", width: "112%", height: "40" }} >
                        <Select
                          className="dialog-margin" variant="outlined" style={{ marginBottom: " 4px" }} value={formData.Status} onChange={handleChange}>Status <sup></sup>




                          {(dataStatusList !== null && dataStatusList !== undefined) ? dataStatusList.map((optionSkill: any) => {
                            return (

                              <MenuItem key={optionSkill.lovId} value={optionSkill.lovId} >{optionSkill.lovName}</MenuItem>
                            )
                          }) : " "}
                        </Select>

                      </Grid>
                    </Grid>

                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>UserName <sup>*</sup></label>
                    </Grid>
                    <Grid item xs={7}>

                      <Input type="text" name="UserName" style={{ marginTop: " 4px" }} value={formData.UserName} onChange={(event: any) => { setformData({ ...formData, UserName: event.target.value }) }} />
                    </Grid>
                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>Email <sup>*</sup></label>
                    </Grid>
                    <Grid item xs={7}>
                      <Input type="text" name="Email" style={{ marginTop: " 4px" }} value={formData.Email} onChange={(event: any) => { setformData({ ...formData, Email: event.target.value }) }} />
                    </Grid>

                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>Phone Number<sup>*</sup></label>
                    </Grid>
                    <Grid item xs={7}>
                      <MuiPhoneNumber className="number-margin" name="PhoneNumber" style={{ marginTop: " 4px" }} defaultCountry={"us"}
                        value={formData.PhoneNumber} onChange={handle}

                      />
                    </Grid>

                  </Grid>


                </DialogContentText>
              </DialogContent>

              {formData.saveorUpdate === "create" ?


                <DialogActions >

                  < Button type="button" onClick={submitForm} className="btn-xs" variant="contained" color="primary" >
                    Save & Close
                  </Button>
                  &nbsp;
                  <Button onClick={close} className="btn-xs" variant="contained" color="primary" autoFocus>
                    Cancel
                  </Button>

                </DialogActions>
                :
                <DialogActions >

                  < Button type="button" onClick={UpdateForm} className="btn-xs" variant="contained" color="primary" >
                    Update & Close
                  </Button>

                  <Button onClick={close} className="btn-xs" variant="contained" color="primary" autoFocus>
                    Cancel
                  </Button>

                </DialogActions>
              }
            </form>

          </Dialog>
        </Box>
        {/* ------------------------ for loading ---------------------------- */}

        {//loading?<div className="loader" style={{height: height-80}}>
          //  <Loader />
          //  </div>:null
        }
      </Card>
    </AppAnimate>
  );
};


export default User;