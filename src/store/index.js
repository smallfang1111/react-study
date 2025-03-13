// 组合子模块 导出store 实例
import { configureStore } from "@reduxjs/toolkit"
import billReducer from '@/store/modules/billStore'
import foodStore from "./modules/takeaway";
const store = configureStore({
    reducer: {
        bill:billReducer,
        foods: foodStore
    }
})

export default store