'use client'
import { useQueries, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"

const ReactQueryLesson = () => {
    const[posts, setPosts] = useState([])
    const[isCreate, setIsCreate] = useState(false)
    // c1: viết chung với useEffect để call moi khi mout API
    // useEffect( () => {
    //     const fetchApi2 = async() => await axios.get('https://jsonplaceholder.typicode.com/posts')
    //                                             .then( res=> console.log(res.data))
    //     fetchApi2()
    // }, [])



    //c2: dùng voi react-query để quản lý API
    //    Mac đinh lưu vào cache để lấy lại khi mout chứ ko gọi API nữa 
    const fetchApi = async() => {
        const respond =  await axios.get('https://jsonplaceholder.typicode.com/posts')
        return respond.data                                   
    }
    const fetchCreateApi = async() => {
        const respond = await axios.post('https://jsonplaceholder.typicode.com/posts',{
            'title' : 'json-server4',
            'author' : 'typical'
        })
        return respond.data
    }
    const query = useQuery({queryKey:['posts'], queryFn: fetchApi , staleTime:3000}) 
    const queryCreate = useQuery({queryKey:['create-posts'], queryFn: fetchCreateApi , enabled:!!isCreate}) 

    // khi bấm nút tạo API thì kích hàm chuyển isCreate -> true => enable kích chạy queryCreate goi API post

    const handleCreatePost = () => {
        setIsCreate(true)
    }
    // dùng useEffect chuyển ngay về false khi đã set true
    useEffect( () => {
        if(!!isCreate) {
            setIsCreate(false)
            query.refetch() // kích chay lại query để cap nhật danh sách sau khi post
        }
    }, [isCreate])
    //[posts] là key của query này
    // stale time là thoi gian còn xem API là mới ko kích chay API.
    // có thể quản lý nhiều query API 1 lúc bằng useQueries - thay key + Function fetch tuy y
    // const result = useQueries({
    //     queries: [
    //         {queryKey:['posts',2], queryFn: fetchApi , staleTime:3000},
    //         {queryKey:['posts',3], queryFn: fetchApi , staleTime:3000},
    //     ]
    // })
    if( query.isLoading){
        return <h1>...Loading </h1>
    }
    if(query.isError){
        return <h1>...Error </h1>
    }

    return(
        <div>
            {
                data?.map((post: any) => {
                    return <h3 key={post['id']}>{post['title']}</h3>
                })
            }
            <button onClick={handleCreatePost}>Kích API Post</button>
        </div>
    )
}

export default ReactQueryLesson