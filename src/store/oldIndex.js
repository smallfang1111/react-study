import { configureStore } from "@reduxjs/toolkit";
import foodStore from "./modules/takeaway";

const store = configureStore({
    reducer: {
        foods: foodStore
    }
})

export default store