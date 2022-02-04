import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import DialogHeader from "./DialogHeader";
import DialogMessages from "./DialogMessages/DialogMessages";
import DialogField from "./DialogField";
import { useSelector, useDispatch } from 'react-redux';
import { getChatThunk, setTextChatAc } from "../../store/chat-reducer";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height:"100%",
    maxWidth:"100vw",
    maxHeight:"100vh",
    background: "#9A9483",
    paddingLeft: "20px",
    boxSizing: "border-box",
    position: "relative",
    padding:"60px 0"
  },
  loading:{
    display:"flex",
    width:"100%",
    height:"100%",
    justifyContent:"center",
    alignItems:"center"
  }
}));

const Chats = ({match}) => {
  const classes = useStyles();
  let id=match.params.id;
  const {chats}=useSelector(state=>state.user)
  const {isLoading}=useSelector(state=>state.chat)
  const dispatch=useDispatch()
  useEffect(async ()=>{
     chats.forEach(s=>{
       if(s.user_id==id){
         dispatch(getChatThunk(s.group_id,id))
       }
     })
     dispatch(setTextChatAc(""))
  },[id])

  if(isLoading.includes(id)){
    return <div>Loading</div>
  }

  return (
    <div className={classes.root}>
      <DialogHeader />
      <DialogMessages />  
      <DialogField />
    </div>
  );
};

export default Chats;
