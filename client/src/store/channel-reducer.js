import { channelApi } from '../http/channel';
import { usersAddChatsAc } from './user-reducer';
const SET_PHOTO="CHANNEL/SET_PHOTO"
const SET_CHANNEL="CHANNEL/SET_CHANNEL"
const ADD_CHANNEL="CHANNEL/ADD_CHANNEL"
const SET_MESSAGES="CHANNEL/SET_MESSAGES"
const ADD_LOADING="CHANNEL/ADD_LOADING"
const ADD_MESSAGE="CHANNEL/ADD_MESSAGE"
const ADD_PHOTO="CHANNEL/ADD_PHOTO"
const ADD_TEXT="CHANNEL/ADD_TEXT"

const initialState={
    text:"",
    isLoading:[],
    channel:{},
    name:"",
    id:"",
    messages:[],
    admin:[],
    channels:new Map(),
    newChannelPhoto:""
}


export const channelReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_PHOTO:{
            return {...state,newChannelPhoto:action.payload}
        }
        case ADD_TEXT:{
            return {...state,text:action.payload}
        }
        case ADD_LOADING:{
            let newArr;
            if(action.has){
               newArr=[...state.isLoading]
               newArr.push(action.payload)
            }else{
                newArr=state.isLoading.filter(s=>s!==action.payload)
            }
            return {...state,isLoading: newArr}
        }
        case ADD_MESSAGE:{
            return {...state,messages:[...state.messages,{text:action.payload}]}
        }
        case ADD_PHOTO:{
            return {...state,messages:[...state.messages,{img:action.payload}]}
        }
        case SET_CHANNEL:{
            return {...state,  
                name:action.payload.name,
                id:action.payload.id,
                img:action.payload.img,
                messages:action.payload.messages,
                admin:action.payload.admin
            }
        }
        case SET_MESSAGES:{
            return {...state,channel:{...state.channel,messages:action.payload}}
        }
        case ADD_CHANNEL:{
            return {...state,
                name:action.payload.name,
                id:action.payload.id,
                img:action.payload.img,
                messages:action.payload.messages,
                admin:action.payload.admin,
            channels:state.channels.set(action.payload.id,action.payload)}
        }
        default:{
            return state;
        }
    }
}


const newChannelPhotoUploadAc=(payload)=>({
    type:SET_PHOTO,payload
})
export const addTextChannelAc=(payload)=>({
    type:ADD_TEXT,payload
})
const channelAddMessageAc=(payload)=>({
    type:ADD_MESSAGE,payload
})
export const channelSetAc=(payload)=>({
    type:SET_CHANNEL,payload
})
const addLoadingAc=(has,payload)=>({
    type:ADD_LOADING,has,payload
})
export const addChannelAc=(payload)=>({
    type:ADD_CHANNEL,payload
})
const addChannelPhotoAc=(payload)=>({
    type:SET_PHOTO,payload
})
const messageAddChannelPhooto=(payload)=>({
    type:ADD_PHOTO,payload
})

export const getChannelThunk=(id)=>async (dispatch)=>{
    try{
        dispatch(addLoadingAc(true,id))
       const res=await channelApi.getChannel(id)
       if(res.status===200){
           dispatch(addChannelAc(res.data.channel))
       }
    }catch(e){
        console.log("Error");
    }finally{
        dispatch(addLoadingAc(false,id))
    }
}
export const channelAddMessageThunk=(text,channel_id)=>async(dispatch)=>{
    try{
        dispatch(channelAddMessageAc(text))
       const res=await channelApi.add(text,channel_id)
    }catch(e){
        console.log("Error");
    }
}
export const createNewChannelThunk=(name,status,img)=>async (dispatch)=>{
    try{
        const res=await channelApi.create(name,status,img);
        if(res.status===200){
            dispatch(usersAddChatsAc(res.data.channel))
        }
    }catch(e){
        console.log("Error",e);
    }
}
export const addPhotoChannelThunk=(formData,id)=>async (dispatch)=>{
    try{
        const res=await channelApi.photo(formData)
        if(res.status===200){
            dispatch(messageAddChannelPhooto(res.data.img))
            channelApi.add("",id,res.data.img)
        }
    }catch(e){
        console.log("Error");
    }
}
export const newChannelPhotoUploadThunk=(formData)=>async (dispatch)=>{
    try{
        debugger
        const res=await channelApi.photoUpload(formData);
        if(res.status===200){
            dispatch(newChannelPhotoUploadAc(res.data.img))
        }
    }catch(e){
        console.log("Error",e);
    }
}