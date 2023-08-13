import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null,
        name: null,
        email: null,
        avatar: null,
        isRefreshing: false,
    },
    reducers: {
        updateUser: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            name: payload.name,
            email: payload.email,
            avatar: payload.avatar,
        }),
         updateUserAvatar: (state, { payload }) => ({
            ...state,
            avatar: payload.avatar,
        }),
        stateChange: (state, { payload }) => ({
            ...state, 
            isRefreshing: payload.isRefreshing,
        }),
        logOut: () => ({ userId: null, name: null, email: null, avatar: null, isRefreshing: false })
    }
});

export const { updateUser, updateUserAvatar, stateChange, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;