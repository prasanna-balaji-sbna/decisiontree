
import AppAnimate from "@crema/core/AppAnimate";
import { Box, Button, Card, Grid, IconButton } from "@material-ui/core";
import { ColumnChooser, ColumnDirective, ColumnsDirective, FilterSettingsModel } from '@syncfusion/ej2-react-grids';
import { Edit, Grid as SysGrid, CommandColumn, ColumnMenu, GridComponent, PageSettingsModel, Filter, Inject, Page, Sort } from '@syncfusion/ej2-react-grids';
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/store";
import { GetCategories, GetModules } from 'redux/actions/PostedProblems';
import { GetFAQ,CreateFAQ,UpdateFAQ } from 'redux/actions/Faq';
import { Loader } from "@crema";
import EditIcon from '@material-ui/icons/Edit';
import useWindowDimensions from "@crema/utility/Utils";
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import data1 from './../../ProblemsSolutions/data.json'
import { CREATE_FAQ, GET_FAQ, UPDATE_FAQ } from "types/actions/Faq.action";
import {  GET_CATEGORY, GET_MODULES } from "types/actions/ProblemsPosted.action";

toast.configure()


const Faq = () => {
    const [formData, setformData] = useState({
        FAQId: "",
        clicked: true,
        SelectedModule: '',
        SelectedCategory: '',
        question: '',
        answer: '',
        create: "create",
        RecordVersion: 1,
        disable: true,
    });
    const [sendingparam, setsendingparam] = useState({
        orderColumn: 'ProblemName',
        orderType: 'asc',
        PageNo: '1',
        PageSize: '20',
        userId: '',
        field: 'ProblemName',
        value: '',
        matchCase: false,
        operator: 'startswith'
    })
    const { height } = useWindowDimensions();


    var grid: SysGrid | null;   
    var data: any;
    const [loading, setloading] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [modules, setmodules] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showDialog, setShowDialog] = useState(false);

    const {  getmodulesdata, getcategoriesdata } = useSelector<AppState, AppState['postedProblems']>(
        ({ postedProblems }) => postedProblems,
    );
    const {  getFaqdata,createFaqdata,updateFaqdata } = useSelector<AppState, AppState['faq']>(
        ({ faq }) => faq,
    );
    const dispatch = useDispatch(); 
    const filterOptions: FilterSettingsModel = { type: 'Menu' };
    const pageOptions: PageSettingsModel = { pageSizes: ["20", "50", "100", "250"], pageSize: 20 };

    const open = () => { setShowDialog(true); }
    const close = () => { setShowDialog(false); }
    //   -----------useEffect -----------------------
    useEffect(() => {
        {
            if (global.configData === undefined) {
                axios.get("./config.json").then((res: any) => {
                    global.configData = res.data;
                    dispatch(GetModules());
                    setloading(true)
                })
            }
            else {
                dispatch(GetModules());
                setloading(true)

            }
        }
    }, [dispatch]);

  


    const getAllFAQ = () => {
        dispatch({
            type: GET_FAQ,
            payload: null,
        });
        let data = {
            // PageNo: sendingparam.PageNo,
            // PageSize: sendingparam.PageSize,
            // OrderColumn: sendingparam.orderColumn,
            // OrderType: sendingparam.orderType,
            // FieldName: sendingparam.field,
            // FieldValue: sendingparam.value,
            // Operator: sendingparam.operator,
            ModuleId: formData.SelectedModule,
            CategoryId: formData.SelectedCategory
            //Type: sendingparam.type,
        }
        dispatch(GetFAQ(data));
        setloading(true)
    }

    if (getFaqdata !== null) {
        setTimeout(() => {

            if (grid !== null && grid !== undefined) {
                grid.dataSource = {
                    result: getFaqdata,
                }
                formData.disable = false;
                setformData(formData);
              
                if (createFaqdata === null && updateFaqdata === null ) {
                    setloading(false)
                }


            }
        });
    }
    if(getmodulesdata !== null){
        setmodules(getmodulesdata)
        dispatch({
            type: GET_MODULES,
            payload: null,
        });
        setloading(false)
    }
    if(getcategoriesdata !== null ){
        console.log(getcategoriesdata)
        console.log('2')
        setCategories(getcategoriesdata)
        dispatch({
            type: GET_CATEGORY,
            payload: null,
        });
        setloading(false)
    }
    if (createFaqdata) {
        dispatch({
          type: CREATE_FAQ,
          payload: null,
        });
        setLoading(false)
        getAllFAQ()
        close();
      }
      if (updateFaqdata) {
        dispatch({
          type: UPDATE_FAQ,
          payload: null,
        });
        setLoading(false)
        getAllFAQ()
        close();
      }

    const handleDropdown = (event: any) => {
        const getModuleId = event.target.value;
        let formdata = { ...formData };
        formdata['SelectedModule'] = event.target.value;
        setformData(formdata);
        console.log(formdata['SelectedModule'], "moduleId");
      
        dispatch(GetCategories(getModuleId));
        setloading(true)

    }

    const handleChange = (event: any) => {
        dispatch({
            type: GET_CATEGORY,
            payload: null
        });
        formData.SelectedCategory = event.target.value;
        setformData(formData);
        getAllFAQ()
        // if (event.target.value) {
        //     formData.disable = false;
        //     setformData(formData);
        // }

    }
    // --------------------------FAQ creation popup --------------------------------

    const add = (data: any) => {
        formData.question = "";
        formData.answer = "";
        formData.FAQId = "";
        formData.create = "create";
        formData.RecordVersion = 1;
        setformData(formData);
        open();
    }


    // ---------------------------------------to validate the input form values-------------------

    const validateform = () => {
        let formvalid = true;
        if (!formData["question"]) {
            formvalid = false;
            toast.warning("Question is required");
        }

        if (!formData["answer"]) {
            formvalid = false;
            toast.warning("Answer is required");
        }

        return formvalid;
    }

    const submitForm = () => {

        if (validateform()) {
            let data = {
                "FaqID": 0,
                "ModuleId": formData.SelectedModule,
                "CategoryId": formData.SelectedCategory,
                "Question": formData.question,
                "Answer": formData.answer,
                "ModifiedBy":localStorage.getItem("username"),
                "RecordVersion": formData.RecordVersion
            }

            console.log(data)
             dispatch(CreateFAQ(data));
             setLoading(true)

        }
    }

    // ---------------------------------------for edit FAQ data binding -------------------------

    const update = (rowdata: any) => {
        formData.FAQId = rowdata.FaqID;
        formData.SelectedModule = rowdata.ModuleId;
        formData.SelectedCategory = rowdata.CategoryId;
        formData.question = rowdata.Question;
        formData.answer = rowdata.Answer;
        formData.RecordVersion = rowdata.RecordVersion;
        formData.create = "update";
        setformData(formData)

        open();
    }

    const updateForm = () => {

        if (validateform()) {
            let data = {
                "FaqID": formData.FAQId,
                "ModuleId": formData.SelectedModule,
                "CategoryId": formData.SelectedCategory,
                "Question": formData.question,
                "Answer": formData.answer,
                "ModifiedBy":localStorage.getItem("username"),
                "RecordVersion": formData.RecordVersion + 1
            }

            console.log(data)
             dispatch(UpdateFAQ(data));
             setLoading(true)

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
                sendingparam.field = "ListName";
                sendingparam.matchCase = false;
                sendingparam.operator = "startswith";
                sendingparam.value = "";
            }
        }
        setsendingparam(sendingparam);
        getAllFAQ();


    }



    return (
        <AppAnimate animation='transition.slideUpIn' delay={200}>

            <Card className="Card">

                <Box>
                    <Grid container style={{ marginBottom: '5px',marginTop: '10px' }}>

                        <Grid item lg={5} xs={2} sm={2} md={5} >
                            <Box component='h4' mb={3} fontSize={20}>
                                FAQs
                            </Box>
                        </Grid>
                        <Grid className="griditem" item lg={3} xs={3} sm={4} md={3} >

                            <select className="form-control" onChange={(event) => handleDropdown(event)}>
                                <option>Select Module</option>
                                {modules !== null ?
                                    modules.map((selectvalue: any) => {
                                        return (
                                            <option key={selectvalue.moduleId} value={selectvalue.moduleId}>{selectvalue.moduleName}</option>
                                        )
                                    })
                                    : ""}

                            </select>

                        </Grid>
                        <Grid className="griditem" item lg={3} xs={3} sm={4} md={3} >

                            <select  className="form-control" onChange={(event) => handleChange(event)} >
                                <option>Select Category</option>
                                {categories !== null ? categories.map((selectcategoryvalue: any) => {
                                    return (
                                        <option key={selectcategoryvalue.CatagoryID} value={selectcategoryvalue.CatagoryID}>{selectcategoryvalue.catagoryName}</option>
                                    )
                                }) : ""}
                            </select>
                        </Grid>



                        {/* <Grid className="griditem" item lg={1} xs={12} sm={12} md={1} >


                            <Button onClick={() => getAllFAQ()} variant="contained" className="float-right" color="primary">Apply</Button>
                        </Grid> */}
                        <Grid className="griditem" item lg={1} xs={1} sm={2} md={1} >


                            <Button onClick={add} disabled={formData.disable} variant="contained" color="primary">Add FAQs</Button>
                        </Grid>

                    </Grid>


                    {/* --------------------------------------------------Table--------------------------------------- */}

                    <Grid container >
                        <Grid lg={12} item>
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
                                    <ColumnDirective headerText="Questions" field="Question" width="100" />
                                    <ColumnDirective headerText="Answers" field="Answer" width="100" />
                                    <ColumnDirective width="100" headerText="Actions" textAlign="Center"
                                     template={(rowdata: any) =>
                                            <IconButton name="edit" color="primary" onClick={()=>update(rowdata)}>
                                                <EditIcon />
                                            </IconButton>
                                    }
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
                            {formData.create === "create" ?

                                <DialogTitle> Create FAQs</DialogTitle> : <DialogTitle id="simple-dialog-title"> Update List</DialogTitle>}
                            <form  >
                                <DialogContent dividers>
                                    <DialogContentText  >

                                        <Grid container spacing={1}>
                                            <Grid item xs={4}>
                                                <label className="modal-label" style={{ marginBottom: " 4px" }}>Question<sup>*</sup></label>

                                            </Grid >
                                            <Grid item xs={8}>
                                                <textarea className="text-class" value={formData.question} onChange={(event) => { setformData({ ...formData, question: event.target.value }) }}></textarea>
                                            </Grid>

                                            <Grid item xs={4}>
                                                <label className="modal-label" style={{ marginBottom: " 4px" }}>Answer<sup>*</sup></label>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <textarea className="text-class" value={formData.answer} onChange={(event) => { setformData({ ...formData, answer: event.target.value }) }}></textarea>

                                            </Grid>


                                        </Grid>

                                    </DialogContentText>
                                </DialogContent>


                                <DialogActions >
                                    {formData.create === "create" ?
                                        < Button type="button" onClick={submitForm} className="btn-xs" variant="contained" color="primary" >
                                            Save & Close
                                        </Button>
                                        :
                                        < Button type="button" onClick={updateForm} className="btn-xs" variant="contained" color="primary" >
                                            Update & Close
                                        </Button>
                                    }
                                    &nbsp;
                                    <Button onClick={close} className="btn-xs" variant="contained" color="primary" autoFocus>
                                        Cancel
                                    </Button>

                                </DialogActions>

                            </form>
                            {Loading ? <div className="Loader" style={{ height: height }}>
                            <Loader />
                        </div> : null}  
                        </Dialog>

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
export default Faq;