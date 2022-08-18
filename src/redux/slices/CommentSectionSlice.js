import { createSlice } from "@reduxjs/toolkit";

const commentSection = createSlice({
    name: 'commentSection',
    initialState: {
        isOpen: false,
        data: null,
    },
    reducers: {
        openCS: (state, action) => {
            state.isOpen = true;
            state.data = action.payload;
        },
        closeCS: (state) => {
            state.isOpen = false;
            state.data = null;
        }
    }
})

export const { openCS, closeCS } = commentSection.actions;

export default commentSection.reducer;