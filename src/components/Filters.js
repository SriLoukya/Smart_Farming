import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Plot from 'react-plotly.js';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import background from "../img/background.jpeg";
import bg from "../img/background.jpg";
import farming from "../img/farming.png"
import Navbar from "./Navbar";
import ReactLoading from "react-loading";
import { makeStyles } from "@mui/styles";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { height, style } from "@mui/system";

// import * as React from 'react';
// import dayjs, { Dayjs } from 'dayjs';
const useStyles = makeStyles({
    TextField: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "aqua"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "aqua"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "aqua"
      },
      "& .MuiOutlinedInput-input": {
        color: "aqua"
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "aqua"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "aqua"
      },
      "& .MuiInputLabel-outlined": {
        color: "aqua"
      },
      "&:hover .MuiInputLabel-outlined": {
        color: "aqua"
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "aqua"
      }
    }
  });

const UsersList = (props) => {
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());
    const [second, setSecond] = useState([]);
    const [sub, setSub] = useState(0);
    const [sub1, setSub1] = useState(0);
    const [value, setValue] = useState();
    const [avgType, setAvgType] = useState("0");
    // const data;
    const classes = useStyles();
    const handleChangeStartTime = (event) => {
        setStartDateTime(event.target.value);
        // console.log(startDateTime);
    };

    const handleChangeEndTime = (event) => {
        setEndDateTime(event.target.value);
    };
    const handleSubmitStore = (event) => {
        event.preventDefault();
        setSub(1);
        console.log(sub);
        axios.get(` https://api.thingspeak.com/channels/1871357/feeds.json?api_key=0B39S2G0VPIURNHC&timezone=Asia%2FKolkata&start=${startDateTime}&end=${endDateTime}`)
            .then(response => {

                setSecond(response.data.feeds);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleSubmitStore1 = (event) => {
        event.preventDefault();
        setSub1(1);
        console.log(avgType);
        if (avgType == "10") {
            axios.get(` https://api.thingspeak.com/channels/1871357/feeds.json?api_key=0B39S2G0VPIURNHC&timezone=Asia%2FKolkata&start=${startDateTime}&end=${endDateTime}&average=10`)
                .then(response => {

                    setSecond(response.data.feeds);
                    if (response.data.feeds.length == 0) {
                        alert("No data found");
                        window.location.reload();
                    }
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else if (avgType == "20") {
            axios.get(` https://api.thingspeak.com/channels/1871357/feeds.json?api_key=0B39S2G0VPIURNHC&timezone=Asia%2FKolkata&start=${startDateTime}&end=${endDateTime}&average=20`)
                .then(response => {

                    setSecond(response.data.feeds);
                    if (response.data.feeds.length == 0) {
                        alert("No data found");
                        window.location.reload();
                    }
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else if (avgType == "60") {
            axios.get(` https://api.thingspeak.com/channels/1871357/feeds.json?api_key=0B39S2G0VPIURNHC&timezone=Asia%2FKolkata&start=${startDateTime}&end=${endDateTime}&average=60`)
                .then(response => {

                    setSecond(response.data.feeds);
                    if (response.data.feeds.length == 0) {
                        alert("No data found");
                        window.location.reload();
                    }
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        else if (avgType == "daily") {
            axios.get(` https://api.thingspeak.com/channels/1871357/feeds.json?api_key=0B39S2G0VPIURNHC&timezone=Asia%2FKolkata&start=${startDateTime}&end=${endDateTime}&average=daily`)
                .then(response => {

                    setSecond(response.data.feeds);
                    if (response.data.feeds.length == 0) {
                        alert("No data found");
                        window.location.reload();
                    }
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            axios.get(` https://api.thingspeak.com/channels/1871357/feeds.json?api_key=0B39S2G0VPIURNHC&timezone=Asia%2FKolkata&start=${startDateTime}&end=${endDateTime}`)
                .then(response => {

                    setSecond(response.data.feeds);

                    if (response.data.feeds.length == 0) {
                        alert("No data found");
                        window.location.reload();
                    }
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    };
    const onChangeAvgType = (event) => {
        setAvgType(event.target.value);
    }
    let CO2 = [];
    let times2 = [];
    let VOC = [];
    let times3 = [];
    let Humidity = [];
    let times4 = [];
    let Temperature = [];
    let times5 = [];
    let Moisture = [];
    let times7 = [];
    let Light = [];
    let times8 = [];
    for (let i = 0; i < second.length; i++) {

        if (second[i] != undefined) {
            if (second[i].field2 != null && second[i].field2 != "nan") {
                // console.log(second[i].field2);
                CO2.push(second[i].field2);
                times2.push(second[i].created_at);
            }
            if (second[i].field3 != null && second[i].field3 != "nan") {
                // console.log(second[i].field3);
                VOC.push(second[i].field3);
                times3.push(second[i].created_at);
            }
            if (second[i].field4 != null && second[i].field4 != "nan") {
                // console.log(second[i].field4);
                Humidity.push(second[i].field4);
                times4.push(second[i].created_at);
            }
            if (second[i].field5 != null && second[i].field5 != "nan") {
                // console.log(second[i].field5);
                Temperature.push(second[i].field5);
                times5.push(second[i].created_at);
            }
            if (second[i].field7 != null && second[i].field7 != "nan") {
                // console.log(second[i].field7);
                Moisture.push(second[i].field7);
                times7.push(second[i].created_at);
            }
            if (second[i].field8 != null && second[i].field8 != "nan") {
                // console.log(second[i].field8);
                Light.push(second[i].field8);
                times8.push(second[i].created_at);
            }
        }
    }
    const loadingScreen = () => {
        return (

            <ReactLoading
                type={"bars"}
                color={"#00FFFF"}
                height={100}
                width={100}
            />);
    };
    const renderGraph = () => {
        return (
            <div>

                {console.log(second)}
                <Grid container spacing={5} >
                    {
                        second.length > 0 ?
                            (
                                // <div>
                                <Plot style={{ border: "2px solid aqua", margin: "2% 2%",borderRadius:'7px',padding:'2%' }}
                                    data={[
                                        {
                                            x: Object.values(times2),
                                            y: Object.values(CO2),
                                            type: 'scatter',
                                            marker: { color: 'aqua' },
                                        },
                                    ]}
                                    layout={{
                                        width: 700, height: 500,
                                        title: 'CO2',
                                        plot_bgcolor: "black",
                                        paper_bgcolor: "black",
                                        border: "2px solid aqua",
                                        font:
                                        {
                                            color:'aqua',
                                            size: 15,
                                            family: "Lato"
                                        },
                                        xaxis:{linecolor:'aqua'},
                                        yaxis:{linecolor:'aqua'}


                                    }}
                                />
                                // </div>


                            )
                            : loadingScreen()
                    }
                    {
                        second.length > 0 ?
                            (
                                // <div>


                                <Plot style={{ border: "2px solid aqua", margin: "2% 2%",borderRadius:'7px',padding:'2%' }}
                                    data={[
                                        {
                                            x: Object.values(times3),
                                            y: Object.values(VOC),
                                            type: 'scatter',
                                            marker: { color: 'aqua' },
                                        },
                                    ]}
                                    layout={{
                                        width: 700, height: 500, title: 'VOC',
                                        plot_bgcolor: "black",
                                        paper_bgcolor: "black",
                                        border: "2px solid aqua",
                                        font: {

                                            color: "aqua",
                                            size: 15,
                                            family: "Lato"

                                        },
                                        xaxis:{linecolor:'aqua'},
                                        yaxis:{linecolor:'aqua'}

                                    }}
                                />

                                // </div>


                            )
                            : loadingScreen()
                    }
                    {
                        second.length > 0 ?
                            (
                                // <div>


                                <Plot style={{ border: "2px solid aqua", margin: "2% 2%",borderRadius:'7px',padding:'2%' }}
                                    data={[
                                        {
                                            x: Object.values(times4),
                                            y: Object.values(Humidity),
                                            type: 'scatter',
                                            marker: { color: 'aqua' },
                                        },
                                    ]}
                                    layout={{
                                        width: 700, height: 500, title: 'Humidity',
                                        plot_bgcolor: "black",
                                        paper_bgcolor: "black",
                                        border: "2px solid aqua",
                                        font: {

                                            color: "aqua",
                                            size: 15,
                                            family: "Lato"

                                        },
                                        xaxis:{linecolor:'aqua'},
                                        yaxis:{linecolor:'aqua'}

                                    }}
                                />

                                // </div>


                            )
                            : loadingScreen()
                    }
                    {
                        second.length > 0 ?
                            (
                                // <div>


                                <Plot style={{ border: "2px solid aqua", margin: "2% 2%",borderRadius:'7px',padding:'2%' }}
                                    data={[
                                        {
                                            x: Object.values(times5),
                                            y: Object.values(Temperature),
                                            type: 'scatter',
                                            marker: { color: 'aqua' },
                                        },
                                    ]}
                                    layout={{
                                        width: 700, height: 500, title: 'Temperature',
                                        plot_bgcolor: "black",
                                        paper_bgcolor: "black",
                                        border: "2px solid aqua",
                                        font: {

                                            color: "aqua",
                                            size: 15,
                                            family: "Lato"

                                        },
                                        xaxis:{linecolor:'aqua'},
                                        yaxis:{linecolor:'aqua'}

                                    }}
                                />

                                // </div>


                            )
                            : loadingScreen()
                    }
                    {
                        second.length > 0 ?
                            (
                                // <div>


                                <Plot style={{ border: "2px solid aqua", margin: "2% 2%",borderRadius:'7px',padding:'2%' }}
                                    data={[
                                        {
                                            x: Object.values(times7),
                                            y: Object.values(Moisture),
                                            type: 'scatter',
                                            marker: { color: 'aqua' },
                                        },
                                    ]}
                                    layout={{
                                        width: 700, height: 500, title: 'Moisture',
                                        plot_bgcolor: "black",
                                        paper_bgcolor: "black",
                                        border: "2px solid aqua",
                                        font: {

                                            color: "aqua",
                                            size: 15,
                                            family: "Lato"

                                        },
                                        xaxis:{linecolor:'aqua'},
                                        yaxis:{linecolor:'aqua'}

                                    }}
                                />


                                // </div>


                            )
                            : loadingScreen()
                    }
                    {
                        second.length > 0 ?
                            (
                                // <div>


                                <Plot style={{ border: "2px solid aqua", margin: "2% 2%",borderRadius:'7px',padding:'2%' }}
                                    data={[
                                        {
                                            x: Object.values(times8),
                                            y: Object.values(Light),
                                            type: 'scatter',
                                            marker: { color: 'aqua' },
                                        },
                                    ]}
                                    layout={{
                                        xaxis: { linecolor: "aqua" },
                                        yaxis: { linecolor: "aqua" },
                                        width: 700, height: 500, title: 'Light Intensity',
                                        plot_bgcolor: "black",
                                        paper_bgcolor: "black",
                                        border: "2px solid aqua",
                                        linecolor: "aqua",
                                        font: {

                                            color: "aqua",
                                            size: 15,
                                            family: "Lato"

                                        },
                                        xaxis:{linecolor:'aqua'},
                                        yaxis:{linecolor:'aqua'}

                                    }}
                                />
                                // </div>


                            )
                            : loadingScreen()
                    }
                </Grid>
            </div>
        );
    };
    const backStyle = { backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', padding: "50px" };
    const backStyle2 = { backgroundImage: `url(${farming})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' };
    const backStyle3 = { backgroundColor: "black", color: "aqua",backgroundSize: 'cover',height:'100vh' };
    const [isHovering3, setIsHovering3] = useState(false);
    
    const handleMouseEnter3 = () => {
        setIsHovering3(true);
    };
    const handleMouseLeave3 = () => {
        setIsHovering3(false);
    };

    return (
        <div style={{backgroundColor:'black',height:'100vh'}}>
            <div>
                <Navbar />
            </div>
            <div style={{background:'black',margin:'1% 32% 5% 32%'}}>
                
                {/* <Grid container align="center"> */}
                <Grid item align="center" style={{border:'1px solid aqua',borderRadius:'7px',padding:'2% 5% 5% 5%'}}>
                    {/* <List component="nav" aria-label="mailbox folders">
                            <ListItem align="center"> */}
                    {/* <Grid container spacing={2}> */}
                    <Grid style={{color:'white'}}>
                        <h2>Filters</h2>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <TextField
                            className={classes.TextField}

                            id="datetime-local"
                            label="Start Date Time"
                            type="datetime-local"
                            variant="standard"
                            //defaultValue={startDateTime}
                            onChange={handleChangeStartTime}
                            style={{border:'1px solid black',borderRadius:'7px'}}

                            InputLabelProps={{
                                style: { color: "aqua" },
                                shrink: true,
                            }}
                            // style={{border:'1px solid aqua',borderRadius:'5px',padding:'5px'}}
                            // InputProps={{
                            //     style:{color:"aqua"},

                            // }}
                            // color="aqua"

                            sx={{
                                m: 1,
                                width: "25ch",
                                input: { 
                                    backgroundColor: 'white',
                                    color:'black',
                                    padding:'2%'}
                            


                            }}
                        />
                    </Grid>
                    <Grid item xs={12} align="center">
                        <TextField
                            className={classes.root}

                            id="datetime-local"
                            label="End Date Time"
                            type="datetime-local"
                            variant="standard"
                            // defaultValue={endDateTime}
                            onChange={handleChangeEndTime}
                            InputLabelProps={{
                                style: { color: "aqua" },
                                shrink: true,
                            }}
                            sx={{
                                m: 1,
                                width: "25ch",
                                input: { backgroundColor: 'white' },
                            

                            }}
                        />
                    </Grid>
                    {/* </Grid> */}
                    {/* </ListItem> */}
                    <Divider />
                    <Grid item xs={12} align="center" style={{ margin: "1%" }}>

                    <FormControl style={{ width: 500, color: "white", background: "white", borderRadius:'7px'}}>
                        <InputLabel id="demo-simple-select-label" style={{ color: "black"}}>Average Type</InputLabel>
                        <Select
                            className={classes.root}

                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={food_type}
                            label="Average Type"
                            onChange={onChangeAvgType}
                            InputLabelProps={{
                                style: { color: "aqua" },
                                shrink: true,
                            }}
                        >

                            <MenuItem value={10}>10 minutes</MenuItem>
                            <MenuItem value={20}>20 minutes</MenuItem>
                            <MenuItem value={60}>1 hour</MenuItem>
                            <MenuItem value={"daily"}>Daily</MenuItem>



                        </Select>
                    </FormControl>
                    <div style={{ margin: "2% 2% 5% 2%" }}><Button
                        onClick={handleSubmitStore1}
                        style={{ color: "aqua", 
                        border: "1px solid aqua",
                        backgroundColor:isHovering3?'aqua':'black',
                        color:isHovering3?'black':'aqua'}}
                        size="large"
                        onMouseEnter={handleMouseEnter3}
                        onMouseLeave={handleMouseLeave3}
                    >Submit</Button></div>

                </Grid>
                


                    {/* </List> */}
                </Grid>

                {/* </Grid> */}
                
            </div>

            <Grid item xs={6} style={{align:'center',margin:'2% 2% 2% 7%'}}>
                    {sub1 === 1 ? renderGraph() : null}
            </Grid>
        </div>
    );
};

export default UsersList;