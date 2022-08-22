import { createSlice } from "@reduxjs/toolkit";

const init = {
    data: null,
}

const searchDetailsSlice = createSlice({
    name: 'searchDetails',
    initialState: init,
    reducers: {
        getSearchDetails: (state, action) => {
            state.data = action.payload;
        },
        removeSearchDetails: (state) => (init)
    }
})

export const { getSearchDetails, removeSearchDetails } = searchDetailsSlice.actions;

export default searchDetailsSlice.reducer;