import Login from "../page/Login";
import Article from "../page/Article";
import { createHashRouter} from 'react-router-dom'
import Layout from "../page/Layout";
import About from "../page/About";
import Board from "../page/Board";
import NotFound from "../page/NotFound";

const router = createHashRouter([
    {
        path:'/',
        element:<Layout />,
        children:[
            {
                // index:true 表示默认路由
                // 一级路由访问的时候，他也能得到渲染
                index:true,
                element:<About />
            },
            {
                path:'/board',
                element:<Board />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    // 使用useSearchParams 传参
    // {
    //     path: '/article',
    //     element: <Article />
    // },
    // 使用useParams 传参
    {
        path: '/article/:id/:name',
        element: <Article />
    },
    {
        path:'*',
        element:<NotFound />
    }
])

export default router