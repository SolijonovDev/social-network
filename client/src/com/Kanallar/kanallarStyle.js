import { makeStyles } from "@material-ui/core";

export const useKanallar = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100vh",
    background: "#9A9483",
    paddingLeft: " 20px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    boxSizing: "border-box",
    position: "relative",
  },
  loading:{
    display:"flex",
    width:"100%",
    height:"100%",
    justifyContent:"center",
    alignItems:"center"
  }
}));
export const useKheader = makeStyles((theme) => ({
  top: {
    right: "0",
    left: "0",
    top: "0px",
    position: "absolute",
    height: "45px",
    background: "#1F1D36",
    padding: "5px",
    color: "#fff",
  },
  text: {
    fontSize: "14px",
  },
  subText: {
    fontSize: "12px",
  },
}));
export const useKPosts = makeStyles(() => ({
  posts: {
    marginTop: "60px",
    marginBottom: "65px",
    width: "100%",
    height: "100%",
    background: "transparent",
    overflowY: "auto",
    ' &::-webkit-scrollbar':{
      width: '8px'
    },
    '&::-webkit-scrollbar-track':{
      background: 'transparent' 
    },
   '&::-webkit-scrollbar-thumb':{
      borderRadius:'8px',
      background: '#99A799'
    },
   '&::-webkit-scrollbar-thumb:hover':{
      background: 'black' 
    }
  },
}));
export const useKfooter = makeStyles(() => ({
  root: {
    backgroundColor: "#666",
    position: "absolute",
    bottom: "0",
    left: 0,
    right: 0,
    textAlign: "center",
    padding: "10px 0",
    fontSize: "20px",
  },
}));
