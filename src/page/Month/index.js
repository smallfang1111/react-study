import { NavBar, DatePicker } from 'antd-mobile'
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import './index.scss'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from '@/page/Month/components/dailyBill'


const Month = () => {
    const [dateSelectorVisible, setDateSelectorVisible] = useState(false) // 时间选择器是否显示
    //控制时间显示
    //    按月做数据的分组
    const billList = useSelector(state => state.bill.billList)
    console.log(billList,'no;;')
    const monthGroup = useMemo(() => {
        // return 出去计算之后的值
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    }, [billList])
    const [currentDate, setCurrentDate] = useState(() => dayjs(new Date()).format('YYYY-MM'))
    const [currentMonthList, setMonthList] = useState([])
    const monthResult = useMemo(() => {
        // 支出  // 收入  // 结余
        let pay = 0, income = 0, total = 0
        if (currentMonthList) {
            pay = currentMonthList.filter(i => i.type === 'pay').reduce((a, c) => a + c.money, 0)
            income = currentMonthList.filter(i => i.type === 'income').reduce((a, c) => a + c.money, 0)
            return { pay, income, total: income + pay }
        }
        return { pay, income, total }
    }, [currentMonthList])
    // 在初始化的时候把当前月的统计数据显示出来
    useEffect(() => {
        const nowDate = dayjs().format('YYYY-MM')
        if (monthGroup[nowDate]) {
            setMonthList(monthGroup[nowDate])
        }

    }, [monthGroup])
    const onConfirm = (date) => {
        setDateSelectorVisible(false)
        const formatDate = dayjs(date).format('YYYY-MM')
        setMonthList(monthGroup[formatDate])
        setCurrentDate(formatDate)
    }
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
                                <span className='money'>{monthResult.pay}</span>
                                <span className='type'>支出</span>
                            </div>
                            <div className='item'>
                                <span className='money'>{monthResult.income}</span>
                                <span className='type'>收入</span>
                            </div>
                            <div className='item'>
                                <span className='money'>{monthResult.total}</span>
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
                    <DailyBill />
                </div>
            </div>

        </>

    )
}

export default Month