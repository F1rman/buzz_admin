import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NavigationSliceType = {
    darkMode: boolean;
}


const initialState: NavigationSliceType = {
    darkMode: false
}


export const navigationSlice = createSlice({
    name: "navigationSlice",
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<boolean>) => {
            state.darkMode = action.payload;
        }
    },
});

export const navigationrActions = {
    ...navigationSlice.actions
}