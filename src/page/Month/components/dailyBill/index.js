
import './index.scss'
const DailyBill = () => {
    return (
        <div className="dailyBill">
            <div className="header">
                <div className="dateIcon">
                    <span className="date"></span>
                    <span className="arrow"></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">100</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">100</span>
                    </div>
                    <div className="balance">
                        <span className="money">100</span>
                        <span className="type">结余</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DailyBill