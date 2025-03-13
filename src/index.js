import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import router from '@/router/index'
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from '@/store'

// 导入定制主题文件
import '@/theme.css'

// 这里是做记账本项目所写的
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    {/* <App /> 这个测试 */}
    <RouterProvider router={router} />
  </Provider>
);
