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
import { Edit, CommandColumn, Grid as SysGrid, ColumnMenu, GridComponent, PageSettingsModel, Filter, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Input } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import useWindowDimensions from '@crema/utility/Utils';
//import Loader from '@crema/core/Loader';
import { createLov, deleteLov, getAllList, getLov, updateLov } from 'redux/actions/Lov';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/store';
import { CREATE_LOV, DELETE_LOV , GET_LOV, UPDATE_LOV } from 'types/actions/Lov.action';
import axios from 'axios';
//import { getFID } from 'web-vitals';

toast.configure()

const Lov = () => {
  var grid: SysGrid | null;
  var data: any;
  // -------------------------------------------- All States ----------------------------------------------

  const [LovData, setLovData] = useState({
    ListID: 1,
    lovId: 1,
    LovName: "",
    LovCode: "",
    LovValue: "",
    orderBy: "",
    CreatedBy: "",
    CreatedIP: "",
    RecordVersion: 1,
    create: "create"

  })

  
  //const [loading, setLoading] = useState(true);
  const [getId, setgetId] = useState({})

  const [showDialog, setShowDialog] = useState(false);
  const [openDelete, setopenDelete] = useState(false);
  const pageOptions: PageSettingsModel = { pageSizes: ["20", "50", "100", "250"], pageSize: 20 };
  const [sendingparam, setsendingparam] = useState({
    orderColumn: 'LovName',
    orderType: 'asc',
    PageNo: '1',
    PageSize: '20',
    userId: '',
    field: 'LovName',
    value: '',
    type: 'string',
    matchCase: false,
    operator: 'startswith'
  })
  // ---------------------------------------setting options------------------------

  const filterOptions: FilterSettingsModel = { type: 'Menu' };
  //const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const {  dataAllList,dataLov, dataDelete, dataUpdate, dataCreate } = useSelector<AppState, AppState['lov']>(
    ({ lov }) => lov,
  );
  const closeDeleteModal = () => {
    setopenDelete(false);
  }
  const close = () => setShowDialog(false);

  //-------------------------------------------use effect-------------------------------

  useEffect(() => {
  //if(localStorage.getItem("UserId")!=null)
  
    if(global.configData===undefined){
      axios.get("./config.json").then(res => {
          global.configData = res.data;
          getList()
          // getAllLov(0)
        })
  }
  else{
    getList()
    // getAllLov(0)
  }
  
  }                     // eslint-disable-next-line react-hooks/exhaustive-deps
    , [dispatch]);

  //----------------------------------for get all list in dropdown----------------------------------
  const getList = () => {
   
    dispatch(getAllList()) 
    //setLoading(false) 

  }
  if (dataLov !== null) {
    setTimeout(() => {
      if (grid !== null && grid !== undefined) {
        grid.dataSource = {
          result: dataLov,
          //count: dataLov.Count
        }

        if ( dataDelete === null && dataUpdate === null && dataCreate === null) {
         //setLoading(false)
        }
      }
    });
  }
 
  // if(dataAllList.length>0){
  //   setTimeout(() => {
  //     if(dataLov === null){
  //       console.log("m")
  //       setLoading(false)
  //     }
  //   })
  // }
  
 
 
  //-----------------------------------To get value all list of values--------------------------------

  const getAllLov =   (id: any) => {
   
    dispatch({
      type: GET_LOV,
      payload: null,
    });
    var data = {
      PageNo: sendingparam.PageNo,
      PageSize: sendingparam.PageSize,
      id: id,
      OrderColumn: sendingparam.orderColumn,
      OrderType: sendingparam.orderType,
      FieldName: sendingparam.field,
      FieldValue: sendingparam.value,
      // type: sendingparam.type,
      Operator: sendingparam.operator
    };
    
    dispatch(getLov(data))
    //setLoading(true)

  }

  if (dataCreate) {
    dispatch({
      type: CREATE_LOV,
      payload: null,
    });
    getAllLov(LovData.ListID);
    close();
  }
  if (dataUpdate) {
    dispatch({
      type: UPDATE_LOV,
      payload: null,
    });
    getAllLov(LovData.ListID);
    close();
  }
  if (dataDelete) {
    dispatch({
      type: DELETE_LOV,
      payload: null,
    });
    getAllLov(LovData.ListID);
    closeDeleteModal();
  }
  // const Lovdata=
  // [
  //   {
  //     // "LovCode":"222",
  //     // "LovName":"DES",
  //     // "LovValue":"22",
  //     // "OrderNumber":"2"
  //   }
  // ]

 

  //-----------------------------------To handle the change values in dropdown--------------------------
  const selectChange = (selectedOption: any) => {
     LovData.ListID=selectedOption.currentTarget.value;
      setLovData(LovData);
      
       
    //setLoading(true)

    getAllLov(selectedOption.target.value)
  }

  //-----------------------------------To validate the input form values--------------------------------
  const validateForm = () => {

    let formIsValid = true;
    let value = { ...LovData };

    if (!LovData.LovCode) {
      formIsValid = false;
      toast.warning('Lov Code is required');
      setLovData({ ...LovData });
    }


    if (!LovData.LovName) {
      formIsValid = false;
      toast.warning('Lov Name is required');
      setLovData({ ...LovData });
    }

    if (!LovData.orderBy) {
      formIsValid = false;
      toast.warning('Order By is required');
      setLovData({ ...LovData });
    }
    if (LovData['orderBy']) {
      let pattern = new RegExp(/^[0-9]/);
      if (!pattern.test(value["orderBy"])) {
        formIsValid = false;
        toast.error('Order By is not valid');
      }
    }

    return formIsValid;
  }

  // --------------------------List of values creation popup --------------------------------
  const add = () => {
    LovData.LovName = "";
    LovData.ListID=1;
    LovData.LovCode = "";
    LovData.LovValue = "";
    LovData.orderBy = "";
    LovData.create = "create";
    setLovData(LovData);
    open();
  }
  //----------------------------------------To create new list of values----------------------
  const submitForm = () => {
    
    if (validateForm()) {

      const data = {
        "ListID": LovData.ListID,
        "LovName": LovData.LovName,
        "LovCode": LovData.LovCode,
        "LovValue": LovData.LovValue,
        "OrderNumber": LovData.orderBy,
        "CreatedBy": localStorage.getItem("UserId"),
        "CreatedIP": "1",
        "RecordVersion": LovData.RecordVersion,
      }
      dispatch({
        type: CREATE_LOV,
        payload: false,
    })
   // setLoading(true)

      dispatch(createLov(data))
    }
  }
  //---------------------------------------for edit List of values data binding------------------------------
  const update = (data: any) => {
   console.log(data,"test")
    LovData.lovId = data.ID;
    LovData.ListID = data.ListID;

    LovData.LovName = data.LovName;
    LovData.LovCode = data.LovCode;
    LovData.LovValue = data.LovValue;
    LovData.orderBy = data.OrderNumber;
    LovData.RecordVersion = data.RecordVersion;
    LovData.create = "update";

    setLovData(LovData);
    open();
  }
  //------------------------------------------------To update List of values-----------------------
  const UpdateForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      let data = {
        "lovId": LovData.lovId,
        "ListID": LovData.ListID,
        "LovName": LovData.LovName,
        "LovCode": LovData.LovCode,
        "LovValue": LovData.LovValue,
        "OrderNumber": LovData.orderBy,
        "ModifiedBy": localStorage.getItem("UserId"),
        "ModifiedIP": "1",
        "RecordVersion": LovData.RecordVersion + 1,
      }
      dispatch({
        type: UPDATE_LOV,
        payload: false,
    })
    //setLoading(true)

      dispatch(updateLov(data))

    }
  }

  //----------------------------------------To delete the List of value record---------------------------------
  const deleteRecord = () => {
    console.log(getId,"lov")
    var data = {
      
      LovID: getId
    };
    dispatch({
      type: DELETE_LOV,
      payload: false,
  })
  //setLoading(true)

    dispatch(deleteLov(data))
    closeDeleteModal();

  }

  //----------------------------------------To open and close modal-------------------------------

  const opendeleteModal = (data: any) => {
   console.log(data,"id")
    setgetId(data.ID);
    LovData.ListID = data.ListID;
    setLovData(LovData);
    setopenDelete(true);
  }



  //------------------------------------------To open  the dialog-------------------------
  const open = () => setShowDialog(true);

  // --------------------------------------------grid events-----------------------------
  const actionComplete = () => {
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
        sendingparam.field = "LovName";
        sendingparam.matchCase = false;
        sendingparam.operator = "startswith";
        sendingparam.value = "";
      }
    }
    setsendingparam(sendingparam);
    getAllLov(LovData.ListID);


  }


  // -----------------------------------------rendering ui----------------------------------------------
  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>
      <Card className="Card">

        <Box>
          <Box component='h4' mb={3} fontSize={20}>
            Lov
                    <Button style={{ textTransform: 'none', float: "right" }} variant="contained" color="primary" onClick={add}>Add List of Values</Button>

            <select style={{ marginRight: "10px", float: "right" }} className="form-control col-lg-5" onChange={selectChange}>

              <option > Select List</option>
              {dataAllList.map((optionSkill: any) => {

                return (
                  <option key={optionSkill.listId} value={optionSkill.listId}>{optionSkill.listName}</option>
                )
              })
              }
            </select>


          </Box>

          {/* --------------------------------------------------Table--------------------------------------- */}
          <Grid container >

            <GridComponent filterSettings={filterOptions}
              dataSource={data}
              style={{ marginTop: "5px" }}
              allowPaging={true}
              allowSorting={true}
              width='100%' allowFiltering={true}
              pageSettings={pageOptions}
              showColumnMenu={true}
              ref={g => grid = g}
              dataStateChange={(event: any) => dataStateChange(event)}
              actionBegin={(event: any) => actionBegin(event)}
              actionComplete={actionComplete}>

              <ColumnsDirective>
                <ColumnDirective width="30" headerText="Lov Name" field="LovName" type="string" textAlign="Left" />
                <ColumnDirective width="30" headerText="Lov Code" field="LovCode" type="string" textAlign="Left" />

                <ColumnDirective width="30" headerText="Lov Value" field="LovValue" type="string" textAlign="Left" />

                <ColumnDirective width="30" headerText="Order By" field="OrderNumber" type="number" textAlign="Left" />
                <ColumnDirective width="30" headerText="Actions" textAlign="Center" template={(rowdata: any) =>
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
          {/* ------------------------Dialog for List of values delete modal---------------------------- */}
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



          {/* ------------------------Dialog for List of values create,update modal ---------------------------- */}

          <Dialog
            open={showDialog}
            maxWidth="xs"
          >

            {LovData.create === "create" ?
              <DialogTitle>Create Lov</DialogTitle>
              : <DialogTitle id="simple-dialog-title">Update Lov</DialogTitle>}
            <form>
            <DialogContent dividers>
              <DialogContentText  >

                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <label className="modal-label" style={{ marginBottom: " 4px" }}>Lov Name <sup>*</sup></label>

                  </Grid >
                  <Grid item xs={7}>
                    < Input required type="text" name="Lov Name" style={{ marginTop: " 4px" }} value={LovData.LovName} onChange={(event) => { setLovData({ ...LovData, LovName: event.target.value }) }} />
                  </Grid>

                  <Grid item xs={4}>
                    <label className="modal-label" style={{ marginBottom: " 4px" }}>Lov Code <sup>*</sup></label>
                  </Grid>
                  <Grid item xs={7}>
                    <Input type="text" name="Lov Code" style={{ marginTop: " 4px" }} value={LovData.LovCode} onChange={(event) => { setLovData({ ...LovData, LovCode: event.target.value}) }} />
                  </Grid>
                  <Grid item xs={4}>
                    <label className="modal-label" style={{ marginBottom: " 4px" }}>Lov Value</label>
                  </Grid>
                  <Grid item xs={7}>
                    <Input type="text" name="Lov Value" style={{ marginTop: " 4px" }} value={LovData.LovValue} onChange={(event) => { setLovData({ ...LovData, LovValue: event.target.value }) }} />
                  </Grid>
                  <Grid item xs={4}>
                    <label className="modal-label" style={{ marginBottom: " 4px" }}>Order By <sup>*</sup></label>
                  </Grid>
                  <Grid item xs={7}>
                    <Input type="text" name="Order By" style={{ marginTop: " 4px" }} value={LovData.orderBy} onChange={(event) => { setLovData({ ...LovData, orderBy: event.target.value }) }} />
                  </Grid>


                </Grid>

              </DialogContentText>


            
            </DialogContent>
              {LovData.create === "create" ?

                <DialogActions>
                    <Button className="btn-xs" variant="contained" onClick={submitForm} color="primary" >
                      Save & Close
  </Button>
&nbsp;
  <Button onClick={close} className="btn-xs" variant="contained" color="primary" autoFocus>
                      Cancel
  </Button>
                
                </DialogActions>
                :
                <DialogActions >
               
                    <Button onClick={UpdateForm} className="btn-xs" variant="contained" color="primary" >
                      Update & Close
  </Button>
 &nbsp;
  <Button onClick={close} className="btn-xs" variant="contained" color="primary" autoFocus>
                      Cancel
  </Button>
                 
                </DialogActions>
              }  
 </form>

          </Dialog>
        </Box>

           {/* ------------------------ for loading ---------------------------- */}

        {//loading ? <div className="loader" style={{ height: height - 80 }}>
          //<Loader />
        //</div> : null
      }
      </Card>
    </AppAnimate>
  );
};


export default Lov;
