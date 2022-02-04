import { Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useKfooter } from './kanallarStyle'
import {useSelector,useDispatch} from 'react-redux'
import { channelSetMute } from '../../store/kanallar-reducer'
import Footer from './TextF'

export default function KFooter({channel}) {
    const {id}=useSelector(state=>state.user)
    const {admin} = useSelector(state => state.channel)
    const dispatch = useDispatch()
    const classes=useKfooter()
    const handleClick=()=>{
    //  dispatch(channelSetMute(!mute))
    }
     if(admin){
         return <Footer/>
     }
    return (
        <Grid className={classes.root} item>
            <Button fullWidth variant="text" onClick={handleClick}>
               {true? 'Unmute':'Mute'}
            </Button>
        </Grid>
    )
}
