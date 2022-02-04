import {Avatar,Grid,IconButton,Typography,} from "@material-ui/core";
import { BookmarkBorderOutlined } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useHistory } from "react-router";
import {useSelector} from 'react-redux'
import { dProfileStyles } from "./drawerStyle";


export default function DrawerProfile({toggleDrawer}) {
  const history = useHistory();
  const {name,email,img}=useSelector(state => state.user)
  const classes = dProfileStyles();
  const handleClose=(e)=>{
    toggleDrawer()(e)
    history.push('/saved_messages')
  }
  return (
    <Grid xs={12} className={classes.profile} item>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        item
        className={classes.photo}
        xs={12}
      >
        <div>
        <Avatar
            className={classes.large}
            src={img?`http://localhost:7000/${img}`:null}
            alt="Photo"
          />
        </div>
             <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleClose}
        >
           <BookmarkBorderOutlined
            edge="end"
              className={classes.saved}
              fontSize="small"
            />
           </IconButton>
      </Grid>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        item
        xs={12}
      >
        <div>
          <Typography>{name}</Typography>
          <Typography>{email}</Typography>
        </div>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <ExpandMoreIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
