"use client"
import { useRouter } from 'next/navigation'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '@/app/Header';
import Footer from '@/app/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import {useEffect} from 'react';
import React from "react";
import useSWR from "swr";

// interface IProps{
//     blogs: IBlog[]; // kiểu dữ liệu là interface từ type/backend.d.ts
// }

// const HoidanIT = () => {

//     const router = useRouter()
//     // use client chỉ render 1 phần từ clinet - phần còn lai bên server 
//     // route/admin
    
//     const handleBtn = () => {
//         router.push('/')
//     }

//     //fetch API - fetch là công cụ của chính browser . Hoac dùng SWR phù hop NestJS.
    
//     useEffect(
//         () => {
//             const fetchData = async() => {
//                 const respond = await fetch('http://localhost:8000/blogs')
//                                 .then(res => res.json())
//                                 .then(res => console.log(res));
//             }
//             // fetch mỗi khi mout bằng useEffect Hoăc khi state change useState cùng useEffct chưa hay
//             // nên dùng SWR để tải từ fetch data trong bộ nhớ tạm lên (catch).
//             // Nếu ta có data moi thì lấy mới - ko thì dùng từ catch

//             //fetchData()
//         }, []
//     );
//     // C2: SWR fetch từ cache + api new
//     // fetch của SWR - bỏ qua useEffect
//     const fetcher = (url:string) => fetch(url).then((res) => res.json());
//     const { data, error, isLoading } = useSWR(
//         "http://localhost:8000/blogs",
//         fetcher ,
//         {
//             revalidateIfStale: false,
//             revalidateOnFocus: false,
//             revalidateOnReconnect: false
//         }
//       );
    
//     return(
//     <>
//         <Header / >

//             <button onClick={()=>handleBtn()}>Hoi dan IT</button>
//             <Button variant='danger'>CÚC CU</Button>
//             <div>FetchSWR: {data?.length}</div>
//             <Container>
//                 <Row>
//                     {
//                         if(!data){
//                             <div>Loading</div>
//                         }else{
//                             <Table striped bordered hover >
//                                 <thead>
//                                     <tr>
//                                     <th>#</th>
//                                     <th>First Name</th>
//                                     <th>Last Name</th>
//                                     <th>Username</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr>
//                                     <td>1</td>
//                                     <td>Mark</td>
//                                     <td>Otto</td>
//                                     <td>@mdo</td>
//                                     </tr>
//                                 </tbody>
//                             </Table>
//                         }
//                     }
                    
//                 </Row>
//             </Container>

//         <Footer/>
//     </>
//     )
    
// }

// export default HoidanIT; // route /admin ( tạo 1 page có page.tsx chứa component render route ra)