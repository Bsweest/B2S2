import { createSlice } from "@reduxjs/toolkit";

const init = {
    data: null,
}

const shareProfileSlice = createSlice({
    name: 'shareProfile',
    initialState: init,
    reducers: {
        openShareProfile: (state, action) => {
            state.data = action.payload;
        },
        closeShareProfile: () => (init)
    }
})

export const { openShareProfile, closeShareProfile } = shareProfileSlice.actions;

export default shareProfileSlice.reducer;