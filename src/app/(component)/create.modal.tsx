'use client'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function CreateModal({...props}) {

const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [content, setContent] = useState('')

const handleSubmit = () => {
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