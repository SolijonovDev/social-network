const GURUH_TEXT_CHANGE="GURUH_TEXT_CHANGE";
const CHAT_SET_NAME="CHAT_SET_NAME";
const CHAT_SET_USERNAME="CHAT_SET_USERNAME";
const CHAT_ADD_MESSAGE="CHAT_ADD_MESSAGE";

type message={
    message_id:number|string
    text:string|string|null|undefined
    user_Id:string|number|null
    photo:string|null
}
type initialStateType={
    id:number
    userName:string| null
    name:string|null
    photoUrl:string|null|undefined
    notification:number|string|undefined
    messages:message[]
    newPost:string|null|undefined
}
const initialState:initialStateType={
        id:1,
        name:"Friends",
        photoUrl:"",
        userName:"friends",
        notification:'5',
        messages:[
            {message_id:1,text:"how are you?",user_Id:"2",photo:"https://images.unsplash.com/photo-1592772874383-d08932d29db7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGFja2VyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
            {message_id:2,text:"hi",user_Id:"1",photo:"https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGFsb25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
            {message_id:3,text:"hi",user_Id:"3",photo:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
            {message_id:4,text:"how are you?",user_Id:"2",photo:"https://images.unsplash.com/photo-1592772874383-d08932d29db7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGFja2VyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
            {message_id:5,text:"how are you?",user_Id:"3",photo:"https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Z2lybHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
            {message_id:6,text:"how are you?",user_Id:"1",photo:"https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGFsb25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
            {message_id:7,text:"how are you?",user_Id:"2",photo:"https://images.unsplash.com/photo-1592772874383-d08932d29db7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGFja2VyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"},
          ],
    newPost:"Hello"
}

const guruhlarReducer=(state=initialState,action:any)=>{
   
    switch(action.type){ 
      case GURUH_TEXT_CHANGE:
            return {...state,newPost:action.text}
      case CHAT_SET_NAME:
            return {...state,name:action.payload}
      case CHAT_SET_USERNAME:
            return {...state,username:action.payload}
      case CHAT_ADD_MESSAGE:
          if(state.newPost){
            const newMessage={message_id:state.messages.length,text:state.newPost,user_Id:'1',photo:"https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGFsb25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
            return state.newPost?{...state,messages:[...state.messages,newMessage],newPost:""}:state;
          } 
          return state;
      default:
            return state;
    }
}

export default guruhlarReducer;

type guruhChangeTextType={
    type:typeof GURUH_TEXT_CHANGE
    text:string
}

export const guruhChangeText=(text:string):guruhChangeTextType=>({
    type:GURUH_TEXT_CHANGE,text
})

type guruhSetNameType={
    type:typeof CHAT_SET_NAME
    payload:string
}
export const guruhSetName=(value:string):guruhSetNameType=>({
    type:CHAT_SET_NAME,payload:value
})
type guruhSetUserNameType={
    type:typeof CHAT_SET_USERNAME
    payload:string
}
export const guruhSetUserName=(value:string):guruhSetUserNameType=>({
    type:CHAT_SET_USERNAME,payload:value
})
type guruhAddMessageType={
    type:typeof CHAT_ADD_MESSAGE
    payload:string|number|null|undefined
}
export const guruhAddMessage=(value:string):guruhAddMessageType=>({
    type:CHAT_ADD_MESSAGE,payload:value
})
