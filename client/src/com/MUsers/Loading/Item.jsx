import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import Skeleton from '@material-ui/lab/Skeleton';
import { ListItemSecondaryAction, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  item: {
    marginBottom: "10px"
  },
}));

export default function Item() {
  const classes = useStyles();
  return (
    <>
      <ListItem className={classes.item}>
        <ListItemAvatar >
          <Skeleton variant="circle" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText>
          <Skeleton variant="text" width={"90%"} height={40} />
        </ListItemText>
        <ListItemSecondaryAction>
          <Skeleton variant="circle" width={"20px"} height={20} />
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}