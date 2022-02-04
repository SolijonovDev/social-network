import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';
import { IconButton } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from 'react-redux';


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
  }
});

export function ChannelDialog({ open, onClose }) {
  const {name,id,img,status}=useSelector(state=>state.channel)
  const classes = useStyles();

  return (
    <Dialog className={classes.dialog} onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
     <div className={classes.header}>
     <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="h6">id:{id}</Typography>
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
    </MuiDialogTitle>
     </div>
      <List>
      <ListItem>
          <ListItemAvatar>
          <Avatar alt="Remy Sharp"
           src={img?`http://localhost:7000/${img}`:null}
           className={classes.avatar}
        />
          </ListItemAvatar>
          <ListItemText primary={name} secondary="Name" />
        </ListItem>
        <ListItem>
          <ListItemText primary={status} secondary="status" />
        </ListItem>
      </List>
    </Dialog>
  );
}

