import {Link,useNavigate} from 'react-router-dom'
const Login = () => {
    const navigate= useNavigate()
    return (
        <>
            <div>我是登录页</div>
           {/* 声明式导航 */}
            <Link to='/article'>跳转到文章页</Link>
            {/* 编程式导航 */}
            <button onClick={()=>navigate('/article')}>跳转到文章页</button>
            <button onClick={()=>navigate('/article?id=101&name=lily')}>searchParams传参</button>
            <button onClick={()=>navigate('/article/101/jack')}>params传参</button>
        </>
    )
}

export default Login