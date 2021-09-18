import React, { useState } from 'react';
import {  Button,  Grid, Input } from "@material-ui/core"
import { GridContainer } from "@crema";

// interface CalcParams {
//     MGD: string,
//     CBOD: string,
//     MLVSS: string,
//     ActivatedSludge: string

// }

const FMCalculator = () => {
    const [calcValue, setcalcValue] = useState({
        MGD: '',
        CBOD: '',
        ActivatedSludge: '',
        MLVSS: '',
        result: '',
        F: '',
        M: '',
        FM: '',
        type: ''


    })
    const calculate = () => {

        let F = parseInt(calcValue.CBOD) * parseInt(calcValue.MGD) * 8.34;
        let M = (parseInt(calcValue.MLVSS) * parseInt(calcValue.ActivatedSludge) * 8.34) / 1000000
        // let result = ;
        let FM = F / M;
        let cal = { ...calcValue };
        cal['F'] = F.toString();
        cal['M'] = M.toString();
        cal['FM'] = FM.toString();
        setcalcValue(cal);
    }

    return (
        <div>
            <GridContainer>
                <Grid item lg={8} xs={12} sm={6} md={8} >
                    <label className="modal-label" style={{ marginBottom: " 4px" }}>Enter Your Facility Flow (MGD) <sup></sup></label>

                </Grid>
                <Grid item lg={4} xs={12} sm={6} md={4} >
                    < Input required type="text" name="List Name" style={{ marginTop: " 4px" }} value={calcValue.MGD} onChange={(event) => { setcalcValue({ ...calcValue, MGD: event.target.value }) }} />
                </Grid>
                <Grid item lg={8} xs={12} sm={6} md={8} >
                    <label className="modal-label" style={{ marginBottom: " 4px" }}>Enter Your Activated Sludge Process Influent CBOD  Reading (mg/L) <sup></sup></label>

                </Grid>
                <Grid item lg={4} xs={12} sm={6} md={4} >
                    < Input required type="text" name="List Name" style={{ marginTop: " 4px" }} value={calcValue.CBOD} onChange={(event) => { setcalcValue({ ...calcValue, CBOD: event.target.value }) }} />
                </Grid>
                <Grid item lg={8} xs={12} sm={6} md={8} >
                    <label className="modal-label" style={{ marginBottom: " 4px" }}>Enter the Volume (gallons) of your Activated Sludge Aeration System   (we convert this into millions of gallons below) <sup></sup></label>

                </Grid>
                <Grid item lg={4} xs={12} sm={6} md={4} >
                    < Input required type="text" name="List Name" style={{ marginTop: " 4px" }} value={calcValue.ActivatedSludge} onChange={(event) => { setcalcValue({ ...calcValue, ActivatedSludge: event.target.value }) }} />
                </Grid>
                <Grid item lg={8} xs={12} sm={6} md={8} >
                    <label className="modal-label" style={{ marginBottom: " 4px" }}>Enter Your Mixed Liquor Volatile Suspended Solids Readings (MLVSS)<sup></sup></label>

                </Grid>
                <Grid item lg={4} xs={12} sm={6} md={4} >
                    < Input required type="text" name="List Name" style={{ marginTop: " 4px" }} value={calcValue.MLVSS} onChange={(event) => { setcalcValue({ ...calcValue, MLVSS: event.target.value }) }} />
                </Grid>
                <Grid item lg={12} xs={12} sm={12} md={12}>
                    <Button style={{ textTransform: 'none', width: '100%' }} variant="contained" color="primary" onClick={calculate}>Calculate {calcValue.type}</Button>

                </Grid>
                <Grid item lg={12} xs={12} sm={12} md={12}>
                    <label className="modal-label" style={{ marginBottom: " 4px" }}>Lbs of FOOD (Influent CBOD) Entering the System (F)=	 {calcValue.F}</label>


                </Grid>
                <Grid item lg={12} xs={12} sm={12} md={12}>

                    <label className="modal-label" style={{ marginBottom: " 4px" }}>Lbs of Volative Solids Under Aeration (M)=	{calcValue.M}</label>



                </Grid>
                <Grid item lg={12} xs={12} sm={12} md={12}>

                    <label className="modal-label" style={{ marginBottom: " 4px" }}>Food to Microorganism Ratio (F/M)=	{calcValue.FM}</label>


                </Grid>
            </GridContainer>
        </div>
    )
}
export default FMCalculator;