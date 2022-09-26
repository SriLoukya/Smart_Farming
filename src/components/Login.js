import React, { useState, Component, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import WebFont from 'webfontloader';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
    root: {
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
function Login() {
    const navigate = useNavigate();
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isHovering0, setIsHovering0] = useState(false);

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleMouseEnter0 = () => {
        setIsHovering0(true);
    };
    const handleMouseLeave0 = () => {
        setIsHovering0(false);
    };
    const onSubmit = (event) => {
        event.preventDefault();
        if (email === "1871357" && password === "0B39S2G0VPIURNHC") {
            // window.location.href = "/home";
            navigate("/home");
        }
        else {
            alert("Invalid Credentials");
            // setEmail("");
            setPassword("");
            
            // window.location.reload();

        }
    };
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Droid Sans', 'Chilanka', 'Dancing Script', 'Rajdhani', 'Roboto', 'sans-serif']
            }
        });
    }, []);
    const backStyle4 = { backgroundColor: "black", padding: "50px", color: "aqua",height: '100vh'};

    return (

        <div style={{ backgroundColor: "black", padding: "5% 30%", color: "aqua",height: '100vh' }}>
            <Grid container align={"center"} spacing={3}
            style={{ 
                border:'2px solid aqua',
                borderRadius:'20px'
                // padding:'4% 2% 10% 2%',
                 }}>
                <Grid item xs={12}>
                    <h2>Login</h2>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className={classes.root}
                        label="Channel ID"
                        variant="outlined"
                        value={email}
                        style = {{width: "40%",margin:'2%'}} 
                        onChange={onChangeEmail}
                        InputLabelProps={{
                            style: { color: "aqua" },
                            shrink: true,
                        }}
                        sx={{ input: { color: 'aqua' } }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className={classes.root}
                        type="password"
                        label="API Key"
                        variant="outlined"
                        value={password}
                        onChange={onChangePassword}
                        style = {{width: "40%",margin:'2%'}} 
                        InputLabelProps={{
                            style: { color: "aqua" },
                            shrink: true,
                        }}
                        sx={{ input: { color: 'aqua' } }}

                    />
                </Grid>
                <Grid item xs={12}>
                    <Button 
                    onMouseEnter={handleMouseEnter0}
                    onMouseLeave={handleMouseLeave0}
                    variant="contained" onClick={onSubmit}
                    style={{
                        background:isHovering0?'aqua':'black',
                        color:isHovering0?'black':'aqua',
                        border:'1px solid aqua',margin:'1% 5% 8% 5%'}}>
                        Login
                    </Button>
                </Grid>
            </Grid>
        </div>

    );

}


export default Login;