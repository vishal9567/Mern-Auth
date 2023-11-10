import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';
import { adminLogout } from '../../actions';
import { useNavigate } from 'react-router-dom';



function NavbarComponent() {
    const admin = useSelector(state=>state.user.admin)
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const logoutHandler=()=>{
        dispatch(adminLogout())
        navigate('/admin/login')
    }

  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
    <Container>
        <Navbar.Brand href='/'>MERN APP</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
                {admin ? (
                    <>
                        <NavDropdown title={admin.name} id='username'>
                            {/* <LinkContainer to='/profile'>
                                <NavDropdown.Item>
                                    Profile
                                </NavDropdown.Item>
                            </LinkContainer> */}
                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </>
                ) : (
                    // <>
                    //     <LinkContainer to='/login'>
                    //         <Nav.Link>
                    //             <FaSignInAlt /> Sign In
                    //         </Nav.Link>
                    //     </LinkContainer>
                    //     <LinkContainer to='/register'>
                    //         <Nav.Link>
                    //             <FaSignOutAlt /> Sign Up
                    //         </Nav.Link>
                    //     </LinkContainer>
                    // </>
                    ''
                )}
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
  )
}

export default NavbarComponent
