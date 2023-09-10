import React , {useEffect} from 'react';
import useDetails from '../hooks/useDetails';
import Loading from '../components/Loading';
import { Form , Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editPost } from '../Store/PostSlice';
import { useNavigate } from 'react-router-dom';
import { cleanReducer } from '../Store/PostSlice';
import withGuard from '../util/withGuard';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const formSchema = Yup.object().shape({
    title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Title is required'),
    description: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const Edit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {loading , error , postDetails} = useDetails();
    
    const formik = useFormik({
        initialValues: {
            title: postDetails?postDetails?.title:'',
            description: postDetails?postDetails?.description:'',
        },
        enableReinitialize:true,
        validationSchema:formSchema,
        onSubmit: (values) => { 
            dispatch(editPost({id: postDetails.id, title: values.title, description:values.description})).unwrap().then(() => navigate("/"));
        },
    });
    
    useEffect(() => {
        return () =>{
            dispatch(cleanReducer());
        }
    },[dispatch]);
    
    return (
    <Form onSubmit={formik.handleSubmit}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name = "title" value = {formik.values.title} onChange={formik.handleChange} isInvalid={!!formik.errors.description} />
        <Form.Control.Feedback type="invalid">
            {formik.errors.title}
        </Form.Control.Feedback>
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} name = "description" value = {formik.values.description} onChange={formik.handleChange} isInvalid={!!formik.errors.description} />
        <Form.Control.Feedback type="invalid">
            {formik.errors.title}
        </Form.Control.Feedback>
    </Form.Group>
        <Loading loading={loading} error={error}>
            <Button variant="primary" type='submit'>Submit</Button>
        </Loading>
    </Form>
    )
}

export default withGuard(Edit);
