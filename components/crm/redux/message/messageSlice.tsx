import { createSlice } from "@reduxjs/toolkit";

type MessagePayload = {
  id_mess: string,
  mess: string,
  sent_time: string,
  type: string,
  url_img: boolean,
};

type InitialStateType = {
    message: MessagePayload[];
};

const initialState= {
    message: [],
    url: '',
};

const messageFacebookSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    changeMessage: (state, action) => {
      state.message = action.payload.messages;
    },
    addMessage: (state, action) => {
      state.message.unshift(action.payload);
    },

  }
});

export const  {
  changeMessage, addMessage
} = messageFacebookSlice.actions;

export default messageFacebookSlice.reducer;