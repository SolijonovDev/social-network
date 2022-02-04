import { makeStyles } from "@material-ui/core/styles";

export const drawerStyles = makeStyles((theme) => ({
    drawer: {
      minWidth:250,
      width:"100%",
      flexShrink: 0,
      background: "rgba(0,0,0,.2)",
      overflow:"hidden"
    },
  }));


  export const dProfileStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        overflow:"hidden"
      },
    },
    profile: {
      padding: "15px 10px",
      background: "#1976f1",
    },
    photo: {
      marginBottom: "20px",
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    saved: {
      borderRadius: "50px",
    },
  }));