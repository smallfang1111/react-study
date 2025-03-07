# 别名路径配置
## 1.路径解析配置（webpack），把@/ 解析为 src/   插件是 craco插件
### CRA 本身把webpack 配置包装到了黑合里无法直接修改，需要借助插件craco
#### 配置步骤
##### 1.安装craco npm i-D @craco/craco
##### 2.项目根目录下创建配置文件 craco.config.js
##### 3.配置文件中添加路径解析配置
<!-- const path = require('path')
module.exports = {
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  }
} -->
##### 4.包文件中配置启动和打包命令
<!--   "scripts": {
    "start": "set PORT=2440 && craco start",
    "build": "craco build"
    } -->


## 2.路径联想配置 (Vscode),vscode 在输入@/ 时，自动联想出来对应的src/ 下的自己目录  jsconfig.json
<!-- {
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
} -->


# 什么是数据mock
## 在前后端分离的开发模式下，前端可以在没有实际后端接口的支持下先进性接口数据的模拟，进行正常的业务功能开发
## 市场常见的mock 方式
### 1.前端直接写假数据 -- 纯静态，没有服务
### 2.自研mock 平台 -- 成本太高
### 3.json-server等工具 -- 有服务，成本低
<!-- npm i -D json-server 
准备一个json文件
添加启动命令   "serve": "json-server ./server/billData.json --port 8888"
访问接口进行测试
-->

# antd-mobile 主题定制
## 定制方案
### 1.全局定制：整个应用范围内的组件都生效
<!--
:root:root{
  --adm-color-primary:#333
}
-->
### 2.局部定制：只在某些元素内部的组件生效
<!--
.purple-theme{
  --adm-color-primary:#333
}
-->
