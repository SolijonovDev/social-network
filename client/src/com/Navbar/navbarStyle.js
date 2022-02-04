import { alpha, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      height:"60px",
      marginBottom:"5px",
      position:"absolute",
      top:0,
      left:0,
      right:0,
      zIndex:"10"
    },
    appBar:{
    backgroundColor:"rgba(0,0,0,.8)",
    padding:"0px"
    },
    menuButton: {
      marginRight:0,
    },
    search: {
      flex:"1",
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width:"100%"
    },
    inputInput: {
      width:"100%",
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%'
    },
  }));