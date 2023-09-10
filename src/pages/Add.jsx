import React from 'react';
import Form  from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useDispatch ,useSelector} from 'react-redux';
import { insertPost } from '../Store/PostSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import withGuard from '../util/withGuard';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const Add = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,error} = useSelector((state) => state.posts);
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema:formSchema,
        onSubmit: (values) => { 
            const id = Math.floor(Math.random() * 10000);
                dispatch(insertPost({id , title:values.title , description:values.description})).unwrap().then(() => navigate('/'));
        },
    });


    
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text"  name = "title" value = {formik.values.title} onChange={formik.handleChange} isInvalid={!!formik.errors.title}/>
                <Form.Control.Feedback type="invalid">
                    {formik.errors.title}
                </Form.Control.Feedback>
                </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name = "description" value = {formik.values.description} onChange={formik.handleChange}  isInvalid={!!formik.errors.description}/>
                <Form.Control.Feedback type="invalid">
                    {formik.errors.description}
                </Form.Control.Feedback>
            </Form.Group>
            <Loading loading={loading} error={error}>
                <Button variant="primary" type='submit'>Submit</Button>
            </Loading>
        </Form>
    )
}

export default withGuard(Add);
