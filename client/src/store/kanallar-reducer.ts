import { posts } from "./data";

const CHANNEL_TEXT_CHANGE = "CHANNEL_TEXT_CHANGE";
const CHANNEL_ADD_POST = "CHANNEL_ADD_POST";
const CHANNEL_SET_NAME = "CHANNEL_SET_NAME";
const CHANNEL_SET_USERNAME = "CHANNEL_SET_USERNAME";
const CHANNEL_SET_MUTE = "CHANNEL_SET_MUTE";

type postsType = {
  id: number;
  message?: string[];
  photo?: string | null;
};
type initialStateType = {
  id: number;
  userName: string | null;
  mute: Boolean;
  name: string | null
  subscribers:string|number|undefined
  photoUrl: string | null | undefined;
  notification: number | string | undefined;
  posts: postsType[];
  newPost: string | null | undefined;
};
const initialState: initialStateType = {
  id: 1,
  name: "Footbal.tv",
  photoUrl: "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGJlYXV0aWZ1bHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  userName: "footbaluz",
  subscribers:"570000",
  notification: "5",
  mute: true,
  posts:posts,
  newPost: "Hello",
};

const channelReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANNEL_TEXT_CHANGE:
      return { ...state, newPost: action.text };
    case CHANNEL_SET_NAME:
      return { ...state, name: action.payload };
    case CHANNEL_SET_USERNAME:
      return { ...state, username: action.payload };
    case CHANNEL_SET_MUTE:
      return { ...state, mute: action.payload };
    case CHANNEL_ADD_POST:
      const newMessage = { id: state.posts.length, name: state.newPost };
      return state.newPost
        ? { ...state, chats: [...state.posts, newMessage], newPost: "" }
        : state;
    default:
      return state;
  }
};

export default channelReducer;

type guruhChangeTextType = {
  type: typeof CHANNEL_TEXT_CHANGE;
  text: string;
};
type channelSetMuteType = {
  type: typeof CHANNEL_SET_MUTE;
  payload: Boolean;
};

export const channelSetMute = (value: Boolean): channelSetMuteType => ({
  type: CHANNEL_SET_MUTE,
  payload:value,
});
export const channelChangeText = (text: string): guruhChangeTextType => ({
  type: CHANNEL_TEXT_CHANGE,
  text,
});
type channelAddTextType = {
  type: typeof CHANNEL_ADD_POST;
  id: number;
};
export const channelAddText = (id: number): channelAddTextType => ({
  type: CHANNEL_ADD_POST,
  id,
});
type channelSetNameType = {
  type: typeof CHANNEL_SET_NAME;
  payload: string;
};
export const channelSetName = (value: string): channelSetNameType => ({
  type: CHANNEL_SET_NAME,
  payload: value,
});
type channelSetUserNameType = {
  type: typeof CHANNEL_SET_USERNAME;
  payload: string;
};
export const channelSetUserName = (value: string): channelSetUserNameType => ({
  type: CHANNEL_SET_USERNAME,
  payload: value,
});
type channelAddMessageType = {
  type: typeof CHANNEL_ADD_POST;
  payload: string | number | null | undefined;
};
export const channelAddMessage = (value: string): channelAddMessageType => ({
  type: CHANNEL_ADD_POST,
  payload: value,
});
