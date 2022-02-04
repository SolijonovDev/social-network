import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import Button from '../../assets/Button'
import Input from '../../assets/Input'
import './login.scss'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../assets/Loading'
import { changeAuthMessageAc, loginthunk } from '../../store/auth-reducer';


export default function Login() {
    const [email,setEmail]=useState('') 
    const [emailError,setEmailError]=useState(false) 
    const [password,setPassword]=useState('') 
    const [passwordError,setPasswordError]=useState(false) 
    const dispatch=useDispatch()
    const {isLoading,message}=useSelector(state=>state.auth)

    const changeEmail=(e)=>{
        setEmail(e.target.value)
        if(emailError){
            setEmailError(false)
        }
    }
    const changePassword=(e)=>{
        setPassword(e.target.value)
        if(passwordError){
            setPasswordError(false)
        }
    }
    const handleClick=(e)=>{
        debugger
        e.preventDefault()
        const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(email).toLowerCase())) {
        return setEmailError(true)
      }
      if(password.length<4||password.length>20){
         return setPasswordError(true)
      }
      if(!emailError&&!passwordError){
        dispatch(loginthunk(email,password))
      }
    }
    if(message){
        alert(message)
        dispatch(changeAuthMessageAc(""))
    }
    if(isLoading){
        return <Loading/>
    }
    return (
        <div className='login'>
           <div className="inner">
              <h1>Login</h1>
              <form >
                  <Input 
                  type={"text"} 
                  value={email}
                  error={emailError}
                  onChange={changeEmail}
                  placeholder={"Email"}/>
                  {emailError&& <p className="error-text">
                       bad email
                   </p>}
                  <Input 
                  error={passwordError}
                  type={"password"} 
                  value={password}
                  onChange={changePassword}
                  placeholder={"Password"}/>
                 {passwordError&& <p className="error-text">
                      min 4 max 20
                   </p>}
                  <Button
                   text="Send"
                   onClick={handleClick}
                   />
              </form>
              <Link to="/registration">Registration</Link>
           </div>
        </div>
    )
}