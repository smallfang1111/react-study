import { createBrowserRouter } from "react-router-dom"
import Layout from "../page/Layout"
import New from '../page/New'
import Month from "../page/Month"
import Year from "../page/Year"
// 创建路由实例，绑定path element
 const router=createBrowserRouter([
    {
        path:'/',
        element:<Layout />,
        children:[
            {
                // 默认路由
             index:true,
                element:<Month />
            },
            {
                path:'/year',
                element:<Year />
            }
        ]
    },
    {
        path:'/new',
        element:<New />
    }
 ])

 export default router