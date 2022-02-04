import React from 'react'
import './input.scss'

export default function Input({type,placeholder,error,value,onChange}) {
    return (
      <input
      className={error?'style_input error':"style_input"} 
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange}/>
    )
}