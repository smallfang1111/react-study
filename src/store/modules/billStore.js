import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
const billStore = createSlice({
    name: 'bill',
    // 数据状态 state
    initialState: {
        billList: []
    },
    // 同步修改方法
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload
        }
    }
})

// 编写异步方法
export const getBillList = () => {
    return async (dispatch, getState) => {
        const res = await axios.get(' http://localhost:8888/billList')
        dispatch(setBillList(res.data))
    }
}

export const { setBillList } = billStore.actions
export default billStore.reducer