'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { mutate } from 'swr'; //xác đinh thay doi để call API gọi lai danh sách

function UpdateModal({...props}) {

const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [content, setContent] = useState('')
const [id, setID] = useState(0)

//cap nhật qua useEffect mỗi khi có thay doi props 
useEffect( ()=>{
    if(props.blog && props.setBlogg){
        setTitle(props.blog.title)
        setAuthor(props.blog.author)
        setContent(props.blog.content)
        setID(props.blog.id)
    }
}, [props.blog])

const handleClose = () => {
    props.setShowModal(false)
    setTitle('')
    setContent('')
    setAuthor('')
    props.setBlogg(null)
}

const handleSubmit = () => {
    if( !title){
        toast.error("Not empty content!")
        return
    }
    fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({title, author, content})
        })
            .then(res => res.json())
            .then(res => {
                if(res){
                    toast.warning('Updated success!')
                    handleClose()
                    mutate(`http://localhost:8000/blogs`) // mutate cái fetch API nào sẽ call chứ ko có id
                }
            })
}


  return (
    <>
      <Modal 
        show={props.showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" 
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
             />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" 
                value={author}
                onChange={(e)=>setAuthor(e.target.value)}
             />
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={4} 
                value={content}
                onChange={(e)=>setContent(e.target.value)}
            />
        </Form.Group>
        </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
            onClick = {handleClose}
            >
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;