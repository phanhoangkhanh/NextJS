"use client"
import { useEffect } from "react"
import AppTable from "./(component)/AppTable"
import useSWR from "swr"

export default function Home() {

//C1: DÙNG FETCH CỦA BROWSER + USEEFFECT
// dù dùng loại 2 useEffect nhưng sẽ goi api mỗi khi chuyển sang Link khác rồi quay lại
  useEffect( ()=> {
    const callFetch = async() => {
      const respond  = await fetch('http://localhost:8000/blogs')
                                .then(res=>res.json()).then(res=>console.log(res))

    }
    callFetch()
  , []})



//C2: DÙNG SWR ĐỂ tối ưu cả data từ cache nếu ko phai reload lai trang - thì ko goi API 
//      Dac biệt trong trường hop điều hướng trong trang chứ ko reload lại trang 
  //b1: tạo fetcher là 1 promise lấy data
  const fetcher = (url: string) => fetch(url).then( (res)=>res.json());
  //b2: goi useSWR bỏ fetcher vô 
  const {data, error, isLoading} =useSWR(
    'http://localhost:8000/blogs',
    fetcher,
    {
      // ngăn sự call API khi 1 số yếu tố k doi (auto Revalidator)
      // bây giờ chuyển trang ko gây ảnh huong nữa
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )
  console.log('check SWR:', data)

  return (
    <AppTable/>
  )
}
