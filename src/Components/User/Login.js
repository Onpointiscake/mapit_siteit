import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Auth } from 'aws-amplify'
import './styles.css'

export default class Login extends Component {
    state = {
        user: "",
        password: ""
      }
    handleSubmit = async (event) =>{
        event.preventDefault()
       
        try{
            const user = await Auth.signIn(this.state.user, this.state.password)
            console.log(user)
            this.props.authentication.setAuthStatus(true)
            this.props.authentication.setUser(user)
            
        } catch (error) {
            console.log(error)
        }
        setTimeout(() =>  this.props.history.push('/usergallery'), 300);
        
    }
    onChangeUser = event => {
        this.setState({
          user: event.target.value
        })
      };
    onChangepass = event => {
        this.setState({
          password: event.target.value
        })
      };
    render() {
        return (
            <div>
                <Jumbotron className="jumbo" fluid>
                    <Container className="form-container text-center">
                        <h2>Log into your account</h2>
                        <Form onSubmit={this.handleSubmit} className="register-form">
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    User
    </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="text" onChange={this.onChangeUser} value={this.state.username} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Password
    </Form.Label>
                                <Col sm="10">
                                    <Form.Control onChange={this.onChangepass} value={this.state.password} type="password"  placeholder="Password" />
                                </Col>
                            </Form.Group>
                           
                            <Button variant="primary" type="submit">
    Submit
  </Button>
                        </Form>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
