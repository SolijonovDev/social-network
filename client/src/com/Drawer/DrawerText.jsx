import { Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, } from "@material-ui/core";
import React, { useState } from "react";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import Switch from "@material-ui/core/Switch";
import SettingsIcon from "@material-ui/icons/Settings";
import { SimpleDialog } from './Profile/index';
import GroupIcon from "@material-ui/icons/Group";
import { NewGroupDialog } from './Group/index';
import { NewChannelDialog } from './Channel/index';

// { id: 1, name: "New Group", icon: <GroupIcon />},
// { id: 2, name: "New Channel", icon: <GroupIcon /> },

export default function DrawerText({ arr, toggleDrawer }) {
  debugger
  const [checked, setChecked] = useState(false);
  const [profile, setProfile] = useState(false)
  const [group, setGroup] = useState(false)
  const [channel, setChannel] = useState(false)
  const handleProfile = (e) => {
    setProfile(true)
  }
  const handleGroup = (e) => {
    setGroup(true)
  }
  const handleChannel = (e) => {
    setChannel(true)
  }
  const handleProfileClose = (e) => {
    setProfile(false)
    toggleDrawer()(e)
  }
  const handleGroupClose = (e) => {
    setGroup(false)
    toggleDrawer()(e)
  }
  const handleChannelClose = (e) => {
    setChannel(false)
    toggleDrawer()(e)
  }
  const handleClick = (e) => {
    toggleDrawer()(e)
  }
  return (
    <Grid item xs={12}>
      <List>
        <ListItem button onClick={handleGroup}>
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary="Group" />
        </ListItem>
        <ListItem button onClick={handleChannel}>
          <ListItemIcon><GroupIcon /></ListItemIcon>
          <ListItemText primary="Channel" />
        </ListItem>
        {arr.map((item) => (
          <ListItem disabled key={item.id} button onClick={handleClick}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        <ListItem button onClick={handleProfile}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <NightsStayIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
          <ListItemSecondaryAction>
            <Switch
              edge="end"
              onChange={() => setChecked((prev) => !prev)}
              checked={checked}
              inputProps={{ "aria-labelledby": "switch-list-label-bluetooth" }}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <SimpleDialog open={profile} onClose={handleProfileClose} />
      <NewGroupDialog open={group} onClose={handleGroupClose}/>
      <NewChannelDialog open={channel} onClose={handleChannelClose}/>
    </Grid>
  );
}
