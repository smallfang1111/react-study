import { Button, DatePicker, Input, NavBar } from "antd-mobile"
import classNames from "classnames"
import { Navigate } from "react-router-dom"
import './index.scss'
import Icon from "@/components/Icon"
import { billListData } from "@/contants"

const New = () => {
    return (
        <div className="keepAccount">
            <NavBar className="nav" onBack={() => Navigate(-1)}>记一笔
            </NavBar>
            <div className="header">
                <div className="kaType">
                    <Button shape="rounded" className={classNames('selected')}>支出</Button>
                    <Button shape="rounded" className={classNames('')}>收入</Button>
                </div>
                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type="calendar" className="icon"></Icon>
                            <span className="text">{'今天'}</span>
                            <DatePicker className="kaDate" title="记账日期" max={new Date()} />
                        </div>
                        <div className="kaInput">
                            <Input className="input" placeholder="0.00" type="number" />
                            <span className="iconYuan">￥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {
                    billListData['pay'].map(item => {
                        // console.log(item)
                        return (
                            <div className="kaType" key={item.type}>
                                <div className="title">{item.name}</div>
                                <div className="list">
                                    {item.list.map(childItem => {
                                        return (
                                            <div className={classNames('item', '')} key={childItem.type}>
                                                {/* <div className="icon"> </div> */}
                                                <i className={classNames('iconfont icon', childItem.type === 'drinks' ? 'icon-Drinks' : childItem.type === 'salary' ? 'icon-salary' : childItem.type === 'activity' ? 'icon-activity' : 'icon-study')} />

                                                <div> {childItem.name}</div>
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
                <Button className="btn save">保存</Button>
            </div>
        </div>
    )
}

export default New