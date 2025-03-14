import { Button, DatePicker, Input, NavBar } from "antd-mobile"
import classNames from "classnames"
import { useNavigate } from "react-router-dom"
import dayjs from 'dayjs'
import './index.scss'
import { billListData } from "@/contants"
import { useState } from "react"
import { addBillList } from '@/store/modules/billStore'
import { useDispatch } from "react-redux"

const New = () => {
    const navigate = useNavigate()
    const [billType, setBillType] = useState('pay')// income  控制支出收入的状态

    // 收集金额
    const [money, setMoney] = useState(0)
    const moneyChange = (val) => {
        setMoney(val)
    }

    // 时间选择
    const [Datevisible, setDateVisible] = useState(false)
    const [selectDate, setSelectDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'))
    const dateConfirm = (val) => {
        setSelectDate(dayjs(val).format('YYYY-MM-DD'))
        setDateVisible(false)
    }

    // 收集账单类型
    const [useFor, setUseFor] = useState('')
    const dispatch = useDispatch()
    // 保存账单
    const saveBill = () => {
        // 收集表单数据
        const data = {
            type: billType,
            money: billType === 'pay' ? -money : +money,
            date: selectDate,
            useFor: useFor
        }
        console.log(data)
        dispatch(addBillList(data))
        navigate(-1)
    }
    return (
        <div className="keepAccount">
            <NavBar className="nav" onBack={() => navigate(-1)}>记一笔
            </NavBar>
            <div className="header">
                <div className="kaType">
                    <Button shape="rounded" onClick={() => setBillType('pay')} className={classNames(billType === 'pay' && 'selected')}>支出</Button>
                    <Button shape="rounded" onClick={() => setBillType('income')} className={classNames(billType === 'income' && 'selected')}>收入</Button>
                </div>
                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date" onClick={() => setDateVisible(true)}>
                            <i className={classNames('iconfont icon icon-shengdanshu',)} />
                            <span className="text">{selectDate}</span>
                            <DatePicker
                                title='记账日期'
                                className="kaDate"
                                visible={Datevisible}
                                onClose={() => {
                                    setDateVisible(false)
                                }}
                                max={new Date()}
                                onConfirm={dateConfirm}
                            />

                        </div>
                        <div className="kaInput">
                            <Input className="input" placeholder="0.00" type="number" value={money} onChange={moneyChange} />
                            <span className="iconYuan">￥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {/* 数据状态 */}
                {billListData[billType].map((item) => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map((childItem) => {
                                    return (
                                        <div className={classNames('item', useFor===childItem.type && 'selected')} onClick={() => setUseFor(childItem.type)} key={childItem.type}>
                                            {/* <div className="icon"> </div> */}
                                            <i className={classNames('iconfont icon', childItem.type === 'drinks' ? 'icon-Drinks' : childItem.type === 'salary' ? 'icon-salary' : childItem.type === 'activity' ? 'icon-activity' : 'icon-study')} />
                                            <div className="text" > {childItem.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
                }
            </div>

            <div className="btns">
                <Button className="btn save" onClick={saveBill}>保存</Button>
            </div>
        </div>
    )
}

export default New