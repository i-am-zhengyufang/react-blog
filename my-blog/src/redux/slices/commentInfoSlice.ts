import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getInfo } from "@/api";

const initialState = {
    avatar: '',
    nickname: '',
    email: '',
    link: '',
    role: 'vistor',
}

export const getAdminInfo = createAsyncThunk("commentInfo/getAdminInfo", async (param, thunk) => {
    const res = await getInfo()
    return res
});

const commentInfoSlice = createSlice({
    name: 'commentInfo',
    initialState,
    reducers: {
        setAvatar: (state, action: PayloadAction<string>) => {
            state.avatar = action.payload
        },
        setNickname: (state, action: PayloadAction<string>) => {
            state.nickname = action.payload
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setLink: (state, action: PayloadAction<string>) => {
            state.link = action.payload
        },
        setInitState: (state) => {
            state.avatar = ''
            state.nickname = ''
            state.email = ''
            state.link = ''
            state.role = 'vistor'
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getAdminInfo.fulfilled, (state, action) => {

            const { name = '', avatar = '', email = '', role = '' } = action.payload
            state.nickname = name
            state.avatar = avatar
            state.email = email
            state.role = role
        })
    }
})


export const { setAvatar, setNickname, setEmail, setLink, setInitState } = commentInfoSlice.actions
export default commentInfoSlice.reducer