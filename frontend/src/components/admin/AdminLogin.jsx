import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import axios from 'axios';
import { baseUrl } from '../../../config/baseUrl.js';
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin } from '../../actions';

const regEx=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/


function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showErr, setErr] = useState(false)
    const [clientErr, setClientError] = useState(false)

    const navigate = useNavigate()
    const admin = useSelector((state) => state.user.admin)

    useEffect(() => {
        if (admin) navigate('/userList')
    }, [admin, navigate])

    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!regEx.test(email)) setClientError(true)
        else if (password == '') setClientError(true)
        else {
            const formData = { email, password }
            axios.post(`${baseUrl}/admin/login`, formData).then(response => {
                if (response.data.failed == true) {
                    setErr(true) 
                    setClientError(false)
                }
                else {
                    dispatch(adminLogin(response.data.admin, response.data.token))
                    navigate('/userList')
                }
            })
        }
    };
    return (
        <Container>
            <Row className='justify-content-md-center mt-5'>
                <Col xs={12} md={6} className='card p-5'>
                    <h1>Admin</h1>
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
                        {showErr && <p className='text-danger'>Invalid user name or password</p>}
                        {clientErr && <p className='text-danger'>Enter valid fields</p>}
                        <Button type='submit' variant='primary' className='mt-3'>
                            Sign In
                        </Button>
                    </Form>

                </Col>
            </Row>
        </Container>
    )
}

export default AdminLogin
