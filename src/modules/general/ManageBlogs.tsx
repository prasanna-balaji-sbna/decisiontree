
import Box from '@material-ui/core/Box';
import { Card, CardActionArea, CardContent, IconButton } from '@material-ui/core'
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
import { Input } from 'reactstrap';
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import Fab from "@material-ui/core/Fab";
import Cookies from 'universal-cookie';
// import { useDispatch,useSelector } from 'react-redux';
// import { AppState } from 'redux/store';
// import { getAllList } from 'redux/actions/Lov';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';

// import { AppState } from 'react-native';
// import Select from '@material-ui/core/Select';
const ManageBlogs = () => {
    var grid: SysGrid | null;
    var data: any;
    const cookie = new Cookies();

    const filterOptions: FilterSettingsModel = { type: 'Menu' };
    const pageOptions: PageSettingsModel = { pageSizes: ["20", "50", "100", "250"], pageSize: 20 };

    // --------------------------------------------All States----------------------------------------------
    const [BlogData, setBlogData] = useState({
        BlogId: 0,
        BlogName: "",
        profileImage: null as any,
        ImageName: "",
        ImageType: "",
        CreatedBy: "",
        CreatedDT: new Date(),
        create: "create",
        mainState: "initial",
        selectedFile: null as any,
        filesize: '',
        fileType: '',
        DO: false

    })
    const [sendingparam, setsendingparam] = useState({
        orderColumn: 'ImageName',
        orderType: 'asc',
        PageNo: '1',
        PageSize: '20',
        userId: '',
        field: 'ImageName',
        value: '',
        //type: 'string',
        matchCase: false,
        operator: 'startswith'
    })
    // const [getId, setgetId] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    // --------------------------------------------dispatch -------------------------------------
    // const dispatch = useDispatch();

    //   ---------------------------------get dispatch data------------------------------
    // if (getAllBlogs !== null) {
    //     setTimeout(() => {
    //         if (grid !== null && grid !== undefined) {
    //             grid.dataSource = {
    //                 result: getAllBlogs,
    //                 //count: dataLov.Count
    //             }

    //             if (deleteBlog === null && saveOrUpdateBlog === null) {
    //                 //setLoading(false)
    //             }
    //         }
    //     });

    // }

    // -------------------------------------------useEffect------------------
    useEffect(() => {
        if (global.configData === undefined) {
            axios.get("./config.json").then((res: any) => {
                global.configData = res.data;
            });
        }
        else {

        }

    }, [])
    // ----------------------------------------to open and close modal----------------------------



    const open = () => {
        setShowDialog(true);
        cookie.set('data', 'dummy');
        console.log(cookie.get('data'));
    }

    const close = () => { setShowDialog(false); }



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
        // getList();


    }




    const handleUploadClick = (event: any) => {
        console.log(event);
        var file = event.target.files[0];

        console.log(file);

        var reader:any = new FileReader();
        reader.readAsDataURL(file);
        let state = { ...BlogData };
        state['ImageName'] = event.target.files[0].name;
        state['ImageType'] = event.target.files[0].type;

        reader.onload = (e: any) => {
            state['profileImage'] = reader.result.split(',')[1];
        } 
        console.log( state['profileImage']); // Would see a path?
        state['mainState'] = "uploaded";
        console.log(state['profileImage'], "imagePAth")
        setBlogData(state);

    };
    const handleUploadFile = (event: any) => {
        var file = event.target.files[0];


        var reader: any = new FileReader();
        reader.readAsDataURL(file);

        BlogData.filesize = (event.target.files[0].size / 1024 / 1024).toFixed(2) + "MB";
        BlogData.fileType = event.target.files[0].type;
        reader.onload = () => {
            BlogData.selectedFile = reader.result.split(',')[1];
        }
        setBlogData(BlogData);
        console.log(BlogData.selectedFile)

    };
    //  //-----------------------------------To validate the input form values--------------------------------
    const validateForm = () => {

        let formIsValid = true;

        if (!BlogData.BlogName) {
            formIsValid = false;
            toast.warning('Blog Name is required');
            setBlogData({ ...BlogData });
        }
        if (BlogData.profileImage === null) {
            formIsValid = false;
            toast.warning('Profile image is required');
            setBlogData({ ...BlogData });
        }
       
        if (BlogData.selectedFile === null) {
            formIsValid = false;
            toast.warning('File is required');
            setBlogData({ ...BlogData });
        }
      

        return formIsValid;
    }


    const add = () => {
        console.log(BlogData)
        BlogData.BlogName = "";
        BlogData.profileImage = null;
        BlogData.ImageName = "";
        BlogData.ImageType = "";
        BlogData.selectedFile = null;
        BlogData.filesize = "";
        BlogData.fileType = "";
        BlogData.CreatedBy = "";
        setBlogData(BlogData);
        open();
    }

    // --------------------------------Save Blog---------------------------------

    const submitForm = () => {

        // BlogData.ImageName =  BlogData.ImageName.split('.')[0]

        if (validateForm()) {
            const data = {
                "BlogName": BlogData.BlogName,
                "file": BlogData.selectedFile,
                "filesize": BlogData.filesize,
                "profileImage": BlogData.profileImage,
                "profileImageName": BlogData.ImageName,
                "createdBy": localStorage.getItem("username"),
                "createdDateTime": moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),
            }


            // setLoading(true)
            console.log(data, "data")

        }
    }

    // --------------------------------To bind the Blog values---------------------------------

    const update = (data: any) => {
        BlogData.BlogId = data.BlogId;
        BlogData.BlogName = data.BlogName;
        BlogData.profileImage = data.profileImage;
        BlogData.ImageName = data.profileImageName;
        BlogData.selectedFile = data.file;
        BlogData.filesize = data.filesize;
        BlogData.CreatedBy = data.CreatedBy;
        BlogData.create = 'update'
        setBlogData(BlogData)

        open();

    }
    // --------------------------------Update Blog---------------------------------

    const UpdateForm = () => {
        
        if (validateForm()) {

            const data = {
                "BlogId": BlogData.BlogId,
                "BlogName": BlogData.BlogName,
                "file": BlogData.selectedFile,
                "filesize": BlogData.filesize,
                "profileImage": BlogData.profileImage,
                "profileImageName": BlogData.ImageName,
                "updatedBy": localStorage.getItem("username"),
                "updatedDateTime": moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),
            }

            // setLoading(true)
            console.log(data)

        }
    }

    const imageResetHandler = () => {
        let state = { ...BlogData };
        state['mainState'] = "initial";
        state['profileImage'] = null;
        state['DO'] = true;
        setBlogData(state)
    }
    const renderInitialState = () => {
        return (<CardContent>
            <Grid container justify="center" alignItems="center"> <input
               accept="image/png, image/jpg, image/jpeg"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleUploadClick}
            />
                <label htmlFor="contained-button-file">
                    <Fab component="span" >
                        <AddPhotoAlternateIcon />
                    </Fab>
                </label>
            </Grid>
        </CardContent>
        )
    }
    const renderUploadedState = () => {
        console.log(BlogData.selectedFile)
        return (
            <CardActionArea onClick={imageResetHandler}>
                <img
                    width="100%"
                    alt="logo"
                    src={BlogData.selectedFile}
                />
            </CardActionArea>)
    }

    return (

        <AppAnimate animation='transition.slideUpIn' delay={200}>

            <Card className="Card">

                <Box>
                    <Box component='h4' mb={3} fontSize={20}>
                        Manage Blogs
                        <Button style={{ textTransform: 'none', float: "right", marginTop: '10px' }}
                            variant="contained"
                            color="primary"
                            onClick={add}>Add Blog</Button>
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
                                <ColumnDirective width="50" headerText="Blog Name" field="BlogName" type="string" textAlign="Left" />
                                <ColumnDirective width="50" headerText="Created By" field="CreatedBy" type="string" textAlign="Left" />
                                <ColumnDirective width="50" headerText="Actions" textAlign="Center" template={(rowdata: any) =>
                                    <span>
                                        <IconButton style={{ color: 'black' }} name="edit" color="secondary" onClick={() => update(rowdata)}>
                                            <EditIcon />
                                        </IconButton>
                                    </span>
                                }
                                />

                            </ColumnsDirective>

                            <Inject services={[Page, Sort, Filter, ColumnMenu, ColumnChooser, Edit, CommandColumn]} />

                        </GridComponent>

                    </Grid>



                    <Dialog
                        open={showDialog}
                        maxWidth="xs"
                    >
                        {BlogData.create === "create" ?

                            <DialogTitle> Create Blog</DialogTitle> : <DialogTitle id="simple-dialog-title"> Update Blog</DialogTitle>}
                        <form  >
                            <DialogContent dividers>
                                <DialogContentText  >

                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <label className="modal-label" style={{ marginBottom: " 4px" }}>Blog Name <sup>*</sup></label>

                                        </Grid >
                                        <Grid item xs={7}>
                                            < Input required type="text" name="List Name" style={{ marginTop: " 4px" }} value={BlogData.BlogName} onChange={(event) => { setBlogData({ ...BlogData, BlogName: event.target.value }) }} />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <label className="modal-label" style={{ marginBottom: " 4px" }}>Profile image <sup>*</sup></label>
                                        </Grid>

                                        <Grid item xs={7}>
                                            {BlogData.create === 'create' ? <Card >
                                                {(BlogData.mainState === "initial" && renderInitialState()) ||

                                                    (BlogData.mainState === "uploaded" && renderUploadedState())}
                                            </Card> : <Card >
                                                <CardActionArea onClick={imageResetHandler}>
                                                    <img
                                                        width="100%"
                                                        alt="logo"
                                                        src={BlogData.selectedFile}
                                                    />
                                                </CardActionArea>
                                            </Card>
                                            }
                                            {(BlogData.create !== 'create' && BlogData.DO) ? <Card> {(BlogData.mainState === "initial" && renderInitialState())}</Card> : ''}

                                        </Grid>
                                        <Grid item xs={4}>
                                            <label className="modal-label" style={{ marginBottom: " 4px" }}>Select a file <sup>*</sup></label>
                                        </Grid>

                                        <Grid item xs={7}>
                                            <input
                                                accept="application/pdf"
                                                // className={classes.input}
                                                
                                                id="contained-button-file"
                                                multiple
                                                type="file"
                                                onChange={handleUploadFile}
                                            />

                                        </Grid>


                                    </Grid>

                                </DialogContentText>
                            </DialogContent>

                            {BlogData.create === "create" ?


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
}
export default ManageBlogs;