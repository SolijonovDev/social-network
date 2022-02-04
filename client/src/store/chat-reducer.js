import { chatApi } from "../http/chat";
import { usersAddChatsAc } from "./user-reducer";

const SET_CHAT="CHAT/SET_CHAT"
const ADD_LOADING="CHAT/ADD_LOADING"
const SET_TEXT="CHAT/SET_TEXT"
const SET_MESSAGES="CHAT/SET_MESSAGES"

const initialState={
    text:"",
    isLoading:[],
    chat_id:"",
    name:"",    
    id:"",
    status:"",
    img:"",
    messages:[],
    chats:new Map(),
}

export const chatReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_TEXT:{
            return {...state,text:action.payload}
        }
        case SET_MESSAGES:{
            return {...state,messages:action.payload}
        }
        case SET_CHAT:{  
            return {...state,
                chat_id:action.id,
                name:action.payload.name,
                id:action.payload.id,
                status:action.payload.status,
                img:action.payload.img,
                messages:action.messages,
                chats:state.chats.set(action.payload.id,action.payload)
            }
        }
        case ADD_LOADING:{
            let arr;
            if(action.has){
                arr=[...state.isLoading,action.payload]
            }else{
                arr=state.isLoading.filter(s=>s!==action.payload)
            }
            return {...state,isLoading:arr}
        }
        default:{
            return state;
        }
    }
}
const getChatAc=(id,payload,messages)=>({
    type:SET_CHAT,payload,messages,id
})
const addLoadingChatAc=(has,payload)=>({
    type:ADD_LOADING,has,payload
})
export const setTextChatAc=(payload)=>({
    type:SET_TEXT,payload
})
export const setMessagesChatAc=(payload)=>({
    type:SET_MESSAGES,payload
})

export const sendMessageChatThunk=(text,id)=>async(dispatch)=>{
    try{
          const res=await chatApi.sendMessage(text,id)
          if(res.status===200){
              dispatch(setMessagesChatAc(res.data.messages))
          }
    }catch(e){
        console.log("Error");
    }
}
export const sendPhotoChatThunk=(formData,id)=>async(dispatch)=>{
    try{
          const res=await chatApi.sendPhoto(formData,id)
          if(res.status===200){
            dispatch(setMessagesChatAc(res.data.messages))
          }
    }catch(e){
        console.log("Error");
    }
}
export const createNewChatThunk=(id)=>async(dispatch)=>{
   try{
       const res=await chatApi.create(id)
       console.log("new chat",res.data.chat);
       if(res.status===200){
           dispatch(usersAddChatsAc(res.data.chatInfo))
           dispatch(getChatAc(res.data.chatInfo.group_id,res.data.chatInfo,res.data.messages))

       }
   }catch(e){
       console.log("Error");
   }
}
export const getChatThunk=(group_id,id)=>async(dispatch)=>{
   try{
       dispatch(addLoadingChatAc(true,id))
       const res=await chatApi.get(group_id)
       console.log("new chat",res.data.chat);
       if(res.status===200){
           dispatch(getChatAc(res.data.chat_id,res.data.user,res.data.messages))
       }
   }catch(e){
       console.log("Error");
   }finally{
    dispatch(addLoadingChatAc(false,id))
   }
}