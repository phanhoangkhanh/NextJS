
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import { useState } from 'react';

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
            blogs.map(blog=>{
                return(
                    <tr key={blog.id}>
                        <td>{blog.id}</td>
                        <td>{blog.title}</td>
                        <td>{blog.author}</td>
                        <td>
                            <Button>View</Button>
                            <Button variant='warning' className='mx-2'>Edit</Button>
                            <Button variant='danger'>Delete</Button>
                        </td>
                    </tr>
                )
            })
        }
      </tbody>
    </Table>
    <CreateModal showModal={showModal} setShowModal ={setShowModal} />
    </>
  );
}

export default AppTable;