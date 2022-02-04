import AuthApi from '../http/auth';

const SET_CHANGE_LOADING="AUTH/CHANGE_LOADING"
const SET_CHANGE_COUNT="AUTH/CHANGE_COUNT"
const SET_AUTH="AUTH/SET_AUTH"
const SET_MESSAGE="AUTH/SET_MESSAGE"

const initialState={
  isAuth:true,
  message:"",
  isLoading:false,
  text:false,
  count:false
}

export const authReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_CHANGE_LOADING:{
            return {...state,isLoading:action.payload}
        }
        case SET_AUTH:{
            return {...state,isAuth:action.payload}
        }
        case SET_MESSAGE:{
            return {...state,message:action.payload}
        }
        case SET_CHANGE_COUNT:{
            return {...state,count:action.count}
        }
        default:{
            return state;
        }
    }
}
const changeLoadingAc=(payload)=>({
    type:SET_CHANGE_LOADING,payload
})
export const setAuthAc=(payload)=>({
    type:SET_AUTH,payload
})
export const changeAuthMessageAc=(payload)=>({
    type:SET_MESSAGE,payload
})

export const registrationThunk=(name,email,password)=>async (dispatch)=>{
   try{
    dispatch(changeLoadingAc(true))
    const res=await AuthApi.registration(name,email,password)
    if(res.status===200){
        localStorage.setItem('token',res.data.token)
        dispatch(setAuthAc(true))
    }else{
        dispatch(changeAuthMessageAc(res.data.messge))
    }
   }catch(e){
       console.log("error")
       dispatch(changeAuthMessageAc("Error"))
   }finally{
       dispatch(changeLoadingAc(false))
   }
}
export const loginthunk=(email,password)=>async (dispatch)=>{
  try{
    dispatch(changeLoadingAc(true))
    const res=await AuthApi.login(email,password)
    if(res.status===200){
        localStorage.setItem('token',res.data.token)
        dispatch(setAuthAc(true))
    }else{
        dispatch(changeAuthMessageAc(res.data.messge))
    }
  }catch(e){
      console.log("Error");
      dispatch(changeAuthMessageAc("Error"))
  }finally{
    dispatch(changeLoadingAc(false))
}
}

