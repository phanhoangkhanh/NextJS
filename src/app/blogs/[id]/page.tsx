'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ViewDetailBlog = ({params}: {params:{id:string}}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')

    useEffect( () => {
        const callApiId = async() => {
            const respond = await fetch(`http://localhost:8000/blogs/${params.id}`)
                                    .then(res => res.json())
                                    .then( res=> {
                                        setTitle(res.title)
                                        setAuthor(res.author)
                                        setContent(res.content)
                                    })
        }
        callApiId()
    }, [])
    
    if(!title){
        return (
            <div>Loading {params.id}....</div>
        )
    }
    return(
        <Card className='mb-5'>
        <Card.Header as="h5">The Creator: {author} number: {params.id}</Card.Header>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
                {content}
            </Card.Text>
            
        </Card.Body>
        <Card.Footer>
            number: {params.id}
        </Card.Footer>
        </Card>
    )
}

export default ViewDetailBlog