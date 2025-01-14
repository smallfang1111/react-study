// import { useSearchParams } from 'react-router-dom'
import { useParams } from 'react-router-dom'
const Article = () => {
    // const [searchParams] = useSearchParams()
    // const id = searchParams.get('id')
    // const name = searchParams.get('name')
    const { id ,name} = useParams()

    return (
        <>
            {/* <div>我是文章页id:{id} name:{name} </div> */}
            <div>我是文章页{id} - {name}</div>
        </>
    )
}

export default Article