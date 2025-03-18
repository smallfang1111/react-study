import './index.scss'
import CommonCpn from '@/page/Month/components/CommonCpn'
// useMemo 在每次重新渲染的时候能够缓存计算的结果
// useSelector 使得 React 组件可以从 Redux store 中读取数据

const Month = () => {

    return (
        <>
            <div className='monthlyBill'>
                <CommonCpn type={'month'} />
            </div>
        </>

    )
}

export default Month