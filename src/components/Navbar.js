import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import MenuItem from '@mui/material/MenuItem';
import React, { useState, Component, useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const backStyle = { backgroundImage: `url(${nav})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', padding: "20px" };
  const handleMouseEnter1 = () => {
    setIsHovering1(true);
  };
  const handleMouseEnter2 = () => {
    setIsHovering2(true);
  };
  const handleMouseEnter4 = () => {
    setIsHovering4(true);
  };
  const [isHovering1, setIsHovering1] = useState(false);
  const [isHovering2, setIsHovering2] = useState(false);
  const [isHovering4, setIsHovering4] = useState(false);


  const handleMouseLeave1 = () => {
    setIsHovering1(false);
  };
  const handleMouseLeave2 = () => {
    setIsHovering2(false);
  };
  const handleMouseLeave4 = () => {
    setIsHovering4(false);
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: "black",}} position="static">
        <Toolbar style={{padding:"0.5% 7%", color:"aqua", }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/home")}
            style={{
              borderBottom: isHovering1 ? '3px solid aqua' : '',
              // color: isHovering ? 'white' : '',
            }}
            onMouseEnter={handleMouseEnter1}
            onMouseLeave={handleMouseLeave1}
          >
            DashBoard
          </Typography>
          <Typography></Typography>
          <MenuItem onClick={() => navigate("/filters")}>
            <Typography style={{
              borderBottom: isHovering2 ? '3px solid aqua' : '',
              // color: isHovering ? 'white' : '',
            }}
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
             variant="h6" component="div"
              sx={{ cursor: "pointer" }}
              textAlign="center"
              >Filters</Typography>
          </MenuItem>
          
          <Box sx={{ flexGrow: 1 }} />
          <Typography
          variant="h6"
          component="div"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}>
            Logout

          </Typography>

          {/* <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/filters")}
          >
            Filters
          </Typography> */} 

          {/* <Button style={{color:"white"}} onClick={() => navigate("/filters")}>
            Filters
          </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
