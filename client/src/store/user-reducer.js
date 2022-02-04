import { UserApi } from "../http/user";
import { setAuthAc } from "./auth-reducer";

const SET_DRAWE="SET_DRAWE"
const SET_USERS="USER/SET_USERS"
const ADD_CHATS="USER/ADD_CHATS"
const SET_NAME_EMAIL="USER/SET_NAME_EMAIL"
const SET_LOADING="USER/SET_LOADING"
const CHANGE_NAME="USER/CHANGE_NAME"
const CHANGE_STATUS="USER/CHANGE_STATUS"
const CHANGE_PHOTO="USER/CHANGE_PHOTO"

const initialState={
    name:"",
    email:"",
    status:"",
    img:"",
    id:"",
    isLoading:false,
   chats:[
   ],
   drawer:false
}
const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case CHANGE_NAME:{
            return {...state,name:action.payload}
        }
        case CHANGE_STATUS:{
            return {...state,status:action.payload}
        }
        case ADD_CHATS:{
            return {...state,chats:[action.payload,...state.chats]}
        }
        case CHANGE_PHOTO:{
            return {...state,img:action.payload}
        }
        case SET_NAME_EMAIL:{
            return {...state,name:action.name,
                email:action.email,
                status:action.status,
                img:action.img,
                id:action.id
            }
        }
        case SET_LOADING:{
            return {...state,isLoading:action.payload}
        }
        case SET_USERS:{
            return {...state,chats:action.payload}
        }
        case SET_DRAWE:
            return {...state,drawer:action.payload}
        default:
            return state;
    }
}
export default userReducer;

const usersChangeAc=(payload)=>({
    type:SET_USERS,payload
})
export const usersAddChatsAc=(payload)=>({
    type:ADD_CHATS,payload
})
const userNameEmailChangeAc=(id,name,email,status,img)=>({
    type:SET_NAME_EMAIL,name,email,status,img,id
})
const changeLoadingAc=(payload)=>({
    type:SET_LOADING,payload
})
const userChangeNameAc=(payload)=>({
    type:CHANGE_NAME,payload
})
const userChangeStatusAc=(payload)=>({
    type:CHANGE_STATUS,payload
})
const userChangePhotoAc=(payload)=>({
    type:CHANGE_PHOTO,payload
})

export const userThunk=async (dispatch)=>{
    debugger
  try{
      dispatch(changeLoadingAc(true))
      const res=await UserApi.getUser()
      if(res.status===200){
          const user=res.data.user;
          dispatch(usersChangeAc(user.chats))
          dispatch(userNameEmailChangeAc(user._id,user.name,
            user.email,user.status,user.img))
      }
  }catch(e){
      console.log("Error"); 
      dispatch(setAuthAc(false))
  }finally{
      dispatch(changeLoadingAc(false))
  }
}
export const userchangeNameThunk=(name)=>async (dispatch)=>{
  try{
      const res=await UserApi.changeName(name)
      if(res.status===200){
          dispatch(userChangeNameAc(res.data.name))
      }
  }catch(e){
      console.log("Error");
  }
}
export const userchangeStatusThunk=(status)=>async (dispatch)=>{
  try{
      const res=await UserApi.changeStatus(status)
      if(res.status===200){
          dispatch(userChangeStatusAc(res.data.status))
      }
  }catch(e){
      console.log("Error");
  }
}
export const userFileUploadThunk=(formData)=>async (dispatch)=>{
  try{
    console.log("user change formdata",formData);
      const res=await UserApi.fileUpload(formData)
      if(res.status===200){
          dispatch(userChangePhotoAc(res.data.photo))
      }
  }catch(e){
      console.log("Error",e);
  }
}

export const setDrawer=(value)=>({
    type:SET_DRAWE,payload:value
})
