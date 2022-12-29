import React from "react";

export const PostContext = React.createContext({ post_id: 1 })
export const CommentContext = React.createContext({
    updateList: () => { }
})
