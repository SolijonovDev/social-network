import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useSelector } from "react-redux";
import HisMessage from "./HisMessage";
import MyMessage from "./MyMessage";

const useStyles = makeStyles(() => ({
  center: {
    width: "100%",
    maxHeight:"100%",
    background: "transparent",
    overflowY: "auto",
    " &::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "8px",
      background: "#99A799",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "black",
    },
    empty:{
        display:"flex",
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center"
    }
  },
}));

export default function DialogMessages() {
  const ref = React.useRef();
  const { messages } = useSelector((state) => state.chat);
  const { id } = useSelector((state) => state.user);
  console.log("messages",messages);
  React.useEffect(() => {
    // setTimeout(() => {
    //   ref.current.scrollIntoView({ block: "center", behavior: "smooth" });
    // }, 0);
  }, [messages]);
  const classes = useStyles();
  return (
    <Grid item container spacing={2} className={classes.center} xs={12}>
      {!messages.length&&<div className={classes.empty}>Empty</div>}
      {messages.map((message) => {
        if (message.user_id ===id) {
          return (
            <React.Fragment key={message._id}>
              <MyMessage message={message} />
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={message._id}>
              <HisMessage message={message} />
            </React.Fragment>
          );
        }
      })}
      <span ref={ref}></span>
    </Grid>
  );
}
