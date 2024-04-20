'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function CreateModal({...props}) {

const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [content, setContent] = useState('')
const [respond, setRespond] = useState('')

const handleSubmit = () => {
// C1: DÙNG FETCH CỦA BROWSER + if return
    if(!title){
        toast.error('No empty Title. Please')
        return
    }
    fetch('http://localhost:8000/blogs', {
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({title,author, content})
    }).then(res => res.json())
        .then(res=>{
            setRespond(res)
            handleCloseModal()
            props.setShowModal(false)
        })

    toast.success(`create successful...!Newid=${respond}` )
    console.log('form:', title, author, content)
}

const handleCloseModal = () => {
    setTitle('')
    setContent('')
    setAuthor('')
}

  return (
    <>
      <Modal 
        show={props.showModal}
        onHide={ ()=>{
            props.setShowModal(false)
            handleCloseModal()
        } }
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
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
                value ={author}
                onChange = {(e)=>setAuthor(e.target.value)}
             />
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={3} 
                value ={content}
                onChange = {(e)=>setContent(e.target.value)}
            />
        </Form.Group>
        </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
            onClick={()=>{
            props.setShowModal(false)
            handleCloseModal()
             } }>
            Close
          </Button>
          <Button variant="primary" onClick ={()=>handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateModal;