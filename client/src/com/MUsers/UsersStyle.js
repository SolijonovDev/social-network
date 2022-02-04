import { makeStyles } from '@material-ui/core/styles';

export const usersStyle = makeStyles(() => ({
    root: {
      width: '100%',
      position: 'relative',
      overflowY: 'auto',
      overflowX:"hidden",
      height:"100%",
      color:"#fff",
     ' &::-webkit-scrollbar':{
        width: '8px',
        background:"transparent"
      },
      '&::-webkit-scrollbar-track':{
        background: 'transparent',

      },
     '&::-webkit-scrollbar-thumb':{
        borderRadius:'8px',
        background: '#99A799'
      },
     '&::-webkit-scrollbar-thumb:hover':{
        background: 'black' 
      }
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    subheader:{
    color:"#fff"
    },
    ul: {
      listStyleType:"none",
      backgroundColor: 'inherit',
      padding: 0,
    },
  }));
  