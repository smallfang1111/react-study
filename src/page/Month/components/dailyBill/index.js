
import classNames from 'classnames'
import './index.scss'
import { billTypeToName } from '@/contants'

import { useMemo, useState } from 'react'
// 接收父组件传过来的数据
const DailyBill = ({ date, billList, index }) => {
    const dayResult = useMemo(() => {
        // 支出  // 收入  // 结余
        let pay = 0, income = 0, total = 0 // 设置初始值
        if (billList && billList.length) {
            pay = billList.filter(i => i.type === 'pay').reduce((a, c) => a + c.money, 0)
            income = billList.filter(i => i.type === 'income').reduce((a, c) => a + c.money, 0)
            return { pay, income, total: income + pay }
        }
        return { pay, income, total }
        // billList 的值来计算选择的月份的支出，收入，结余
    }, [billList])

    // 控制展开收起
    const [visible, setVisible] = useState(false)
    return (
        <div className="dailyBill">
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    <span className={classNames('arrow', visible && 'expand')} onClick={() => setVisible(!visible)}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{dayResult.pay.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">{dayResult.income.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="money">{dayResult.total.toFixed(2)}</span>
                        <span className="type">结余</span>
                    </div>
                </div>
            </div>

            {/* 单日列表 */}
            <div className="billList" style={{ display: visible ? 'block' : 'none' }}>
                {billList.map(item => {
                    return (
                        <div className="bill" key={item.id}>
                            <div className="detail">

                                <div className="billType">{billTypeToName[item.useFor.toUpperCase()]} </div>
                            </div>
                            <div className={classNames('money', item.type)}>
                                {item.money?.toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DailyBill