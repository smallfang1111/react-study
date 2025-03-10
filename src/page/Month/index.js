import { NavBar, DatePicker } from 'antd-mobile'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import './index.scss'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from '@/page/Month/components/DailyBill'

// useMemo 在每次重新渲染的时候能够缓存计算的结果
// useSelector 使得 React 组件可以从 Redux store 中读取数据

const Month = () => {
    // 时间选择器是否显示
    const [dateSelectorVisible, setDateSelectorVisible] = useState(false)

    //    按月做数据的分组
    const billList = useSelector(state => state.bill.billList)

    // useMemo 类似 计算属性 这是一个按月分组的功能，为什么要按月分组，因为后端返回的数组是简单平铺的，不是按月划分好的，我们要做的功能是要以月为单位的统计
    const monthGroup = useMemo(() => {
        // return 出去计算之后的值
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    }, [billList])


    // 当前时间
    const [currentDate, setCurrentDate] = useState(() => dayjs(new Date()).format('YYYY-MM'))

    const [currentMonthList, setMonthList] = useState([])
    const monthResult = useMemo(() => {
        // 支出  // 收入  // 结余
        let pay = 0, income = 0, total = 0 // 设置初始值
        if (currentMonthList&&currentMonthList.length) {
            pay = currentMonthList.filter(i => i.type === 'pay').reduce((a, c) => a + c.money, 0)
            income = currentMonthList.filter(i => i.type === 'income').reduce((a, c) => a + c.money, 0)
            return { pay, income, total: income + pay }
        }
        return { pay, income, total }
        // 根据依赖项currentMonthList 的值来计算选择的月份的支出，收入，结余
    }, [currentMonthList])


    // 点击时间确认按钮之后，把当前月的统计数据计算出来显示到页面中
    const onConfirm = (date) => {
        setDateSelectorVisible(false)
        const formatDate = dayjs(date).format('YYYY-MM')
        setMonthList(monthGroup[formatDate])// 设置选择的月份的账单数据列表
        setCurrentDate(formatDate)
    }

    
    // 在初始化的时候把当前月的统计数据显示出来
    useEffect(() => {
        const nowDate = dayjs().format('YYYY-MM')
        if (monthGroup[nowDate]) {
            setMonthList(monthGroup[nowDate])
        }
    }, [monthGroup])

    // 当前月按照日来做分组
    const dayGroup = useMemo(() => {
        // 做空判断
        if(!currentMonthList?.length) return {}
        const monthList=currentMonthList.sort((a,b)=>a.date.localeCompare(b.date)) // 按照日期排序
        // return 出去计算之后的值
        const groupDate=_.groupBy(monthList, (item) => dayjs(item.date).format('YYYY-MM-DD'))
        const keys=Object.keys(groupDate)
        return {
            groupDate,keys
        }
    }, [currentMonthList])
    return (
        <>
            <div className='monthlyBill'>
                <NavBar className="nav" backArrow={false}>月度账单</NavBar>
                <div className='content'>
                    <div className='header'>
                        {/* 时间切换区域 */}
                        <div className='date' onClick={() => setDateSelectorVisible(true)}>
                            <span className='text'>
                                {currentDate}月账单
                            </span>
                            <span className={classNames('arrow', dateSelectorVisible && 'expand')}></span>
                        </div>
                        {/* 统计区域 */}
                        <div className='twoLineOverview'>
                            <div className='item'>
                                <span className='money'>{monthResult.pay.toFixed(2)}</span>
                                <span className='type'>支出</span>
                            </div>
                            <div className='item'>
                                <span className='money'>{monthResult.income.toFixed(2)}</span>
                                <span className='type'>收入</span>
                            </div>
                            <div className='item'>
                                <span className='money'>{monthResult.total.toFixed(2)}</span>
                                <span className='type'>结余</span>
                            </div>
                        </div>
                        {/* 时间选择器 */}
                        <DatePicker
                            className="kaDate"
                            title='记账日期'

                            precision="month"
                            visible={dateSelectorVisible}
                            onClose={() => {
                                setDateSelectorVisible(false)
                            }}
                            onCancel={() => {
                                setDateSelectorVisible(false)
                            }}
                            max={new Date()}
                            onConfirm={onConfirm}
                        />

                    </div>
                    {/* 单日账单列表 */}
                    {dayGroup.keys?.map((key,index)=>{
                     
                        return <DailyBill key={key} index={index} date={key} billList={dayGroup.groupDate[key]} />
                    })}
                   
                </div>
            </div>

        </>

    )
}

export default Month