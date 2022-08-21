import { createSlice } from "@reduxjs/toolkit";

const init = {
    index: 0,
    data: null,
}

const searchDetailsSlice = createSlice({
    name: 'searchDetails',
    initialState: init,
    reducers: {
        openSD: (state, action) => {
            state.index = action.payload;
        },
        getSearchDetails: (state, action) => {
            state.data = action.payload;
        },
        removeSearchDetails: (state) => (init)
    }
})

export const { openSD, getSearchDetails, removeSearchDetails } = searchDetailsSlice.actions;

export default searchDetailsSlice.reducer;