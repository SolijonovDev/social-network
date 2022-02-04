const ADD_MESSAGE = "DIALOG/ADD_MESSAGE";

type userInfoType = {
  name: string | null;
  userName: string | null;
  lastName: string;
  phone: string;
  user_Id: number | string;
  photo: string | undefined;
};

type initialStateType = {
  userInfo: userInfoType;
  messages: any;
};
let initialState: initialStateType = {
  userInfo: {
    name: "Qodirjon",
    userName: "student",
    lastName: "Solijonov",
    phone: "+998 90 906 92 62",
    user_Id: "1",
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO-p9ThJctQTssrg3-NP4nUFYT_BH-AVQXOw&usqp=CAU",
  },
  messages: [
    { message_id: 110, text: "how are you?", user_Id: "45" },
    { message_id: 1, text: "hi", user_Id: "1" },
    { message_id: 2, text: "hi", user_Id: "1668" },
    { message_id: 4, text: "how are you?", user_Id: "45" },
    { message_id: 5, text: "how are you?", user_Id: "1" },
    { message_id: 6, text: "how are you?", user_Id: "45" },
    { message_id: 7, text: "how are you?", user_Id: "1" },
  ],
};

const dialogreduce = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_MESSAGE:
      if (action.payload) {
        const newMessage = {
          id: state.messages.length,
          text: action.payload,
          user_Id: state.userInfo.user_Id,
        };
        return { ...state, messages: [...state.messages, newMessage] };
      }
      return state;
    default:
      return state;
  }
};
export default dialogreduce;

type dialogAddMessageType = {
  type: typeof ADD_MESSAGE;
  payload: string | undefined | null;
};

export const dAddMessage = (value: string): dialogAddMessageType => ({
  type: ADD_MESSAGE,
  payload: value,
});
