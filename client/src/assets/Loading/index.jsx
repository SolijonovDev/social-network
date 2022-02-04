import React from 'react'
import './loading.scss'

export default function Loading() {
    return (
        <div className='loading'>
           <div className="inner">
               <img src="https://flevix.com/wp-content/uploads/2019/07/Bubble-Preloader-1-1.gif" alt="gif"/>
           </div>
        </div>
    )
}