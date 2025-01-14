import axios from "axios";

const { createSlice } = require("@reduxjs/toolkit");

// 编写store 先定义同步部分
const foodStore = createSlice({
    name: 'food',
    initialState: {
        // 商品列表
        foodsList: [],
        // 菜单激活下标值
        activeIndex: 0,
        // 购物车列表
        cartList: []
    },
    reducers: {
        setFoodList(state, action) {
            state.foodsList = action.payload
        },
        changeActiveIndex(state, action) {
            state.activeIndex = action.payload
        },
        // 添加购物车
        addCart(state, action) {
            console.log(action,'addCart')
            // 是否添加过? 通过action.payload.id去cartList中匹配，匹配到了，添加过
            const target = state.cartList.find(item => item.id === action.payload.id)
            if (target) {
                target.count++
            } else {
                state.cartList.push(action.payload)
            }
        },
        inCount(state, action) {
            console.log(action,'inCount')
            const target = state.cartList.find(item => item.id === action.payload.id)
            target.count++
        },
        deCount(state, action) {
            console.log(action,'deCount')
            const target = state.cartList.find(item => item.id === action.payload.id)
            target.count--
            if (!target.count) {
                state.cartList.splice(state.cartList.indexOf(target), 1)
            }
        },
        clearCart(state){
            state.cartList=[]
        }
    }
})

// 异步获取部分 然后定义异步部分
const { setFoodList, changeActiveIndex, addCart, inCount, deCount,clearCart } = foodStore.actions
const fetchFoodList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3004/takeaway')
        dispatch(setFoodList(res.data))
    }
}

export { fetchFoodList, changeActiveIndex, addCart, inCount, deCount,clearCart }
export default foodStore.reducer