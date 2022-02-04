import { makeStyles } from '@material-ui/core'
import GChats from './GChats';
import GFooter from './GFooter';
import GHeader from './GHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupThunk, groupSetAc } from '../../store/group-reducer';
import { useEffect } from 'react';

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

export default function Group({match}) {
    const id=match.params.id;
    const classes=useStyles()
    const dispatch=useDispatch()
    const {groups,isLoading}=useSelector(state=>state.group)
    useEffect(()=>{
      if(groups.get(id)){
        dispatch(groupSetAc(groups.get(id)))
      }else{
        dispatch(getGroupThunk(match.params.id))
      }
    },[groups.size,id])
    if(!match.params.id){
      return <div>Not found</div>
    }
    if(isLoading.includes(id)){
      return <div className={classes.loading}><span>Loading</span></div>
    }

    return (
        <div className={classes.root}>
            <GHeader/>
             <GChats/>
            <GFooter id={id}/>
        </div>
    )
}
