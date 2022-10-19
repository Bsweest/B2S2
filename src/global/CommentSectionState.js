import { observable } from "@legendapp/state"

export default CommentSectionState = observable({ 
    isOpen: false,
    fetchID: null,
})

export const closeCommentSection = () => {
    CommentSectionState.set({
        isOpen: false,
        fetchID: null,
    })
}