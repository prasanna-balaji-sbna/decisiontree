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
import Switch from '@material-ui/core/Switch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import { Loader } from '@crema';
//import useWindowDimensions from '@crema/utility/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/store';
import { GetCategory, GetModule, CreateCategory, CategoryEnable, UpdateCategory, DeleteCategory } from 'redux/actions/catagory';
import { CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, CATEGORY_ENABLE } from 'types/actions/Category.action';
import { GET_CATEGORY } from 'types/actions/Category.action';


toast.configure()

const Catagory = () => {

  var grid: SysGrid | null;
  // let data:object[] | undefined;

  //  any=[
  //   {
  //     "CatagoryID": 13,
  //     "catagoryName": "CATEGOR@",
  //     "catagoryDesc": "CATEGOR",
  //     "active": true,
  //     "bgColor": "CATEGOR",
  //     "color": "CATEGOR",
  //     "moduleId": 3,
  //     "RecordVersion": 1
  // },
  // {
  //     "CatagoryID": 12,
  //     "catagoryName": "Category2",
  //     "catagoryDesc": "Category2",
  //     "active": true,
  //     "bgColor": "Category21",
  //     "color": "Category2",
  //     "moduleId": 3,
  //     "RecordVersion": 2
  
  // }];
  // --------------------------------------------All States----------------------------------------------
  const [formData, setformData] = useState({
    moduleId: "",
    catagoryId: 0,
    catagoryName: "",
    catagoryDesc: "",
    active: true,
    CreatedBy: "",
    RecordVersion: 1,
    saveOrUpdate: "Create",
    color: "",
    bgColor: "",
    selectedModule: ''

  })


  const dispatch = useDispatch();
  const filterOptions: FilterSettingsModel = { type: 'Menu' };
  //const [loading, setLoading] = useState(true);
  const [getId, setgetId] = useState({});
  const [openDelete, setopenDelete] = useState(false);
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
    dispatch(GetModule())
  }
    , [dispatch]);
  const { getcatagorydata, getmoduledata, createcategorydata, updatecategorydata, deletecategorydata } = useSelector<AppState, AppState['category']>(
    ({ category }) => category,
  );
  // const { getmodulesdata } = useSelector<AppState, AppState['postedProblems']>(
  //   ({ postedProblems }) => postedProblems,
  // );
  if (getcatagorydata !== null) {
    console.log("getcategry", getcatagorydata)
    setTimeout(() => {
      if (grid !== null && grid !== undefined) {
        // data = getcatagorydata;
        grid.dataSource = {
          result: getcatagorydata,
          // count: getcatagorydata.length,
        }
        if (createcategorydata === null && updatecategorydata === null && deletecategorydata === null) {
          // setLoading(false);
        }
      }
    });
  }

  // --------------------------------------------for get all list ----------------------------------------------

  const getcategory = (moduleid: any) => {


    dispatch({
      type: GET_CATEGORY,
      payload: null,
    });
    console.log("testing")
    // let data = {
    //   PageNo: sendingparam.PageNo,
    //   PageSize: sendingparam.PageSize,
    //   OrderColumn: sendingparam.orderColumn,
    //   OrderType: sendingparam.orderType,
    //   FieldName: sendingparam.field,
    //   FieldValue: sendingparam.value,
    //   Operator: sendingparam.operator,
    //   ModuleId: moduleid
    //   //Type: sendingparam.type,
    // }
    let data = {
      moduleId: moduleid
    }
    dispatch(GetCategory(data))
    // setLoading(true)



  }
  // ----------------------------------------to open and close modal----------------------------

  const opendeleteModal = (data: any) => {
    setgetId(data.CatagoryID);
    setopenDelete(true);
  }
  const closeDeleteModal = () => {
    setopenDelete(false);
  }
  const open = () => { setShowDialog(true); }
  const close = () => { setShowDialog(false); }




  if (createcategorydata) {
    console.log("created")
    dispatch({
      type: CREATE_CATEGORY,
      payload: null,
    });
    getcategory(formData.selectedModule);
    close();

  }
  if (updatecategorydata) {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: null,
    });
    getcategory(formData.selectedModule);
    close();


  }
  if (deletecategorydata) {
    console.log("deleted")
    dispatch({
      type: DELETE_CATEGORY,
      payload: null,
    });
    getcategory(formData.selectedModule);
  }
  // const Catagorydata=
  // [
  //   {
  //   //   "catagoryName":"AWS",
  //   //   "catagoryDesc":"amazonwbservice",
  //   //   "color":"red",
  //   //   "bgcolor":"pink"

  //  }
  // ]





  // ---------------------------------------to validate the input form values-------------------

  const validateform = () => {

    let formvalid = true;

    if (!formData["catagoryName"]) {
      formvalid = false;
      toast.warning("Catagory Name is required");
    }

    if (!formData["catagoryDesc"]) {
      formvalid = false;
      toast.warning("Catagory Description is required");
    }

    if (!formData["active"]) {
      formvalid = false;
      toast.warning("Active is required");
    }
    if (!formData["color"]) {
      formvalid = false;
      toast.warning("Color is required");
    }
    if (!formData["bgColor"]) {
      formvalid = false;
      toast.warning("Background Color is required");
    }

    return formvalid;
  }
  // --------------------------list creation popup --------------------------------

  const add = (data: any) => {
    formData.catagoryName = "";
    formData.catagoryDesc = "";
    //  formData.catagoryId = 0;
    formData.color = "";
    formData.active = true;
    formData.bgColor = "";
    formData.saveOrUpdate = "create";

    setformData(formData);
    open();
  }
  const active = (e: any, rowData: any) => {
    dispatch({
      type: CATEGORY_ENABLE,
      payload: false,
    });
    let data = {
      "CatagoryId": rowData.catagoryId,
      "catagoryName": rowData.catagoryName,
      "ModifiedBy": 1,
      "active": e.target.checked,
      "RecordVersion": formData.RecordVersion + 1,

    }
    dispatch(CategoryEnable(data));

  }


  // ---------------------------------------for create new list-------------------------

  const submitForm = () => {

    if (validateform()) {

      let data = {
        "catagoryName": formData.catagoryName,
        "catagoryDesc": formData.catagoryDesc,
        "color": formData.color,
        "active": true,
        "bgColor": formData.bgColor,
        "CreatedBy": localStorage.getItem("userId"),
        "moduleId": formData.selectedModule
      }
      dispatch({
        type: CREATE_CATEGORY,
        payload: false,
      })
      /// setLoading(true)

      dispatch(CreateCategory(data));

    }
  }


  // ---------------------------------------for edit list data binding -------------------------

  const update = (data: any) => {
    formData.catagoryId = data.CatagoryID;
    formData.catagoryName = data.catagoryName;
    formData.catagoryDesc = data.catagoryDesc;
    formData.color = data.color;
    formData.active = true;
    formData.bgColor = data.bgColor;
    formData.RecordVersion = data.RecordVersion;
    formData.saveOrUpdate = "update";
    formData.selectedModule = data.moduleId;
    setformData(formData);
    open();
  }
  // ---------------------------------------for update list details  -------------------------

  const UpdateForm = () => {
    if (validateform()) {
      dispatch({
        type: UPDATE_CATEGORY,
        payload: false,
      })

      let data = {

        "CatagoryId": formData.catagoryId,
        "catagoryName": formData.catagoryName,
        "catagoryDesc": formData.catagoryDesc,
        "color": formData.color,
        "active": formData.active,
        "ModifiedBy": 1,
        "RecordVersion": formData.RecordVersion,
        "bgColor": formData.bgColor,
        "moduleId": formData.selectedModule,
        // "RecordVersion":2

      }


      dispatch(UpdateCategory(data));
      // setLoading(true)


    }

  }

  // ---------------------------------------for delete list  -------------------------


  const deleteRecord = () => {
    let data = {
      CatagoryID: getId,
    }
    dispatch({
      type: DELETE_CATEGORY,
      payload: false,
    })
    //setLoading(true)

    dispatch(DeleteCategory(data));
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
        sendingparam.field = "CategoryName";
        sendingparam.matchCase = false;
        sendingparam.operator = "startswith";
        sendingparam.value = "";
      }
    }
    setsendingparam(sendingparam);
    getcategory(formData.selectedModule);
    // getCat();

  }



  const handleDropdown = (event: any) => {
    console.log(event, "moduleId");
    // const getModuleId = event.target.value;
    let formdata = { ...formData };
    formdata['selectedModule'] = event.target.value;
    setformData(formdata);
    console.log(formdata['selectedModule'], "moduleId");



  }
  const getCat = () => {
    let formdata = { ...formData };
    let data = {
      moduleId: formdata['selectedModule']
    }
    console.log(data, "data")
    dispatch(GetCategory(data));
  }

  // -----------------------------------------rendering ui----------------------------------------------

  return (

    <AppAnimate animation='transition.slideUpIn' delay={200}>

      <Card className="Card">

        <Box>
          <Box component='h4' mb={3} fontSize={20}>
            <Grid container style={{ marginBottom: '5px' }}>

              <Grid item lg={6} xs={12} sm={6} md={6} >
                Category
              </Grid>
              <Grid item lg={3} xs={12} sm={6} md={3} >

                <select className="form-control" value={formData.selectedModule} onChange={(event) => handleDropdown(event)}>
                  <option>Select Module</option>
                  {getmoduledata !== null ?
                    getmoduledata.map((selectvalue: any) => {
                      return (
                        <option key={selectvalue.moduleId} value={selectvalue.moduleId}>{selectvalue.moduleName}</option>
                      )
                    })
                    : ""}

                </select>
              </Grid>
              <Grid item lg={1} xs={12} sm={6} md={1} >
                <Button style={{ textTransform: 'none' }} variant="contained" color="primary" onClick={getCat}>Apply</Button>
              </Grid>
              <Grid item lg={2} xs={12} sm={6} md={2} >
                <Button style={{ textTransform: 'none' }} variant="contained" color="primary" onClick={add}>Add Category</Button>
              </Grid>
            </Grid>
          </Box>

          {/* --------------------------------------------------Table--------------------------------------- */}

          <Grid container >

            <GridComponent filterSettings={filterOptions}
              // dataSource={data}
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
                <ColumnDirective width="50" headerText="Catagory Name" field="catagoryName" type="string" textAlign="Left" />
                <ColumnDirective width="50" headerText="Catagory Desc" field="catagoryDesc" type="string" textAlign="Left" />

                <ColumnDirective width="50" headerText="Color" field="color" type="string" textAlign="Left" />

                <ColumnDirective width="50" headerText="BgColor" field="bgColor" type="string" textAlign="Left" />

                <ColumnDirective width='50' headerText="Active" field="active" textAlign="Left"
                  template={(rowdata: any) =>
                    <span>
                      <Switch
                        checked={rowdata.active === 'true' || rowdata.active}
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
            {formData.saveOrUpdate === "create" ?

              <DialogTitle> Create Category</DialogTitle> : <DialogTitle id="simple-dialog-title"> Update Category</DialogTitle>}
            <form  >
              <DialogContent dividers>
                <DialogContentText  >

                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>Category Name <sup>*</sup></label>

                    </Grid >
                    <Grid item xs={7}>
                      < Input required type="text" name="Category Name" style={{ marginTop: " 4px" }} value={formData.catagoryName} onChange={(event) => { setformData({ ...formData, catagoryName: event.target.value }) }} />
                    </Grid>

                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>Category Desc <sup>*</sup></label>
                    </Grid>
                    <Grid item xs={7}>
                      <Input type="text" name="Category Desc" style={{ marginTop: " 4px" }} value={formData.catagoryDesc} onChange={(event) => { setformData({ ...formData, catagoryDesc: event.target.value }) }} />
                    </Grid>
                    <Grid item xs={4}>
                      <label className="modal-label">Active <span className="model-label">*</span></label>&nbsp;

                    </Grid>
                    <Grid item xs={7}>
                      <Switch
                        checked={formData.active}
                        onChange={(event) => { setformData({ ...formData, active: event.target.checked }) }}

                        color="primary"
                        name="active"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />

                    </Grid>

                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>Color <sup>*</sup></label>
                    </Grid>
                    <Grid item xs={7}>
                      <Input type="text" name="color" style={{ marginTop: " 4px" }} value={formData.color} onChange={(event: any) => { setformData({ ...formData, color: event.target.value }) }} />
                    </Grid>
                    <Grid item xs={4}>
                      <label className="modal-label" style={{ marginBottom: " 4px" }}>bgColor <sup>*</sup></label>
                    </Grid>
                    <Grid item xs={7}>

                      <Input type="text" name="bgColor" style={{ marginTop: " 4px" }} value={formData.bgColor} onChange={(event: any) => { setformData({ ...formData, bgColor: event.target.value }) }} />
                    </Grid>



                  </Grid>

                </DialogContentText>
              </DialogContent>

              {formData.saveOrUpdate === "create" ?


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
          // <Loader />
          //    </div>:null
        }
      </Card>
    </AppAnimate>
  );
};


export default Catagory;