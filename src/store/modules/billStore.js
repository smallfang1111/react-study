import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

// https://redux-toolkit.js.org/tutorials/quick-start
const initialState={
    billList: []
}
const billStore = createSlice({
    name: 'bill',
    // 数据状态 state
    initialState,
    reducers: {
        // 同步修改方法
        setBillList(state, action) {
            state.billList = action.payload
        },
        // 同步添加账单方法
        addBill(state,action){
            state.billList.push(action.payload)
        }
    }
})

// 编写异步方法
export const getBillList = () => {
    return async (dispatch) => {
        // 使用了json-server的get 请求 获取数据
        const res = await axios.get(' http://localhost:8888/billList')
        dispatch(setBillList(res.data))
    }
}

export const addBillList=(data)=>{
    return async (dispatch) => {
        // 使用了json-server的post 请求 set数据
        const res = await axios.post(' http://localhost:8888/billList',data)
        dispatch(addBill(res.data))
    }

}


export const { setBillList,addBill } = billStore.actions
export default billStore.reducer