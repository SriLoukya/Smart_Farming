import React, { useState, Component, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { tableCellClasses } from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Plotly from 'plotly.js-dist';
import Paper from '@mui/material/Paper';
import { TableContainer } from '@mui/material';
import { TablePagination } from '@mui/material';
import ReactLoading from "react-loading";
import Navbar from './Navbar';


function Home() {
    const [loadData, setData] = useState(null);
    const [columns, setColumns] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const cols = ["CO2", "VOC", "Humidity", "Temperature", "Moisture", "Light_Intensity"];
 

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value, 10);
        setPage(0);
    };

    // Function toget all the fields from the channel
    const getColumns = (data) => {
        var tempColumns = []
        for (var key in data[0]) {
            tempColumns.push(key);
        }
        return tempColumns;
    };

    const changeKeyName = (data) => {
        for (var i = 0; i < data.length; i++) {
            for (var key in data[i]) {
                if (key == 'created_at') {
                    data[i]['Timestamp'] = data[i][key];
                    delete data[i][key];
                }
                else if (key == 'field2') {
                    data[i]['CO2'] = data[i][key];
                    delete data[i][key];
                }
                else if (key == 'field3') {
                    data[i]['VOC'] = data[i][key];
                    delete data[i][key];
                }
                else if (key == 'field4') {
                    data[i]['Humidity'] = data[i][key];
                    delete data[i][key];
                }
                else if (key == 'field5') {
                    data[i]['Temperature'] = data[i][key];
                    delete data[i][key];
                }
                else if (key == 'field7') {
                    data[i]['Moisture'] = data[i][key];
                    delete data[i][key];
                }
                else if (key == 'field8') {
                    data[i]['Light_Intensity'] = data[i][key];
                    delete data[i][key];
                }
            }
        }
        return data;
    }

    const divideDate = (data) => {
        for (var i = 0; i < data.length; i++) {
            data[i]['Date'] = data[i]['created_at'].split('T')[0];
            data[i]['Time'] = data[i]['created_at'].split('T')[1].split('+')[0];
        }
        return data;
    };


    const Input = styled('input')({
        display: 'none',
        margin: '20px auto',
        width: '100%',
        marginBottom: '1rem',
    });

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));
    const query = "https://api.thingspeak.com/channels/1871357/feeds.json?api_key=0B39S2G0VPIURNHC&timezone=Asia%2FKolkata&results=100"
    // Function to extract data from thingspeak


    useEffect(() => {
        axios.get(query)
            .then(res => {
                res = res.data.feeds;
                var temp = changeKeyName(divideDate(res));
                setData(temp);
                setColumns(getColumns(res));
            })
            .catch(err => {
                console.log(err);
            });
    }, [])

    useEffect(() => {
        console.log(loadData);
        if (loadData) {
            for (var col in cols) {
                var xdata = [];
                var ydata = [];


                for (let i = 0; i < loadData.length; i++) {
                    if (loadData[i][cols[col]] != null && loadData[i][cols[col]] != "nan") {
                        // console.log(loadData[i]['Timestamp']);
                        xdata.push(loadData[i]['Timestamp']);
                        ydata.push(loadData[i][cols[col]])
                    }
                }
                var template = {
                    x: xdata,
                    y: ydata,
                    type: 'scatter',
                    // mode: 'lines',
                    marker: { color: 'aqua' },
                };

                var titleString = cols[col] + " Graph"
                var xString = "Date-Time";
                var yString = "";
                if (cols[col] == "CO2")
                    yString = "CO2"
                else if (cols[col] == "VOC")
                    yString = "VOC"
                else if (cols[col] == "Humidity")
                    yString = "Humidity"
                else if (cols[col] == "Temperature")
                    yString = "Temperature"
                else if (cols[col] == "Moisture")
                    yString = "Moisture"
                else if (cols[col] == "Light_Intensity")
                    yString = "Light_Intensity"

                var layout = {
                    xaxis: { title: xString,linecolor:"aqua" },
                    yaxis: { title: yString,linecolor:"aqua" },
                    title: { text: titleString },
                    // plot_bgcolor: "#adcef0",
                    plot_bgcolor: "black",
                    paper_bgcolor: "black",
                    border:"2px solid aqua",
                    color:"white",
                    width: 700,
                    height: 500,

                    font: {

                        color: "aqua",
                        size:15,
                        family:"Lato"
                        
                    }
                }
                Plotly.newPlot(cols[col], [template], layout);
            }



        }
    }, [loadData])

    const loadingScreen = () => {
        return (

            <ReactLoading
                type={"bars"}
                color={"#00FFFF"}
                height={100}
                width={100}
            />);
    };

    // Function to show data in table
    const renderTable = () => {
        return (
            <Item style={{margin:"1% 4%"}}>
                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 700 }}  aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {
                                    columns.map((row, index) => (
                                        <StyledTableCell align="center" key={index}>{row}</StyledTableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                loadData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        <StyledTableRow key={index}>
                                            {
                                                columns.map((r, ind) => (
                                                    <StyledTableCell align="center" key={ind}>{row[r]}</StyledTableCell>
                                                ))
                                            }
                                        </StyledTableRow>
                                    ))
                            }
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={loadData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Item>
        );
    };

    const backStyle2 = { backgroundColor: 'black', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', padding: "20px" };
    const backStyle = { backgroundColor: 'black', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' };

    return (

        <div style={backStyle}>
            {/* <div style={backStyle}> */}
            <div><Navbar/></div>
            <Grid container spacing={5}>
                {cols.map((col, idx) => (
                    <Grid item xs={6} key={idx}>
                        {loadData ? (<div style={{border:"2px solid aqua", borderRadius:"10px",margin:"4% 9%"}}  id={col} align="center"></div>) : (loadingScreen())}
                    </Grid>
                ))}
                <Grid item xs={12}>
                    {loadData ? (renderTable()) : (loadingScreen())}
                </Grid>
            </Grid>
            {/* </div> */}
        </div>
    );

}


export default Home;