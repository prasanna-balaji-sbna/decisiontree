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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Input } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { Loader } from '@crema';
//import useWindowDimensions from '@crema/utility/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/store';
import { GetList, CreateList, UpdateList, DeleteList } from 'redux/actions/list';
import { CREATE_LIST, UPDATE_LIST, DELETE_LIST } from 'types/actions/list.action';
import { GET_LIST } from 'types/actions/list.action';
import axios from 'axios';
toast.configure()

const List = () => {

  var grid: SysGrid | null;
  var data: any;
  // --------------------------------------------All States----------------------------------------------
  const [ListData, setListData] = useState({
    listId: 0,
    ListName: "",
    ListCode: "",
    CreatedBy: "",
    CreatedIP: "",
    RecordVersion: 1,
    create: "create"

  })


  const dispatch = useDispatch();
  const [getId, setgetId] = useState({});
  const [openDelete, setopenDelete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const filterOptions: FilterSettingsModel = { type: 'Menu' };
  const pageOptions: PageSettingsModel = { pageSizes: ["20", "50", "100", "250"], pageSize: 20 };
  //const { height } = useWindowDimensions();  
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

  // --------------------------------------------use effect ----------------------------------------------

  useEffect(() => {
    
      if (global.configData === undefined) {
        axios.get("./config.json").then(res => {
          global.configData = res.data;

          getList();
        })
      }
      else {
        getList();
      }
    
  }// eslint-disable-next-line react-hooks/exhaustive-deps
    , [dispatch]);
  const { getlistdata, createlistdata, updatelistdata, deletelistdata } = useSelector<AppState, AppState['list']>(
    ({ list }) => list,
  );

  if (getlistdata !== null) {

    setTimeout(() => {

      if (grid !== null && grid !== undefined) {
        grid.dataSource = {
          result: getlistdata,
          //count: getlistdata.length,
        }

        if (createlistdata === null && updatelistdata === null && deletelistdata === null) {
          //setLoading(false);
        }

      }
    });
  }

  // --------------------------------------------for get all list ----------------------------------------------

  const getList = () => {


    dispatch({
      type: GET_LIST,
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


    dispatch(GetList(data))
    // setLoading(true)


  }

  if (createlistdata) {
    dispatch({
      type: CREATE_LIST,
      payload: null,
    });
    getList();
    setShowDialog(false);

  }
  if (updatelistdata) {
    dispatch({
      type: UPDATE_LIST,
      payload: null,
    });
    getList();
    setShowDialog(false);

  }
  if (deletelistdata) {
    dispatch({
      type: DELETE_LIST,
      payload: null,
    });
    getList();
  }

  //      const Listdata=
  //        [
  //          {
  // //"ListCode":"WES",
  //         //  "ListName":"AWS"
  //          }
  //        ]


  // ----------------------------------------to open and close modal----------------------------

  const opendeleteModal = (data: any) => {
    setgetId(data.listId);
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

    if (!ListData["ListName"]) {
      formvalid = false;
      toast.warning("List Name is required");
    }

    if (!ListData["ListCode"]) {
      formvalid = false;
      toast.warning("List Code is required");
    }

    return formvalid;
  }
  // --------------------------list creation popup --------------------------------

  const add = (data: any) => {
    ListData.ListName = "";
    ListData.listId = 0;
    ListData.ListCode = "";
    ListData.CreatedBy = "";
    ListData.CreatedIP = "";
    ListData.create = "create";

    setListData(ListData);
    open();
  }

  // ---------------------------------------for create new list-------------------------

  const submitForm = () => {

    if (validateform()) {

      let data = {
        "ListName": ListData.ListName,
        "ListCode": ListData.ListCode,
        "CreatedBy": localStorage.getItem("UserId"),
        "CreatedIP": "1",
        "RecordVersion": ListData.RecordVersion,
      }
      dispatch({
        type: CREATE_LIST,
        payload: false,
      })
      // setLoading(true)

      dispatch(CreateList(data));

    }
  }

  // ---------------------------------------for edit list data binding -------------------------

  const update = (data: any) => {
    ListData.listId = data.listId;
    ListData.ListName = data.listName;
    ListData.ListCode = data.listCode;
    ListData.RecordVersion = data.RecordVersion;
    ListData.create = "update";
    setListData(ListData);
    open();
  }
  // ---------------------------------------for update list details  -------------------------

  const UpdateForm = () => {
    if (validateform()) {
      dispatch({
        type: UPDATE_LIST,
        payload: false,
      })

      let data = {

        "listId": ListData.listId,
        "ListName": ListData.ListName,
        "ListCode": ListData.ListCode,
        "ModifiedBy": 1,
        "ModifiedIP": "1",
        "RecordVersion": ListData.RecordVersion,
      }


      dispatch(UpdateList(data));
      //setLoading(true)


    }

  }

  // ---------------------------------------for delete list  -------------------------


  const deleteRecord = () => {
    let data = {

      listId: getId,
    }
    dispatch({
      type: DELETE_LIST,
      payload: false,
    })
    //setLoading(true)

    dispatch(DeleteList(data));
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
    getList();


  }




  // -----------------------------------------rendering ui----------------------------------------------

  return (

    <AppAnimate animation='transition.slideUpIn' delay={200}>

      <Card className="Card">

        <Box>
          <Box component='h4' mb={3} fontSize={20}>
            List

            <Button style={{ textTransform: 'none', float: "right" }} variant="contained" color="primary" onClick={add}>Add List</Button>


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
                <ColumnDirective width="50" headerText="List Name" field="listName" type="string" textAlign="Left" />
                <ColumnDirective width="50" headerText="List Code" field="listCode" type="string" textAlign="Left" />
                <ColumnDirective width="50" headerText="Actions" textAlign="Center" template={(rowdata: any) =>
                  <span>

                    <span>
                      <IconButton name="edit" color="secondary" onClick={() => update(rowdata)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton className="text-red" color="secondary" onClick={() => opendeleteModal(rowdata)} >
                        <DeleteIcon />
                      </IconButton>
                    </span>

                  </span>
                }
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
            {ListData.create === "create" ?

              <DialogTitle> Create List</DialogTitle> : <DialogTitle id="simple-dialog-title"> Update List</DialogTitle>}
            <form  >
              <DialogContent dividers>
                <DialogContentText  >

                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>List Name <sup>*</sup></label>

                    </Grid >
                    <Grid item xs={7}>
                      < Input required type="text" name="List Name" style={{ marginTop: " 4px" }} value={ListData.ListName} onChange={(event) => { setListData({ ...ListData, ListName: event.target.value }) }} />
                    </Grid>

                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>List Code <sup>*</sup></label>
                    </Grid>
                    <Grid item xs={7}>
                      <Input type="text" name="List Code" style={{ marginTop: " 4px" }} value={ListData.ListCode} onChange={(event) => { setListData({ ...ListData, ListCode: event.target.value }) }} />
                    </Grid>


                  </Grid>

                </DialogContentText>
              </DialogContent>

              {ListData.create === "create" ?


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
          //          <Loader />
          //    </div>:null
        }
      </Card>
    </AppAnimate>
  );
};


export default List;
