import { observable } from "@legendapp/state"

export default SearchState = observable({ 
    hideTop: false,
})

export const openSearchDetail = () => {
    SearchState.set({
        hideTop: true,
    })
}

export const closeSearchDetail = () => {
    SearchState.set({
        hideTop: false,
    })
}