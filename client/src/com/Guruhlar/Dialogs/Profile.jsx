import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';
import { ListItemSecondaryAction } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { getGroupProfileThunk } from '../../../store/group-reducer';
import { createNewChatThunk } from '../../../store/chat-reducer';


const useStyles = makeStyles({
  dialog:{
    minWidth:400
  },
  header:{
    minWidth:400,
  },
  root: {
    margin: 0,
    padding: 16,
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    color:grey[500],
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
    marginRight:"60px"
  },
  large:{
   width:"100px",
   height:"100px"
  },
  photoBlock: {
    padding: "20px 40px",
    boxSizing:"border-box",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "darkblue"
  },
  btn: {
    padding: "5px 10px",
    width: "auto",
    margin: "15px 10px",
    borderRadius: "8px",
    border: "none",
    outline: "none"
  }
});

export function NewProfileDialog({ open, onClose,id,img }) {
  const dispatch=useDispatch()
  const history=useHistory()
  useEffect(()=>{
    if(open){
      dispatch(getGroupProfileThunk(id))
    }
  },[open])
  const {profile,profileLoading}=useSelector(state=>state.group)
  const {chats}=useSelector(state=>state.user)

  const classes = useStyles();
  const handleSendMessage=()=>{
    let group_id;
    chats.forEach(s=>{
      if(s.user_id===id){
        group_id=s.group_id;
      }
    })
    if(!group_id){
    dispatch(createNewChatThunk(id))
   }
   history.push("/chat/"+id)
    onClose()
  }
  return (
    <Dialog className={classes.dialog} onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
    {
      profileLoading.includes(id)?
      <div>Loading</div>:<div>
 <div className={classes.header}>
     <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">Profile</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
    </MuiDialogTitle>
     </div>
      <List>
      <ListItem>
          <ListItemAvatar>
          <Avatar alt="Remy Sharp"
           src={profile.img?`http://localhost:7000/${profile.img}`:null}
           className={classes.avatar}
        />
          </ListItemAvatar>
          <ListItemText primary={profile.name} secondary="Name" />
        </ListItem>
        <ListItem>
          <ListItemText primary={profile.email} secondary="Email" />
        </ListItem>
          {profile.status&&    <ListItem>
          <ListItemText primary={profile.status} secondary="Status" />
          <ListItemSecondaryAction>
          </ListItemSecondaryAction>
        </ListItem>}
      </List>
      <Button 
      variant='text'  
      onClick={handleSendMessage}
      color="primary">
        Send Message
        </Button>
      </div>
    }
    </Dialog>
  );
}

