import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './reg.scss'
import Input from './../../assets/Input/index';
import Button from '../../assets/Button'
import Loading from './../../assets/Loading/index';
import { changeAuthMessageAc, registrationThunk } from '../../store/auth-reducer';


export default function Registratsiya() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const dispatch = useDispatch()
    const { isLoading,message} = useSelector(state => state.auth)
    const changeEmail = (e) => {
        setEmail(e.target.value)
        if(emailError){
            setEmailError(false)
        }
    }
    const changeName = (e) => {
        setName(e.target.value)
        if(nameError){
            setNameError(false)
        }
    }
    const changePassword = (e) => {
        setPassword(e.target.value)
        if(passwordError){
            setPasswordError(false)
        }
    }
    const handleClick = (e) => {
        e.preventDefault()
        if (!name) {
            return setNameError(true)
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            return setEmailError(true)
        }
        if (password.length < 4 || password.length > 20) {
            return setPasswordError(true)
        }
        dispatch(registrationThunk(name, email, password))
    }
    if(message){
        alert(message)
        dispatch(changeAuthMessageAc(""))
    }
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className='registratsiya'>
            <div className="inner">
                <h1>Registratsiya</h1>
                <form >
                    <Input type={"text"}
                        error={nameError}
                        placeholder={"Ism"}
                        value={name}
                        onChange={changeName} />
                    {nameError && <p className='error-text'>
                        Name empty
                    </p>}
                    <Input
                        error={emailError}
                        type={"text"}
                        value={email}
                        onChange={changeEmail}
                        placeholder={"Email"} />
                    {emailError && <p className='error-text'>
                        Bad email
                    </p>}
                    <Input
                        error={passwordError}
                        type={"password"}
                        value={password}
                        onChange={changePassword}
                        placeholder={"Password"} />
                    {passwordError && <p className='error-text'>
                        min 4 max 20
                    </p>}
                    <Button
                        text="Send"
                        onClick={handleClick}
                    />
                </form>
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}