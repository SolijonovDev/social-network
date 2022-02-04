import { Grid } from '@material-ui/core'
import { useKanallar } from './kanallarStyle'
import KFooter from './KFooter'
import KHeader from './KHeader'
import KSection from './KSection'
import { useDispatch, useSelector } from 'react-redux';
import { channelSetAc } from '../../store/channel-reducer'
import { getChannelThunk } from './../../store/channel-reducer';
import { useEffect } from 'react';

export default function Channel({match}) {
    const id=match.params.id
    const classes=useKanallar()
    const dispatch=useDispatch()
    const {channels,isLoading}=useSelector(state=>state.channel)
    useEffect(()=>{
        if(channels.get(id)){
          dispatch(channelSetAc(channels.get(id)))
        }else{
          dispatch(getChannelThunk(id))
        }
    },[channels.size,id])

    if(!match.params.id){
      return <div>Not found</div>
    }
     if(isLoading.includes(id)){
       return <dis className={classes.loading}>Loading</dis>
     }
    return (
        <Grid item className={classes.root} container xs={12}>
           <KHeader />
           <KSection />
           <KFooter/>
        </Grid>
    )
}
