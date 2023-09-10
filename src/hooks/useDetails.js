import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostDetails } from '../Store/PostSlice';

const useDetails = () => {
    const {id} = useParams();
    const {loading , error , postDetails} = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPostDetails(id));
    },[dispatch,id]);
    
    return {loading,error,postDetails};
}

export default useDetails
