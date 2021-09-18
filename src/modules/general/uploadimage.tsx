
import Box from '@material-ui/core/Box';
import { Card, CardActionArea, CardContent, FormControl, IconButton, InputLabel, Select } from '@material-ui/core'
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
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import VisibilityIcon from '@material-ui/icons/Visibility';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react';
import Fab from "@material-ui/core/Fab";
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/store';
// import { getAllList } from 'redux/actions/Lov';
import axios from 'axios';
import { GetAllGroups, GetAllImagesByGroupID, SaveOrUpdateImage } from 'redux/actions/PostedProblems';
import { toast } from 'react-toastify';
import { SAVE_UPDATE_IMAGE } from 'types/actions/ProblemsPosted.action';

// import { AppState } from 'react-native';
// import Select from '@material-ui/core/Select';
const UploadImage = () => {
    var grid: SysGrid | null;
    var data: any;
    const cookie = new Cookies();

    const filterOptions: FilterSettingsModel = { type: 'Menu' };
    const pageOptions: PageSettingsModel = { pageSizes: ["20", "50", "100", "250"], pageSize: 20 };

    // --------------------------------------------All States----------------------------------------------
    const [ImageData, setImageData] = useState({
        imageId: 0,
        imageName: "",
        groupId: 0,
        groupName: "",
        CreatedBy: "",
        CreatedIP: "",
        RecordVersion: 1,
        create: "create",
        mainState: "initial",
        imageUploaded: 0,
        selectedFile: null as any,
        fileReader: undefined,
        filename: "",
        filesize: '',
        fileType: '',
        DO:false

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
    const [getId, setgetId] = useState({});
    const [openDelete, setopenDelete] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [ViewDialog, setViewDialog] = useState(false);
    const dispatch = useDispatch();
    // --------------------------------------------dispatch -------------------------------------
    // const dispatch = useDispatch();
    const { getAllImages, saveOrUpdateImage, deleteImage, getAllGroups } = useSelector<AppState, AppState['postedProblems']>(
        ({ postedProblems }) => postedProblems,
    );
    //   ---------------------------------get dispatch data------------------------------
    if (getAllImages !== null) {
        setTimeout(() => {
            if (grid !== null && grid !== undefined) {
                grid.dataSource = {
                    result: getAllImages,
                    //count: dataLov.Count
                }

                if (deleteImage === null && saveOrUpdateImage === null) {
                    //setLoading(false)
                }
            }
        });

    }

    // -------------------------------------------useEffect------------------
    useEffect(() => {
        if (global.configData === undefined) {
            axios.get("./config.json").then((res: any) => {
                global.configData = res.data;
                dispatch(GetAllGroups());
            });
        }
        else {
            dispatch(GetAllGroups());

        }
        if (saveOrUpdateImage) {
            dispatch({
                type: SAVE_UPDATE_IMAGE,
                payload: null
            })
        }
    }, [])
    // ----------------------------------------to open and close modal----------------------------

    const opendeleteModal = (data: any) => {

        setgetId(data.listId);
        setopenDelete(true);
    }
    const closeDeleteModal = () => {
        setopenDelete(false);
    }
    const open = () => {
        setShowDialog(true);
        cookie.set('data', 'dummy');
        console.log(cookie.get('data'));
    }
    const openView = () => {
        setViewDialog(true);
    }
    const close = () => { setShowDialog(false); }
    const closeView = () => { setViewDialog(false); }


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
    // -------------------------------------------file upload---------------
    // const handleImageSearch = (url: any) => {
    //     var filename = url.substring(url.lastIndexOf("/") + 1);
    //     console.log(filename);
    //     let state = { ...ImageData };
    //     state['mainState'] = "uploaded";
    //     state['imageUploaded'] = 1;
    //     state['selectedFile'] = url;
    //     state['fileReader'] = undefined;
    //     state['filename'] = filename;
    //     setImageData(state);

    // }
    const update = (data: any) => {
        ImageData.imageName = data.ImageName;
        ImageData.imageId = data.ImageId;
        ImageData.selectedFile = data.FileSrc;
        ImageData.create = 'update'
        setImageData(ImageData)

        open();

    }
    const view = (data: any) => {
        ImageData.selectedFile = data.FileSrc;
        setImageData(ImageData)
        openView();

    }
    const deleteRecord = () => {
        let data = {

            listId: getId,
        }
        //  dispatch({
        //            type: DELETE_LIST,
        //            payload: false,
        //        })
        //       //setLoading(true)

        //   dispatch(DeleteList(data));
        console.log(data)
        closeDeleteModal();


    }
    const handleUploadClick = (event: any) => {
        console.log(event);
        var file = event.target.files[0];

        console.log(file);

        const reader = new FileReader();
        var url = reader.readAsDataURL(file);
        let state = { ...ImageData };
        state['filesize'] = event.target.files[0].size;
        state['fileType'] = event.target.files[0].type;

        reader.onloadend = (e: any) => {
            state['selectedFile'] = [reader.result];
        }
        console.log(url, state['selectedFile']); // Would see a path?
        state['mainState'] = "uploaded";
        let data = event.target.files[0];
        state['selectedFile'] = data[0];
        console.log(state['selectedFile'], "imagePAth")
        state['imageUploaded'] = 1;
        setImageData(state);

    };
    //  //-----------------------------------To validate the input form values--------------------------------
    const validateForm = () => {

        let formIsValid = true;
        // let value = { ...ImageData };

        if (!ImageData.imageName) {
            formIsValid = false;
            toast.warning('Image Name is required');
            setImageData({ ...ImageData });
        }

        if (ImageData.selectedFile === null) {
            formIsValid = false;
            toast.warning('Image is required');
            setImageData({ ...ImageData });
        }

        return formIsValid;
    }
    // --------------------------------save and update---------------
    const submitForm = () => {
        console.log(ImageData.selectedFile, "selectedone")
        let image = ImageData.selectedFile;
        var imageArr = image[0];
        // console.log(imageArr, "imageArr")

        // let final = [];
        // final = imageArr.toString().split("[,]", 0)
        // console.log(final, "final")

        // ImageData.selectedFile = final[0];
        // var base64Img = "data:image/png;base64,AAA=";
        imageArr = imageArr.replace("data:image/png;base64,", "");
        console.log(imageArr);

        // console.log(imageArr[0], "selectedone")

        if (validateForm()) {

            const data = {
                "imageId": ImageData.imageId,
                "FileName": ImageData.imageName,
                "groupId": ImageData.groupId,
                "File": imageArr,
                "FileSize": ImageData.filesize,
                "filetype": ImageData.fileType
            }
            dispatch({
                type: SAVE_UPDATE_IMAGE,
                payload: false,
            })
            // setLoading(true)

            dispatch(SaveOrUpdateImage(data))
        }
    }
    const UpdateForm = () => {
        if (validateForm()) {

            const data = {
                "imageId": ImageData.imageId,
                "FileName": ImageData.imageName,
                "groupId": ImageData.groupId,
                "file": ImageData.selectedFile
            }
            dispatch({
                type: SAVE_UPDATE_IMAGE,
                payload: false,
            })
            // setLoading(true)

            dispatch(SaveOrUpdateImage(data))
        }
    }
    const add = () => {
        ImageData.imageId = 0;
        ImageData.imageName = "";
        ImageData.imageUploaded = 0;
        ImageData.selectedFile = ""
        setImageData(ImageData);
        open();
    }
    const imageResetHandler = () => {
        let state = { ...ImageData };
        state['mainState'] = "initial";
        state['selectedFile'] = null;
        state['imageUploaded'] = 0;
        state['DO'] = true;
        setImageData(state)
    }
    const renderInitialState = () => {
        return (<CardContent>
            <Grid container justify="center" alignItems="center"> <input
                accept="image/*"
                // className={classes.input}
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
        console.log(ImageData.selectedFile)
        return (
            <CardActionArea onClick={imageResetHandler}>
                <img
                    width="100%"
                    alt="logo"

                    //   className={classes.media}
                    src={ImageData.selectedFile}
                />
            </CardActionArea>)
    }
    const handleChange = (e: any) => {
        console.log(e)

        let state = { ...ImageData };
        state['groupId'] = e.target.value;
        setImageData(state);
        console.log(ImageData.groupId)
        dispatch(GetAllImagesByGroupID(e.target.value))

    }
    return (

        <AppAnimate animation='transition.slideUpIn' delay={200}>

            <Card className="Card">

                <Box>
                    <Box component='h4' mb={3} fontSize={20}>
                        Upload Images
                        <Button style={{ textTransform: 'none', float: "right", marginTop: '10px' }}
                            variant="contained"
                            color="primary"
                            disabled={ImageData.groupId === 0}
                            onClick={add}>Add Image</Button>

                        <FormControl style={{ float: 'right', width: '200px' }} >
                            <InputLabel htmlFor="outlined-age-native-simple">Group Name</InputLabel>
                            <Select
                                native
                                value={ImageData.groupId}
                                onChange={handleChange}
                                label="Group"
                                inputProps={{
                                    name: 'Group',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {getAllGroups !== null ? getAllGroups.map((option: any) => {
                                    return (
                                        <option key={option.lovId} value={option.lovId}>{option.lovName}</option>
                                    )
                                }) : ""}


                            </Select>
                        </FormControl>



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
                                {/* <ColumnDirective width="50" headerText="Group Name" field="groupName" type="string" textAlign="Left" /> */}
                                <ColumnDirective width="50" headerText="Image Name" field="ImageName" type="string" textAlign="Left" />
                                {/* <ColumnDirective width="50" headerText="Image" field="listCode" type="string" textAlign="Left" /> */}
                                <ColumnDirective width="50" headerText="Actions" textAlign="Center" template={(rowdata: any) =>
                                    <span>

                                        <span>
                                            <IconButton style={{ color: 'black' }} name="edit" color="secondary" onClick={() => update(rowdata)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton style={{ color: 'black' }} name="edit" color="secondary" onClick={() => view(rowdata)}>
                                                <VisibilityIcon />
                                            </IconButton>

                                            <IconButton style={{ color: 'black' }} className="text-red" color="secondary" onClick={() => opendeleteModal(rowdata)} >
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

                    <Dialog open={ViewDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle >Image  </DialogTitle>
                        <DialogContent dividers>
                            <DialogContentText id="alert-dialog-description">
                                <Grid container spacing={1}>


                                    <Grid item xs={12}>

                                        <img
                                            width="100%"
                                            //   className={classes.media}
                                            src={ImageData.selectedFile}
                                        />

                                    </Grid>
                                </Grid>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={closeView} color="primary">Close </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={showDialog}
                        maxWidth="xs"
                    >
                        {ImageData.create === "create" ?

                            <DialogTitle> Create Image</DialogTitle> : <DialogTitle id="simple-dialog-title"> Update Image</DialogTitle>}
                        <form  >
                            <DialogContent dividers>
                                <DialogContentText  >

                                    <Grid container spacing={1}>
                                        <Grid item xs={4}>
                                            <label className="modal-label" style={{ marginBottom: " 4px" }}>Image Name <sup>*</sup></label>

                                        </Grid >
                                        <Grid item xs={7}>
                                            < Input required type="text" name="List Name" style={{ marginTop: " 4px" }} value={ImageData.imageName} onChange={(event) => { setImageData({ ...ImageData, imageName: event.target.value }) }} />
                                        </Grid>

                                        <Grid item xs={4}>
                                            <label className="modal-label" style={{ marginBottom: " 4px" }}>Select a image <sup>*</sup></label>
                                        </Grid>

                                        <Grid item xs={7}>
                                            {ImageData.create === 'create' ? <Card >
                                               {( ImageData.mainState === "initial" && renderInitialState()) ||

                                                    (ImageData.mainState === "uploaded" && renderUploadedState())}
                                            </Card> : <Card >
                                                <CardActionArea onClick={imageResetHandler}>
                                                    <img
                                                        width="100%"
                                                        alt="logo"
                                                        //   className={classes.media}
                                                        src={ImageData.selectedFile}
                                                    />
                                                </CardActionArea>
                                                 </Card>
                                                }
{(ImageData.create !== 'create' && ImageData.DO) ? <Card> {( ImageData.mainState === "initial" && renderInitialState())}</Card> :''}

                                        </Grid>


                                    </Grid>

                                </DialogContentText>
                            </DialogContent>

                            {ImageData.create === "create" ?


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
export default UploadImage;