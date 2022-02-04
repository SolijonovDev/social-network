import { makeStyles } from "@material-ui/core";

export const useGFooter=makeStyles(()=>({
    bottom: {
        color: "#fff",
        right: "0",
        left: "0",
        bottom: "0",
        position: "absolute",
        height: "55px",
        background: "#678983",
      },
      input:{
       display:'none'
      },
      field:{
          fontSize:"16px",
          padding:"4px 15px",
          boxSizing:"border-box",
          marginTop:"8px",
          color:"#888",
          marginBottom:"-10px",
      }
}))
