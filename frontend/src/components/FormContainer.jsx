import React,{useEffect, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form,Button } from 'react-bootstrap'
import axios from 'axios';
import {baseUrl} from '../../config/baseUrl';
import {useDispatch,useSelector} from 'react-redux'
import { login,logout } from '../actions';

const regEx=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

function FormContainer() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError,setError] = useState(false)
    const [showClientErr,setClientError]=useState(false)
    const navigate=useNavigate()
    const user=useSelector((state)=>state.user.user)
    useEffect(()=>{
        if(user) navigate('/')
    },[user,navigate])

    const dispatch= useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData={email,password}
        if(!regEx.test(email)) setClientError(true)
        else if(password == '') setClientError(true)
        else{
            setClientError(false)
            axios.post(`${baseUrl}/login`,formData).then(response=>{
                console.log('response',response.data.failed);
                if(response.data.failed == true){
                    setError(true)
                    navigate('/login')
                }
                else{
                    dispatch(login(response.data.user,response.data.token))
                    navigate('/')
                }
            })
        }
        
    };
    return (
        <Container>
            <Row className='justify-content-md-center mt-5'>
                <Col xs={12} md={6} className='card p-5'>
                    <h1>Sign In</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className='my-2' controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group className='my-2' controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary' className='mt-3'>
                            Sign In
                        </Button>
                    </Form>
                        {showError && <> <h4 className='text-danger'>Login Failed</h4>
                        <p>Invalid user name or password</p></>}
                        {showClientErr && <p className='text-danger'>Enter valid fields</p>}
                    <Row className='py-3'>
                        <Col>
                            New Customer? <Link to={`/register`}>Register</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
