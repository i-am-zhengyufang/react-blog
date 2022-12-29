import { configureStore } from '@reduxjs/toolkit'
import modalOpenReducer from './slices/modalOpenSlice'
import commentInfoReducer from './slices/commentInfoSlice'
export const store = configureStore({
    reducer: {
        modalOpen: modalOpenReducer,
        commentInfo: commentInfoReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch