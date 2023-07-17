import { createSlice } from "@reduxjs/toolkit";

const initialState = false
const modalOpenSlice = createSlice({
    name: 'modalOpen',
    initialState,
    reducers: {
        setModalOpen: (state) => {
            return state = true
            // 记得加return要不然就报错说返回undefined，你需要返回一个新的state
        },
        setModalClose: (state) => {
            return state = false
        }
    }
})

// 不懂就点进去看看createslice函数 emmmm也比较懵
export const { setModalOpen, setModalClose } = modalOpenSlice.actions
export default modalOpenSlice.reducer