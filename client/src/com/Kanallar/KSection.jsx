import { Grid } from '@material-ui/core'
import React from 'react'
import ItemCard from './KItemCard'
import {useSelector} from 'react-redux'
import {useKPosts} from './kanallarStyle'

export default function KSection() {
    const {messages} = useSelector(state => state.channel)
    const classes=useKPosts()
    return (
        <Grid className={classes.posts} item xs={12}>
           {messages.map((message,index)=>(
            <React.Fragment key={index}>
                 <ItemCard message={message}/>
            </React.Fragment>
           ))}
        </Grid>
    )
}

