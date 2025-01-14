import React from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App'
import router from '@/router'
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '@/store'
// 导入定制主题样式
import '@/theme.css'

// 这里 是学习路由所写的
// import { RouterProvider } from 'react-router-dom';
// import router from './router';// 导入路由


// import { Provider } from 'react-redux'
// import store from './store'
// 注入store 这里是学习react-redux所写的
// const root = createRoot(document.getElementById('root'))
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// )

// 1. 创建router实例对象并且配置路由对应关系 这里是学习react-router所写的
// const root = createRoot(document.getElementById('root'))
// root.render(
//   <React.StrictMode>
//     {/* 路由绑定 */}
//     <RouterProvider router={router} />
//   </React.StrictMode>
// )

// 这里是做记账本项目所写的
const root = createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
)
