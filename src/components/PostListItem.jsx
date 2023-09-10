import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button,ButtonGroup } from 'react-bootstrap'
import {useSelector} from 'react-redux'

const PostListItem = ({posts,deletePost}) => {
    const navigate = useNavigate();
    const {isLoggedIn} = useSelector((state) => state.AuthSlice);
    const detailsHandler = (id) => {
        navigate(`post/${id}`);
    };

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure you want to delete this?"))
        deletePost(id);
    };
    
    const data = Array.isArray(posts)?posts.map(({id , title},idx) => (
        <tr key={id}>
        <td>#{++idx}</td>
        <td  onClick={() => detailsHandler(id)}>{title}</td>
        <td>
            <ButtonGroup aria-label="Basic example">
                <Button variant="success" onClick={() => navigate(`/post/${id}/edit`)}>Edit</Button>
                <Button variant="danger" disabled = {!isLoggedIn} onClick={() => deleteHandler(id)}>Delete</Button>
            </ButtonGroup>
        </td>
        </tr>
        )):null;
    return (data)
}

export default PostListItem;
