
import { useEffect } from 'react';
import useDetails from '../hooks/useDetails';
import Loading from '../components/Loading';
import { useDispatch } from 'react-redux';
import { cleanReducer } from '../Store/PostSlice';
const Details = () => {
    const {loading, error , postDetails} = useDetails();
    const dispatch = useDispatch();

    useEffect(() => {
        return () =>{
            dispatch(cleanReducer());
        }
    },[dispatch])

    return (
    <Loading loading={loading} error={error}>
        <>
            <p>title: {postDetails?.title}</p>
            <p>description: {postDetails?.description}</p>
        </>
    </Loading>
    )
}

export default Details;
