import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getBillList } from '@/store/modules/billStore'
import { TabBar } from 'antd-mobile'
import {
    BillOutline,
    AddCircleOutline,
    CalculatorOutline
} from 'antd-mobile-icons'
import './index.scss'

const tabs = [
    {
        key: '/',
        title: '月度账单',
        icon: <BillOutline />
    },
    {
        key: '/new',
        title: '记账',
        icon: <AddCircleOutline />
    },
    {
        key: '/year',
        title: '年度账单',
        icon: <CalculatorOutline />
    }
]
const Layout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])
    const navigate = useNavigate();
    const setRouteActive = (value) => {
        navigate(value)
    }
    return (
        <>
            <div className='layout'>
                <div className='container'>
                    {/* 配置二级路由的出口 */}
                    <Outlet />
                </div>
                
                <div className='footer'>
                    <TabBar onChange={value => setRouteActive(value)}>
                        {tabs.map(item => (
                            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                        ))}
                    </TabBar>
                </div>
            </div>

        </>

    )
}

export default Layout