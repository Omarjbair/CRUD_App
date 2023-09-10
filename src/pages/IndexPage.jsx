import React, { useEffect } from 'react'
import Loading from '../components/Loading';
import { useSelector,useDispatch } from 'react-redux';
import { getPosts } from '../Store/PostSlice';
import PostList from '../components/PostList';
import { DeletePost } from '../Store/PostSlice';
import { useCallback } from 'react';

const IndexPage = () => {
    const {posts} = useSelector((state) => state);
    const dispatch = useDispatch();
    
    const deletePost = useCallback((id) => {
        dispatch(DeletePost(id));
    },[dispatch]);

    useEffect(() => {
        dispatch(getPosts());
    },[dispatch])

    return (
        <Loading loading={posts.loading} error = {posts.error} >
            <PostList posts={posts.records} deletePost={deletePost}> </PostList>
        </Loading>
    )
}

export default IndexPage;
