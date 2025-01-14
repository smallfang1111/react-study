// 组合子模块 导出store 实例
import { configureStore } from "@reduxjs/toolkit"
import billReducer from '@/store/modules/billStore'
const store = configureStore({
    reducer: {
        bill:billReducer
    }
})

export default store