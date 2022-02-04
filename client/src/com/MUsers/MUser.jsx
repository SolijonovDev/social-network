import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Badge, ListItemSecondaryAction } from "@material-ui/core";
import { useHistory } from "react-router";
import { Link, NavLink,useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  item:{
    backgroundColor: "rgba(0,0,0,.2)",
    marginBottom:"10px"
  },
  active:{
    color:"red",
    marginBottom:"10px",
    backgroundColor: "rgba(0,0,0,.6)"
  }
}));

export default function MUser({ user }) {
  const history = useHistory();
  let id=user.type==="CHAT"?user.user_id:user.group_id
  const link="/"+user.type.toLowerCase()+'/'+id;
  const classes = useStyles();
  const location=useLocation()
  const active=location.pathname===link;
  return (
    <>
     <ListItem className={active?classes.active:classes.item} button onClick={() => history.push(link)}>
        <ListItemAvatar >
          <Avatar src={"http://localhost:7000/"+user.img} />
        </ListItemAvatar>
        <ListItemText primary={user.name} secondary={user.subText} />
        <ListItemSecondaryAction>
          {user.type==="GROUP"?
        <i className="fas fa-users"></i>  
        :user.type==="CHAT"?
        <i class="fas fa-user"></i>
        :
        <Badge color="secondary" badgeContent={4}>
        <NotificationsIcon />
      </Badge>
        }
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}
