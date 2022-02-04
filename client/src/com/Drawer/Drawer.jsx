import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { setDrawer } from "../../store/user-reducer";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import CallIcon from "@material-ui/icons/Call";
import DrawerProfile from "./DrawerProfile";
import DrawerText from "./DrawerText";
import { drawerStyles } from "./drawerStyle";
const arr = [
  { id: 1, name: "Contacts",disabled:true, icon: <ContactPhoneIcon /> },
  { id: 2, name: "Calls",disabled:true, icon: <CallIcon /> }
];



export default function MDrawer() {
  const dispatch = useDispatch();
  const classes = drawerStyles();
  const { drawer } = useSelector((state) => state.user);
  const toggleDrawer = () => (event) => {
    if (event&&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    dispatch(setDrawer(false));
  };

  return (
    <Drawer
      className={classes.drawer}
      anchor={"left"}
      open={drawer}
      onClose={toggleDrawer()}
    >
      <Grid container style={{ width: "300px" }}>
        <DrawerProfile toggleDrawer={toggleDrawer}/>
        <DrawerText toggleDrawer={toggleDrawer} arr={arr} />
      </Grid>
    </Drawer>
  );
}
