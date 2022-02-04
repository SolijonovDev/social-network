import React from 'react'
import './button.scss'

export default function Button({value,onClick,text}) {
    return (
        <button 
        className='style_button'
        onClick={onClick}>
            {text}
        </button>
    )
}