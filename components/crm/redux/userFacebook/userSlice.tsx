import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserPayload = {
    idUser: string,
    img: string,
    name: string,
    password: string,
    isDoing: boolean,
    note: string
};

type InitialStateType = {
    user: UserPayload[];
    currentUser: any,
    total: number;
    isChange: boolean;
};

const initialState: InitialStateType = {
    user: [],
    currentUser: {},
    total: 0,
    isChange: false
};

const userFacebookSlice = createSlice({
  name: "facebookUser",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const newUser = action.payload as any;
      state.user.push(newUser);
      state.total += 1;
    },
    removeUser: (state, action) => {
        const lastUser = action.payload as any;
        
        state.user = lastUser;
        state.total -= 1;
    },
    changeUserSlice: (state, action) => {
      state.user = action.payload
    },
    initUser: (state, action) => {
      state.user = [];
      state.total = 0;
  },
  currentUserChat: (state, action) => {
    state.currentUser = action.payload as any;
  },
  changeMess: (state, action) => {
    state.isChange = action.payload;
  },
  }
});

export const  {
    addUser, removeUser, changeUserSlice, initUser, currentUserChat, changeMess
} = userFacebookSlice.actions;

export default userFacebookSlice.reducer;