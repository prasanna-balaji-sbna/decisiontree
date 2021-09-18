
import AppAnimate from "@crema/core/AppAnimate";
import { Box, Button, Card, Grid, IconButton, Tooltip } from "@material-ui/core";
import { ColumnChooser, ColumnDirective, ColumnsDirective, FilterSettingsModel } from '@syncfusion/ej2-react-grids';
import { Edit, Grid as SysGrid, CommandColumn, ColumnMenu, GridComponent, PageSettingsModel, Filter, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/store";
import PublishIcon from '@material-ui/icons/Publish';
import { GetCategories, GetModules, GetProblemsByCatMod, UploadFile } from 'redux/actions/PostedProblems';
import { Loader } from "@crema";
import { GET_ALL_PROBS } from "types/actions/ProblemsPosted.action";
import useWindowDimensions from "@crema/utility/Utils";
// import GetSolution from './getsolution';
import axios from "axios";
import data1 from '././../data.json';
import { useHistory } from "react-router-dom";
const ProblemsPosted = () => {
  const [formData, setformData] = useState({
    problemID: "",
    categoryId: "",
    moduleId: "",
    userId: "",
    clicked: true,
    SelectedModule: '',
    encoded: "",
    SelectedCategory: ''
  });
  const [sendingparam, setsendingparam] = useState({
    orderColumn: 'ProblemName',
    orderType: 'asc',
    PageNo: '1',
    PageSize: '20',
    userId: '',
    field: 'ProblemName',
    value: '',
    //type: 'string',
    matchCase: false,
    operator: 'startswith'
  })
  const { height } = useWindowDimensions();


  var grid: SysGrid | null;
  var data: any;
  const history = useHistory();
  const [loading, setloading] = useState(false);
  // const [module, setModuleDrpDwn] = useState([]);

  const { uploadFile, getpostedproblemsbyIdsdata, getmodulesdata, getcategoriesdata } = useSelector<AppState, AppState['postedProblems']>(
    ({ postedProblems }) => postedProblems,
  );
  //,
  // const formatOption: object = { type: 'date', format: 'MM/dd/yyy HH:mm:ss' };
  const dispatch = useDispatch();
  const filterOptions: FilterSettingsModel = { type: 'Menu' };
  const pageOptions: PageSettingsModel = { pageSizes: ["20", "50", "100", "250"], pageSize: 20 };
  //   -----------useEffect 
  useEffect(() => {
    {
      if (global.configData === undefined) {
        axios.get("./config.json").then((res: any) => {
          global.configData = res.data;
          moduleDropdown();
          // getAllLov(0)
        })
      }
      else {
        moduleDropdown();
        // getAllLov(0)
      }
    }

    // selectedProblem()
    // dispatch(GetAllProblems());
    console.log(getmodulesdata, "geat")
    console.log(data, "geat")

    // if (sessionStorage.getItem("selectedCategory") !== null && sessionStorage.getItem("selectedModule") !== null) {
    //     //applyvalues()
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [dispatch]);
  // const selectedProblem = () => {
  // dispatch(GetAllProblems());
  // }
  if (getpostedproblemsbyIdsdata !== null) {

    setTimeout(() => {

      if (grid !== null && grid !== undefined) {
        grid.dataSource = {
          result: getpostedproblemsbyIdsdata,
          // count: getpostedproblemsbyIdsdata.Count,
        }
        if (uploadFile === null) {
          setloading(false);
        }


      }
    });
  }

  const applyvalues = () => {
    dispatch({
      type: GET_ALL_PROBS,
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
      ModuleId: formData.SelectedModule,
      CategoryId: formData.SelectedCategory
      //Type: sendingparam.type,
    }


    dispatch(GetProblemsByCatMod(data));

  }

  const moduleDropdown = () => {
    dispatch(GetModules());
    // if(getmodulesdata !== null )
    // {
    //   setModuleDrpDwn(getmodulesdata);
    // }

  }
  const UploadNewFile = (e: any,formdata:any) => {

    var file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file)

    reader.onload = () => {
      if (reader.result !== null) {
        formData['encoded'] = (reader.result as string).split(',')[1];

      }
      setformData(formData);
      let data = {

        "ProblemID": formdata.problemId,
        "ModuleId": formdata.moduleId,
        "CategoryId": formdata.categoryId,
        "UserId": formData.userId,
        "xml": formData.encoded
      }

      dispatch(UploadFile(data))
    }
  }
  // let selectedProblemID;
  const rowdata = (rowData: any) => {
    console.log(rowData)
    // selectedProblemID = rowData;
  }
  const handleDropdown = (event: any) => {
    console.log(event, "moduleId");
    const getModuleId = event.target.value;
    let formdata = { ...formData };
    formdata['SelectedModule'] = event.target.value;
    setformData(formdata);
    console.log(formdata['SelectedModule'], "moduleId");

    dispatch(GetCategories(getModuleId));

  }
  const getsolutionpath = (data: any) => {

    formData.problemID = '544607';
    formData.moduleId = data.moduleId;
    formData.categoryId = data.categoryId;
    formData.userId = data.UserId;
    let form = { ...formData }
    form['clicked'] = false;
    setformData(formData)
    setformData(form)
    console.log(formData, "form2")
    history.push('/ProblemsSolutions/getSolution');
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
    applyvalues();


  }

  // const closesolutinmodeal = () => {
  //   let form = { ...formData }
  //   form['clicked'] = true;
  //   setformData(form)
  // }

  return (
    <AppAnimate animation='transition.slideUpIn' delay={200}>

      <Card className="Card">
      
      {/* <div className="mxgraph" style={{maxWidth:'100%',border:'1px solid transparent'}} data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2021-08-27T05:24:10.461Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36\&quot; etag=\&quot;vhw5EV5RFLa1H2V9Pfnj\&quot; version=\&quot;14.9.9\&quot;&gt;&lt;diagram id=\&quot;ZR9A-_AfrFqPBfW6rys_\&quot; name=\&quot;Page-1\&quot;&gt;5Vldb9MwFP01leChUhInpXuk3caHQEJMMF7dxE0Mjm9wnDbdr+c6cdKkTdsNsbGCVK32vfa1fe45/uhGZJ6WbxTNko8QMTHynKgckcuR500nU/xrDJva4AdObYgVj2qTuzXc8DtmjU2zgkcs7zXUAELzrG8MQUoW6p6NKgXrfrMliP6oGY3ZnuEmpGLfessjndhlNasw9reMx0kzsutYT0qbxtaQJzSCdcdErkZkrgB0XUrLORMGuwaXut/1AW87McWkvk+HVx/ff/dL+W199+Xr/PZ9OS2dd2MbZUVFYRc88iYC480WWIhNIaW5ZgprNM2wKhe5+Wqa4XhtS7tOvWnAU1DIiJnxHXSvE67ZTUZD410jW9CW6FRgzW17d9fTTI4pzcqOya7vDYOUabXBJtZLfIu1JdvUVtfbzLkTa0s6WWts1JIlbiNv8cSChfQB8L4agHcHIxYh32wVlE4gBknF1dY666O4bfMBILPYfWdab6x4aKHhnsjmUKiQHZm/na6mKmb6NI3MWo7mSTFBNV/1tfXHUfdOkzpiKyYQvnNktXvxt2k9OXNak3vS2ntWtCanaX3NqC4Ue540nvRpTNwBGntPSePgzGnsn+Xu7J+mcQJ6yUu89j1HHruT05eMJ6XxdA/QT5/3UMLF6T4UVPBYYjlEKPB+R2YGAo4339fWkfIoqinOcn5HF1Uog3EGXOpqFcFsFFyaWMjqvCa4CZ1rBT/YHARg3EsJkv2hLeQi6EE/hD0ZgN57LOgv/lvo3eAvQ9+cHv8D9s7OBXDg5Hxa7A8/G/OMyl4KJj8L88KdhTUsr805Ey9e4NTwg8M7ndJLUzSQ4Ttd6vGSplxs6j7tTX3kEeKblDKxYiZxe55+kDo/JoTrZeWOr56lcUpQKRV999piafx+Pc/KKfA8Z2qMSw25jAf7G96NLdWM27Kt5+Z4bEkb3ulMrXJqRWW+xKBNeCRT02ANKuqP3u2+oOGPuDoUxzuYe/60xdrzL7bloIN8xPNMUIs6l4J3Bl4KoLo7oSa5zeH8FqnmOfN380vDeZ4x273IzLrAGBVERag5GJYwueIKZGpgwJFZJmBTV9pzv+bTgaPfqvvxz/yA7CjQGVDg0BOMPJoEDz9yHyBBqz8rvmHlbYV2UFTHFHVYTqe0dExIh1V0XEJH9HMf8bTKaWVzUDODgqmU8mDNRGx1zmLxnGBfLO6TimX/6XwNZjcWEFabtv05qIbT5DapkiKhzcy/eK/YTRQh+7uaN5So37hYYHX7U3fl6/y/gFz9Ag==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/typescript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script> */}
        <Box>
          <Grid container style={{ marginBottom: '5px' }}>

            <Grid item lg={3} xs={12} sm={6} md={3} >
              <Box component='h4' mb={3} fontSize={20}>
                Posted Problems
              </Box>
            </Grid>
            <Grid className="griditem" item lg={3} xs={12} sm={12} md={3} >

              <select className="form-control" onChange={(event) => handleDropdown(event)}>
                <option>Select Module</option>
                {getmodulesdata !== null ?
                  getmodulesdata.map((selectvalue: any) => {
                    return (
                      <option key={selectvalue.moduleId} value={selectvalue.moduleId}>{selectvalue.moduleName}</option>
                    )
                  })
                  : ""}

              </select>

            </Grid>
            <Grid className="griditem" item lg={3} xs={12} sm={12} md={3} >

              <select className="form-control" onChange={(event) => { setformData({ ...formData, SelectedCategory: event.target.value }) }} >
                <option>Select Category</option>
                {getcategoriesdata !== null ? getcategoriesdata.map((selectcategoryvalue: any) => {
                  return (
                    <option key={selectcategoryvalue.CatagoryID} value={selectcategoryvalue.CatagoryID}>{selectcategoryvalue.catagoryName}</option>
                  )
                }) : ""}
              </select>
            </Grid>
            {/*            
              <Grid className="griditem" item lg={3} xs={12} sm={12} md={3} >

            <label style={{ fontStyle: 'italic' }}><b>Note:  </b>Select a module to view category</label>
          </Grid> */}

            <Grid className="griditem" item lg={3} xs={12} sm={12} md={3} >


              <Button onClick={() => applyvalues()} variant="contained" className="float-right" color="primary">Apply</Button>
            </Grid>

          </Grid>


          {/* --------------------------------------------------Table--------------------------------------- */}

          <Grid container >
            <Grid lg={12} item>
              <GridComponent filterSettings={filterOptions}
                dataSource={data1}
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
                  <ColumnDirective headerText="Problem Name" field="problemName" width="100" />
                  <ColumnDirective headerText="Problem Description" field="ProblemDescription" width="100" />
                  {/* <ColumnDirective width="150" headerText="Posted On" field="CreatedDatetime" type="Date" format={formatOption} textAlign="Left" /> */}
                  <ColumnDirective width="100" headerText="Actions" textAlign="Center" template={(rowData: any) =>
                    <span>
                      <Button variant="contained" color="primary" onClick={() => getsolutionpath(rowData)}>Get the solution</Button>
                      {/* &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; */}

              
                         <input
                                    accept="file/*"
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={(e: any) => UploadNewFile(e,rowData)}
                                         hidden={true}

                                />
                      <label htmlFor="contained-button-file">
                        <Tooltip title="upload a file" placement="right">

                          <IconButton onClick={() => rowdata('544607')} component="span"><PublishIcon /></IconButton>
                        </Tooltip>
                      </label>
                    </span>}
                  />

                </ColumnsDirective>

                <Inject services={[Page, Sort, Filter, ColumnMenu, ColumnChooser, Edit, CommandColumn]} />

              </GridComponent>
            </Grid>

            {/* </Box> */}

            {/* {!formData.clicked ?
              <Grid item lg={12} md={12}>
                <div style={{ marginTop: '15px' }} >
                  <Card  >
                    <div style={{ float: 'right' }}>
                      <Button onClick={closesolutinmodeal} style={{ width: 'fit-content' }} color="primary">
                        <i style={{ fontSize: 'medium' }} className="zmdi zmdi-close"></i>
                      </Button>
                    </div>
                    <GetSolution problemID={'739324'} />
                  
                  </Card >
                </div>
              </Grid> : <div></div>
            } */}


            {/* ------------------------ for loading ---------------------------- */}
          </Grid>
        </Box>
        {loading ? <div className="loader" style={{ height: height - 80 }}>
          <Loader />
        </div> : null}

      </Card>
    </AppAnimate>


  )

}
export default ProblemsPosted;