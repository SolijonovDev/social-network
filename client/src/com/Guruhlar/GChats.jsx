import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useSelector } from "react-redux";
import MyMessages from "./MyMessages";
import TheyMessages from "./TheyMessages";

const useStyles = makeStyles(() => ({
  center: {
    width: "100%",
    maxHeight:"100%",
    background: "transparent",
    overflowY: "auto",
    border:"1px solid red",
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

export default function Chats() {
  let down=false;
  const { id } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.group);
  const classes = useStyles();
  const ref = React.useRef()
  // React.useEffect(() => {
  //   console.log("ref",ref);
  //   if(down){
  //     setTimeout(() => {
  //       ref.current.scrollIntoView({ block: "center", behavior: "smooth" });
  //     }, 0);
  //   }
  // }, [messages]);
  down=true;
  return (
    <Grid item container spacing={2} 
    justifyContent="flex-start" className={classes.center} xs={12}>
      {!messages?.length?
     <div className={classes.empty}>Empty</div>
     :
     messages.map((message) => {
      if (message.user_id ===id) {
        return (
          <React.Fragment key={message.user_id}>
            <MyMessages message={message} />
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={message.user_id}>
            <TheyMessages message={message} />
          </React.Fragment>
        );
      }
    })
    }
      <span ref={ref}></span>
    </Grid>
  );
}
