import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { Card, IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import AppAnimate from '../../@crema/core/AppAnimate';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ColumnChooser, ColumnDirective, ColumnsDirective, FilterSettingsModel } from '@syncfusion/ej2-react-grids';
import { Edit, Grid as SysGrid, CommandColumn, ColumnMenu, GridComponent, PageSettingsModel, Filter, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';
import Grid from '@material-ui/core/Grid';

import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Input } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { Loader } from '@crema';
//import useWindowDimensions from '@crema/utility/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/store';
import { GetAllModule, CreateModule, ModuleEnable, UpdateModule, DeleteModule } from 'redux/actions/Module';
import { GETALL_MODULE, MODULE_ENABLE, CREATE_MODULE, DELETE_MODULE, UPDATE_MODULE } from 'types/actions/Module.action';

import axios from 'axios';
toast.configure()

const Module = () => {

  var grid: SysGrid | null;
  //var data:any;
  // --------------------------------------------All States----------------------------------------------
  const [ModuleData, setModuleData] = useState({
    moduleId: 0,
    moduleName: "",
    color: "",
    bgColor: "",
    active: false,
    CreatedBy: "",
    RecordVersion: 1,
    saveorUpdate: "create"

  })


  const dispatch = useDispatch();
  const filterOptions: FilterSettingsModel = { type: 'Menu' };
  // const [loading, setLoading] = useState(true);
  const [getId, setgetId] = useState({});
  const [openDelete, setopenDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const pageOptions: PageSettingsModel = { pageSizes: ["20", "50", "100", "250"], pageSize: 20 };
  // const { height } = useWindowDimensions();  
  const [sendingparam, setsendingparam] = useState({
    orderColumn: 'ListName',
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
  const { getallmoduledata, createmoduledata, updatemoduledata, deletemoduledata } = useSelector<AppState, AppState['module']>(
    ({ module }) => module,
  );
  // --------------------------------------------use effect ----------------------------------------------

  useEffect(() => {
    
      if (global.configData === undefined) {
        axios.get("./config.json").then(res => {
          global.configData = res.data;
          getAllModule();
        })
      }
      else {
        getAllModule();
      }
    
  }// eslint-disable-next-line react-hooks/exhaustive-deps
    , [dispatch]);


  if (getallmoduledata !== null) {

    setTimeout(() => {

      if (grid !== null && grid !== undefined) {
        grid.dataSource = {
          result: getallmoduledata,
          // count: getallmoduledata.length,
        }

        if (createmoduledata === null && updatemoduledata === null && deletemoduledata === null) {
          // setLoading(false);
        }

      }
    });
  }

  // --------------------------------------------for get all list ----------------------------------------------

  const getAllModule = () => {


    dispatch({
      type: GETALL_MODULE,
      payload: null,
    });
    let data = {
      PageNo: sendingparam.PageNo,
      PageSize: sendingparam.PageSize,
      OrderColumn: sendingparam.orderColumn,
      OrderType: sendingparam.orderType,
      FieldName: sendingparam.field,
      FieldValue: sendingparam.value,
      Operator: sendingparam.operator,
      //Type: sendingparam.type,
    }


    dispatch(GetAllModule(data))
    // setLoading(true)


  }

  if (createmoduledata) {
    dispatch({
      type: CREATE_MODULE,
      payload: null,
    });
    getAllModule();
    setShowDialog(false);

  }
  if (updatemoduledata) {
    dispatch({
      type: UPDATE_MODULE,
      payload: null,
    });
    getAllModule();
    setShowDialog(false);

  }
  if (deletemoduledata) {
    dispatch({
      type: DELETE_MODULE,
      payload: null,
    });
    getAllModule();
  }

  const Moduledata =
    [
      {
        //  "moduleName":"AWS",
        //   "moduleId":"45",
        //   "active":"",
        //   "color":"red",
        //  "bgColor":"White"
      }
    ]


  // ----------------------------------------to open and close modal----------------------------

  const opendeleteModal = (data: any) => {
    setgetId(data.moduleId);
    setopenDelete(true);
  }
  const closeDeleteModal = () => {
    setopenDelete(false);
  }
  const open = () => { setShowDialog(true); }
  const close = () => { setShowDialog(false); }


  // ---------------------------------------to validate the input form values-------------------

  const validateform = () => {

    let formvalid = true;

    if (!ModuleData["moduleName"]) {
      formvalid = false;
      toast.warning("Module Name is required");
    }

    if (!ModuleData["color"]) {
      formvalid = false;
      toast.warning("Color is required");
    }
    if (!ModuleData["bgColor"]) {
      formvalid = false;
      toast.warning("bgColor is required");
    }



    return formvalid;
  }
  // --------------------------list creation popup --------------------------------

  const add = (data: any) => {
    ModuleData.moduleName = "";
    ModuleData.moduleId = 0;
    ModuleData.color = "";
    ModuleData.active = false;
    ModuleData.bgColor = "";
    ModuleData.saveorUpdate = "create";

    setModuleData(ModuleData);
    open();
  }
  const active = (e: any, rowData: any) => {
    dispatch({
      type: MODULE_ENABLE,
      payload: false,
    });
    let data = {
      "moduleId": rowData.moduleId,
      "ModifiedBy": 1,
      "active": e.target.checked,
      "RecordVersion": ModuleData.RecordVersion + 1,

    }
    dispatch(ModuleEnable(data));

  }

  // ---------------------------------------for create new list-------------------------

  const submitForm = () => {

    if (validateform()) {

      let data = {
        "moduleName": ModuleData.moduleName,
        "moduleId": ModuleData.moduleId,
        "color": ModuleData.color,
        "bgColor": ModuleData.bgColor,
        "active": true,
        "CreatedBy": localStorage.getItem("UserId")
      }
      dispatch({
        type: CREATE_MODULE,
        payload: false,
      })
      // setLoading(true)

      dispatch(CreateModule(data));

    }
  }

  // ---------------------------------------for edit list data binding -------------------------

  const update = (data: any) => {
    console.log(data,"updating data")
    ModuleData.moduleId = data.moduleId;
    ModuleData.moduleName = data.moduleName;
    ModuleData.active = data.Active;
    ModuleData.color = data.color;
    ModuleData.bgColor = data.bgColor;
    ModuleData.RecordVersion = data.RecordVersion;
    ModuleData.saveorUpdate = "update";
    setModuleData(ModuleData);
    open();
  }
  // ---------------------------------------for update list details  -------------------------

  const UpdateForm = () => {
    if (validateform()) {
      dispatch({
        type: UPDATE_MODULE,
        payload: false,
      })

      let data = {

        "moduleName": ModuleData.moduleName,
        "moduleId": ModuleData.moduleId,
        "color": ModuleData.color,
        "bgColor": ModuleData.bgColor,
        "active": ModuleData.active,
        "ModifiedBy": 1,
        "RecordVersion": ModuleData.RecordVersion,

      }


      dispatch(UpdateModule(data));
      // setLoading(true)


    }

  }

  // ---------------------------------------for delete list  -------------------------


  const deleteRecord = () => {

    let data = {

      ModuleID: getId
    }
    dispatch({
      type: DELETE_MODULE,
      payload: false,
    })
    //  setLoading(true)

    dispatch(DeleteModule(data));
    closeDeleteModal();


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
        sendingparam.field = "ListName";
        sendingparam.matchCase = false;
        sendingparam.operator = "startswith";
        sendingparam.value = "";
      }
    }
    setsendingparam(sendingparam);
    getAllModule();


  }




  // -----------------------------------------rendering ui----------------------------------------------

  return (

    <AppAnimate animation='transition.slideUpIn' delay={200}>

      <Card className="Card">

        <Box>
          <Box component='h4' mb={3} fontSize={20}>
            Module

            <Button style={{ textTransform: 'none', float: "right" }} variant="contained" color="primary" onClick={add}>Add Module</Button>


          </Box>

          {/* --------------------------------------------------Table--------------------------------------- */}

          <Grid container >

            <GridComponent filterSettings={filterOptions}
              dataSource={Moduledata}
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
                <ColumnDirective width="50" headerText="Module Name" field="moduleName" type="string" textAlign="Left" />
                {/* <ColumnDirective width="50" headerText="Module Id" field="moduleId" type="integer" textAlign="Left" /> */}
                <ColumnDirective width="50" headerText="Color" field="color" type="string" textAlign="Left" />
                <ColumnDirective width="50" headerText="Background" field="bgColor" type="string" textAlign="Left" />
                <ColumnDirective headerText="Active" field="active" width='50'
                  template={(rowdata: any) =>
                    <span>
                      <Switch
                        checked={rowdata.Active === 'true' || rowdata.Active}
                        onChange={(e) => active(e, rowdata)}
                        color="primary"
                        name="active"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />

                    </span>
                  } />


                <ColumnDirective width="50" headerText="Actions" textAlign="Center" template={(rowdata: any) =>
                  <span>
                    <IconButton name="edit" color="secondary" onClick={(event) => update(rowdata)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton className="text-red" color="secondary" onClick={() => opendeleteModal(rowdata)} >
                      <DeleteIcon />
                    </IconButton>
                  </span>}
                />

              </ColumnsDirective>

              <Inject services={[Page, Sort, Filter, ColumnMenu, ColumnChooser, Edit, CommandColumn]} />

            </GridComponent>

          </Grid>

          {/* ------------------------Dialog for list delete modal ---------------------------- */}

          <Dialog open={openDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle >Delete  </DialogTitle>
            <DialogContent dividers>
              <DialogContentText id="alert-dialog-description">
                <h4 >Are you sure you want to delete record?</h4>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={deleteRecord} color="primary">Yes</Button>
              <Button variant="contained" onClick={closeDeleteModal} color="primary">No </Button>
            </DialogActions>
          </Dialog>

          {/* ------------------------Dialog for company create update modal ---------------------------- */}


          <Dialog
            open={showDialog}
            maxWidth="xs"
          >
            {ModuleData.saveorUpdate === "create" ?

              <DialogTitle> Create Module</DialogTitle> : <DialogTitle id="simple-dialog-title"> Update Module</DialogTitle>}
            <form  >
              <DialogContent dividers>
                <DialogContentText  >

                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>Module Name <sup>*</sup></label>

                    </Grid >
                    <Grid item xs={7}>
                      < Input required type="text" name="Module Name" style={{ marginTop: " 4px" }} value={ModuleData.moduleName} onChange={(event) => { setModuleData({ ...ModuleData, moduleName: event.target.value }) }} />
                    </Grid>
                    <Grid item xs={4}>
                      <label className="modal-label">Active <span className="model-label">*</span></label>&nbsp;
                    </Grid>
                    <Grid item xs={7}>
                      <Switch
                        checked={ModuleData.active}
                        onChange={(event) => { setModuleData({ ...ModuleData, active: event.target.checked }) }}

                        color="primary"
                        name="active"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />

                    </Grid>

                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>Color <sup>*</sup></label>
                    </Grid>
                    <Grid item xs={7}>
                      <Input type="text" name="Color" style={{ marginTop: " 4px" }} value={ModuleData.color} onChange={(event: any) => { setModuleData({ ...ModuleData, color: event.target.value }) }} />
                    </Grid>
                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>bgcolor <sup>*</sup></label>
                    </Grid>
                    <Grid item xs={7}>

                      <Input type="text" name="bgcolor" style={{ marginTop: " 4px" }} value={ModuleData.bgColor} onChange={(event: any) => { setModuleData({ ...ModuleData, bgColor: event.target.value }) }} />
                    </Grid>


                  </Grid>

                </DialogContentText>
              </DialogContent>

              {ModuleData.saveorUpdate === "create" ?


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
          //</div>:null
        }
      </Card>
    </AppAnimate>
  );
};


export default Module;
