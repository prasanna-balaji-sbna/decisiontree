import { Dispatch } from 'redux';
import { AppActions } from '../../types';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'axios';
import { showError } from '@crema/utility/Utils';
import { GET_PROBLEMS_BYMODCAT, UPLOAD_FILE, GET_MODULES, GET_CATEGORY, GET_ALL_PROBS, INITIAL_FLOW_ELEMENTS, NEXT_FLOW_ELEMENTS, SAVE_UPDATE_IMAGE, DELETE_IMAGES, GET_ALL_IMAGESBY_GROUPID, GET_ALL_GROUPS } from 'types/actions/ProblemsPosted.action';
import { toast } from 'react-toastify';
import { GET_LOV } from 'types/actions/User.action';
toast.configure();

export const GetAllProblems = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(global.configData?.getallpostedproblem
            //         global.configData?.GetAllList+"?PageNo="+data.PageNo + "&PageSize="+data.PageSize 
            //     +"&OrderColumn=" +data.OrderColumn 
            //    +"&OrderType="+data.OrderType + "&FieldName=" +data.FieldName
            //    +"&FieldValue="+data.FieldValue+ "&Operator=" +data.Operator
        ).then(res => {
            dispatch(fetchSuccess());
            dispatch({
                type: GET_ALL_PROBS,
                payload: res.data,
            });
            // toast.success("File Uploaded successfully !!!")
        }).catch(error => {

            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

export const GetProblemsByCatMod = (data: any) => {
    // + "&userId=" + 8 + "&PageNo=" + data.PageNo + "&PageSize=" + data.PageSize
    // + "&OrderColumn=" + data.OrderColumn
    // + "&OrderType=" + data.OrderType + "&FieldName=" + data.FieldName
    // + "&FieldValue=" + data.FieldValue + "&Operator=" + data.Operator
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(global.configData?.getpostedproblem + "?categoryId=" + data.CategoryId +
            "&moduleId=" + data.ModuleId

        ).then(res => {
            dispatch(fetchSuccess());
            // toast.success(" List created successfully")
            dispatch({
                type: GET_PROBLEMS_BYMODCAT,
                payload: res.data,
            });
            console.log("data")
        }).catch(error => {

            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

export const GetModules = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(global.configData?.getModule).then(res => {
            dispatch(fetchSuccess());
            // toast.success(" List updated successfully")
            dispatch({
                type: GET_MODULES,
                payload: res.data,
            });
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};
export const UploadFile = (data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.post('https://yh76wtwe76.execute-api.us-east-1.amazonaws.com/dev/api/Troubleshooting/uploadDrawIO', { data }).then((res: any) => {
            dispatch(fetchSuccess());
            dispatch({
                type: UPLOAD_FILE,
                payload: res.data
            })
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};
export const GetCategories = (data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(global.configData?.getcategory + data).then(res => {
            dispatch(fetchSuccess());
            // toast.success(" List deleted successfully")
            dispatch({
                type: GET_CATEGORY,
                payload: res.data,
            });
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};
export const GetInitialFlowElements = (problemID: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        var instance = axios.create();
        delete instance.defaults.headers.common["Authorization"];
        dispatch(fetchStart());
        instance.get('https://dlg3lqr1dl.execute-api.us-east-1.amazonaws.com/dev/troubleapi/getflowvalues?problemId=739324&nextQues=&boxorarrow=')
            .then(res => {
                dispatch(fetchSuccess());
                res.data.forEach((m: any) => {
                    m.boxorarrow = true;
                    if (m.Options !== null && m.Options !== undefined) {
                        m.Options.forEach((op: any) => {
                            op.QuestionId = m.QuestionId;
                        })
                    }
                    m.start = false;
                    m.className = 'chatincomemsg';
                    m.inOrOut = true;
                });
                dispatch({
                    type: INITIAL_FLOW_ELEMENTS,
                    payload: res.data
                });
            }).catch(error => {
                showError(error);
                dispatch(fetchError(error));
            });
    }
}

export const GetNextFlowElements = (ProblemID: any, NextQusID: any, boxorarrow: boolean) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        var instance = axios.create();
        delete instance.defaults.headers.common["Authorization"];
        instance.get('https://dlg3lqr1dl.execute-api.us-east-1.amazonaws.com/dev/troubleapi/getflowvalues?problemId=' + ProblemID + '&nextQues=' + NextQusID + '&boxorarrow=' + boxorarrow)
            .then(res => {
                dispatch(fetchSuccess());
                console.log(res.data)
                res.data.forEach((m: any) => {
                    if (m.Options !== null && m.Options !== undefined) {
                        m.Options.forEach((op: any) => {
                            op.QuestionId = m.QuestionId;
                        })
                    }
                    if (m.image !== null) {
                        m.image.forEach((e:any) => {
                            let d = "data:image/png;base64,";
                            // console.log('imagesrc',e.imagesrc)
                            e.src = d.concat(e.imagesrc);
                            // console.log(e.src, "source of the image")
    
                        });
                    }
                    // m.images =
                    // m.showBack = true;
                    m.className = 'chatincomemsg';
                    m.inOrOut = true;
                    m.boxorarrow = true;
                    let input = "FM Calculator";
                    let input1 = "Temparature Calculator";
                    let input2 = "Tank Volume Calculator";
                    let input3 = "Removal Efficieny Calculator";
                    let input4 = "Loading Calculator";
                    if (m.QusName.includes(input)) {
                        m.typeofcalc = "FM";
                    }
                    else if (m.QusName.includes(input1)) {
                        m.typeofcalc = "TEMP";
                    }
                    else if (m.QusName.includes(input2)) {
                        m.typeofcalc = "TV";
                    }
                    else if (m.QusName.includes(input3)) {
                        m.typeofcalc = "RE";
                    }
                    else if (m.QusName.includes(input4)) {
                        m.typeofcalc = "LC";
                    }



                });
                dispatch({
                    type: NEXT_FLOW_ELEMENTS,
                    payload: res.data
                })
            });
    }
}
export const getLov = (data: any) => {
    //  console.log(data,"data")
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(global.configData?.GetLOV + "?ListID=" + data.id).then(res => {
            dispatch(fetchSuccess());
            dispatch({
                type: GET_LOV,
                payload: res.data,
            }); console.log(res.data)
        }).catch(error => {
            showError(error);
            dispatch(fetchError(error.message));
        });
    };
};

export const GetPreviousFlowElements = (ProblemID: any, QuesId: any, boxorarrow: boolean) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        var instance = axios.create();
        delete instance.defaults.headers.common["Authorization"];
        instance.get('https://dlg3lqr1dl.execute-api.us-east-1.amazonaws.com/dev/troubleapi/getbackflow?problemId=' + ProblemID + '&nextQues=' + QuesId + '&boxorarrow=' + boxorarrow)
            .then(res => {
                dispatch(fetchSuccess());
                res.data.forEach((m: any) => {
                    if (m.Options !== null && m.Options !== undefined) {
                        m.Options.forEach((op: any) => {
                            op.QuestionId = m.QuestionId;
                        })
                    }
                    if (m.image !== null) {
                        let d = "data:image/png;base64,";
                        m.src = d.concat(m.imagesrc);
                        console.log(m.src, "source of the image")
                    }
                    // m.images =
                    m.showBack = true;
                    m.className = 'chatincomemsg';
                    m.inOrOut = true;
                    m.boxorarrow = true;
                    let input = "FM Calculator";
                    let input1 = "Temparature Calculator";
                    let input2 = "Tank Volume Calculator";
                    let input3 = "Removal Efficieny Calculator";
                    let input4 = "Loading Calculator";
                    if (m.QusName.includes(input)) {
                        m.typeofcalc = "FM";
                    }
                    else if (m.QusName.includes(input1)) {
                        m.typeofcalc = "TEMP";
                    }
                    else if (m.QusName.includes(input2)) {
                        m.typeofcalc = "TV";
                    }
                    else if (m.QusName.includes(input3)) {
                        m.typeofcalc = "RE";
                    }
                    else if (m.QusName.includes(input4)) {
                        m.typeofcalc = "LC";
                    }

                });
                console.log(res.data.image, "images")

                dispatch({
                    type: NEXT_FLOW_ELEMENTS,
                    payload: res.data
                })
            });
    }
}
// "saveUpdateImage":"",
// "getAllImages":"",
// "deleteImages":""
export const SaveOrUpdateImage = (data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        // var instance = axios.create();
        // delete instance.defaults.headers.common["Authorization"];
        axios.post(global.configData?.uploadimage, { data })
            .then((res: any) => {
                dispatch(fetchSuccess());
                dispatch({
                    type: SAVE_UPDATE_IMAGE,
                    payload: res.data
                })
            }).catch(error => {
                showError(error);
                dispatch(fetchError(error.message));
            });
    }
}

export const DeleteImage = (data: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        // var instance = axios.create();
        // delete instance.defaults.headers.common["Authorization"];
        axios.delete(global.configData?.deleteImage)
            .then((res: any) => {
                dispatch(fetchSuccess());
                dispatch({
                    type: DELETE_IMAGES,
                    payload: res.data
                })
            }).catch(error => {
                showError(error);
                dispatch(fetchError(error.message));
            });
    }
}
export const GetAllImagesByGroupID = (groupID: any) => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        axios.get(global.configData?.getnewImages + '?groupID=' + groupID)
            .then((res: any) => {
                dispatch(fetchSuccess());
                res.data.forEach((m:any) => {
                    let d = "data:image/png;base64,";
                    m.FileSrc = d.concat(m.FileSrc);

                });
                dispatch({
                    type: GET_ALL_IMAGESBY_GROUPID,
                    payload: res.data
                })
            }).catch(error => {
                showError(error);
                dispatch(fetchError(error.message));
            });
    }
}
export const GetAllGroups = () => {
    return async (dispatch: Dispatch<AppActions>) => {
        dispatch(fetchStart());
        // var instance = axios.create();
        // delete instance.defaults.headers.common["Authorization"];
        axios.get(global.configData?.getAllgroup)
            .then((res: any) => {
                dispatch(fetchSuccess());
                dispatch({
                    type: GET_ALL_GROUPS,
                    payload: res.data
                })
            }).catch(error => {
                showError(error);
                dispatch(fetchError(error.message));
            });
    }
}
