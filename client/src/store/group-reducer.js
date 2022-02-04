import { UserApi } from '../http/user';
import { groupApi } from './../http/group';
import { usersAddChatsAc } from './user-reducer';
const SET_PHOTO = "GROUP/SET_PHOTO"
const SET_GROUP = "GROUP/SET_GROUP"
const SET_PROFILE = "GROUP/SET_PROFILE"
const ADD_GROUP = "GROUP/ADD_GROUP"
const ADD_MESSAGES = "GROUP/ADD_MESSAGES"
const ADD_LOADING = "GROUP/ADD_LOADING"
const ADD_PROFILE_LOADING = "GROUP/ADD_PROFILE_LOADING"

const initialState = {
    isLoading: [],
    group: {},
    name: "",
    id: "",
    status:"",
    img:"",
    users: [],
    messages: [],
    profile:{},
    profileLoading:[],
    groups: new Map(),
    newGroupPhoto: ""
}


export const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PHOTO: {
            return { ...state, newGroupPhoto: action.payload }
        }
        case SET_PROFILE: {
            return { ...state, profile: action.payload }
        }
        case ADD_LOADING: {
            let arr;
            if (action.has) {
                arr = [...state.isLoading, action.payload]
            } else {
                arr = state.isLoading.filter(s => s !== action.payload)
            }
            return { ...state, isLoading: arr }
        }
        case ADD_PROFILE_LOADING: {
            let arr;
            if (action.has) {
                arr = [...state.profileLoading, action.payload]
            } else {
                arr = state.profileLoading.filter(s => s !== action.payload)
            }
            return { ...state, profileLoading: arr }
        }
        case SET_GROUP: {
            return {
                ...state,
                 name: action.payload.name,
                id: action.payload._id,
                img:action.payload.img,
                status:action.payload.status,
                users: action.payload.users,
                messages: action.payload.messages,
            }
        }
        case ADD_MESSAGES: {
            return {
                ...state,
               messages:action.payload
            }
        }
        case ADD_GROUP: {
            return {
                ...state,
                name: action.payload.name,
                id: action.payload._id,
                status:action.payload.status,
                img:action.payload.img,
                users: action.payload.users,
                messages: action.payload.messages,
                groups: state.groups.set(action.payload._id, action.payload)
            }
        }
        default: {
            return state;
        }
    }
}

const groupSetPhotoAc = (payload) => ({
    type: SET_PHOTO, payload
})

export const groupSetAc = (payload) => ({
    type: SET_GROUP, payload
})
export const groupSetProfileAc = (payload) => ({
    type: SET_PROFILE, payload
})
export const addGroupAc = (payload) => ({
    type: ADD_GROUP, payload
})
export const addGroupLoadingAc = (has, payload) => ({
    type: ADD_LOADING, has, payload
})
export const addGroupProfileLoadingAc = (has, payload) => ({
    type: ADD_PROFILE_LOADING, has, payload
})
export const addGroupMessagesAc = (payload) => ({
    type: ADD_MESSAGES, payload
})
export const getGroupThunk = (id) => async (dispatch) => {
    try {
        dispatch(addGroupLoadingAc(true, id))
        const res = await groupApi.getGroup(id)
        if (res.status === 200) {
            dispatch(addGroupAc(res.data.group))
        }
    } catch (e) {
        console.log("Error");
    } finally {
        dispatch(addGroupLoadingAc(false, id))
    }
}
export const getGroupProfileThunk=(id)=>async (dispatch)=>{
    try{
      console.log("profile thunk get group");
        dispatch(addGroupProfileLoadingAc(true,id))
        const res=await UserApi.getUserInfo(id)
        dispatch(groupSetProfileAc(res.data.user))
    }catch(e){
        console.log("Error");
    }finally{
        dispatch(addGroupProfileLoadingAc(false,id))
    }
}
export const groupAddMessageThunk = (text, group_id) => async (dispatch) => {
    try {
        const res = await groupApi.add(text, group_id)
        if (res.status === 200) {
            dispatch(addGroupMessagesAc(res.data.messages))
        }
    } catch (e) {
        console.log("Error");
        alert("Error")
    }
}
export const groupAddPhotoThunk = (id,formData) => async (dispatch) => {
    try {
        const res = await groupApi.sendPhoto(id,formData)
        if (res.status === 200) {
            dispatch(addGroupMessagesAc(res.data.messages))
        }
    } catch (e) {
        console.log("Error");
        alert("Error")
    }
}

export const createNewGroupThunk = (name, status, img) => async (dispatch) => {
    try {
        const res = await groupApi.create(name, status, img);
        if (res.status === 200) {
            dispatch(usersAddChatsAc(res.data.group))
        }
    } catch (e) {
        console.log("Error", e);
    }
}
export const newGroupPhotoUploadThunk = (formData) => async (dispatch) => {
    try {
        debugger
        console.log("formda photo thunnk upload", formData);
        const res = await groupApi.photoUpload(formData);
        console.log(formData);
        if (res.status === 200) {
            dispatch(groupSetPhotoAc(res.data.img))
        }
    } catch (e) {
        console.log("Error", e);
    }
}