'use client'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import { useState } from 'react';
import UpdateModal from './update.modal';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

// load API json ra thì như sau :
// b1: tạo thư mực type/ backend.d.ts ( data type )
// b2: tao interface để đinh kiểu data -> 
//  từ interface chuyển thành định dạng props truyền vo function ( khi code dc gợi ý)
// b3: fetch từ lớp cha và truyền prop vô 


interface IProps{
    blogs : IBlog[]
}

function AppTable(props : IProps) {
    const {blogs} = props ;
    //console.log('check prop>>', blogs)
    const [showModal, setShowModal ] = useState(false)
    // update 1 blog nào đó
    const [blog, setBlogg] = useState('')
    // Delete 
    const handleDeleteBlog = (id: number) => {
        if( confirm( `Do you want to delete this blog ? id = ${id}`) ){
            fetch(`http://localhost:8000/blogs/${id}`, {
                method: 'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then( res=> res.json())
                .then(res=>{
                    if(res){
                        toast.success('Delete completely!!')
                        mutate('http://localhost:8000/blogs')
                    }
                })
        }
    }
  return (
    <>
    <div
        className='mb-3'
        style={{display:'flex', justifyContent:'space-between'}}
    >
        <h3>Table Data</h3>
        <Button 
            variant='secondary'
            onClick = {()=>setShowModal(true)}
        >
                Add New
        </Button>
    </div>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
            blogs.map(item=>{
                return(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td>
                            <Link 
                                className='btn btn-primary'
                                href={`/blogs/${item.id}`}
                                >View
                            </Link>
                            <Button variant='warning' 
                                className='mx-2'
                                onClick={ () => {
                                    setShowModal(true)
                                    setBlogg(item)
                                }}
                            >
                                Edit
                            </Button>
                            <Button variant='danger'
                                    onClick={()=>handleDeleteBlog(item.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                )
            })
        }
      </tbody>
    </Table>
    <CreateModal showModal={showModal} setShowModal ={setShowModal} />
    <UpdateModal 
        showModal={showModal}
        setShowModal ={setShowModal}
        blog={blog}
        setBlogg = {setBlogg}
    />

    </>
  );
}

export default AppTable;