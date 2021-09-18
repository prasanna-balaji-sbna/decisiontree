import { GridContainer } from "@crema";
import AppAnimate from "@crema/core/AppAnimate";
import { Box, Button, Card, Grid, Input } from "@material-ui/core"
import React, { useEffect, useState } from "react"

const Calculator = () => {
    const typeofcalc = [
        {
            'key': 0,
            'value': 'FM Ratio'
        }, {
            'key': 1,
            'value': 'Temperature Calculator'
        }, {
            'key': 2,
            'value': 'Tank Volume Calculator'
        }, {
            'key': 3,
            'value': 'Removal Efficiency'
        }, {
            'key': 4,
            'value': 'Loading Calculator'
        },
    ]
    const [type, setTypeCalc] = useState('');
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
    useEffect(() => {

    }, []);
    const getCalculator = (event: any) => {
        console.log(event, typeofcalc)
        let typeID = event.target.value;
        setTypeCalc(typeID);

        console.log(type, "type")
        switch (typeID) {
            case '0': {
                calcValue['type'] = 'F/M Ratio';
                setcalcValue(calcValue);
        console.log(calcValue['type'], "type")

                return 'FM';
            }
            case '1': {
                calcValue['type'] = 'Temperature';
                setcalcValue(calcValue);
                return 'FM';
            }
            case '2': {
                calcValue['type'] = 'Tank Volume';
                setcalcValue(calcValue);
                return 'FM';
            }
            case '3': {
                calcValue['type'] = 'Removal Efficiency';
                setcalcValue(calcValue);
                return 'FM';
            }
            case '4': {
                calcValue['type'] = 'Loading';
                setcalcValue(calcValue);
                return 'FM';
            }
            default:
                {
                    calcValue['type'] = '';
                    setcalcValue(calcValue);
                    return 'FM';
                }
        }

    }
    const calculate = () => {
        switch (type) {
            case '0':
                {
                    let F = parseInt(calcValue.CBOD) * parseInt(calcValue.MGD) * 8.34;
                    let M = (parseInt(calcValue.MLVSS) * parseInt(calcValue.ActivatedSludge) * 8.34) / 1000000
                    // let result = ;
                    let FM = F / M;
                    let cal = { ...calcValue };
                    cal['F'] = F.toString();
                    cal['M'] = M.toString();
                    cal['FM'] = FM.toString();
                    setcalcValue(cal);
                    return cal;

                }
            default:
                return calcValue;


        }
    }
    return (
        <AppAnimate animation='transition.slideUpIn' delay={200}>

            <Card className="Card">

                <Box>
                    <Grid container >

                        <Grid item lg={3} xs={12} sm={6} md={3} >
                            <Box component='h4' mb={3} fontSize={20}>
                                Calculator
                            </Box>
                            {/* <Grid container> */}
                        </Grid>

                        <Grid item lg={3} xs={12} sm={6} md={3} >

                            <select className="form-control" value={type} onChange={(event) => getCalculator(event)}>
                                <option value=''>Select Calculator</option>

                                {typeofcalc.map((selectvalue: any) => {
                                    return (
                                        
                                        <option key={selectvalue.key} value={selectvalue.key}>{selectvalue.value}</option>
                                    )
                                })
                                }
                            </select>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item lg={2} xs={12} sm={6} md={2} >

                        </Grid>
                        <Grid item lg={8} xs={12} sm={6} md={8} >
                            {(() => {

                                switch (type) {
                                    case '0':
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
                                    case '1':
                                        return (
                                            <div>Temparature Calculator</div>

                                        )
                                    case '2':
                                        return (
                                            <div>"Tank Volume Calculator</div>
                                        )
                                    case '3':
                                        return (
                                            <div>Removal Efficiency</div>
                                        )
                                    case '4':
                                        return (
                                            <div>Loading Calculator</div>
                                        )
                                    default:
                                        return (
                                            <div>Select any calculator to start</div>
                                            
                                        )
                                }

                            })()}

                        </Grid>
                        <Grid item lg={2} xs={12} sm={6} md={2} >


                        </Grid>
                    </Grid>




                </Box>
            </Card>
        </AppAnimate>
    );
}
export default Calculator;