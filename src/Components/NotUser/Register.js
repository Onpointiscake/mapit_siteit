import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Auth } from 'aws-amplify'
import axios from 'axios'
import './styles.css'

export default class Register extends Component {
    state = {
        username: "",
        email: "",
        password: ""
        //confirmpassword: ""
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        const { username, email, password } = this.state;
        try{
            const signUpResponse = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: email
                }
            })
            axios.post('https://c6tdkwn8v7.execute-api.eu-west-2.amazonaws.com/dev/create-user', {
                email: email
            }).then((res) => console.log(res))
            console.log(signUpResponse)
            
           // this.props.history.push("/news");
        } catch (error) {
            console.log(error)
        }
    }
    onChangeUser = event => {
        this.setState({
          username: event.target.value
        })
      };
    onChangePass = event => {
        this.setState({
          password: event.target.value
        })
      };
    onChangeEmail = event => {
        this.setState({
          email: event.target.value
        })
      };

    render() {
        return (
            <div>
                <Jumbotron className="jumbo" fluid>
                    <Container className="form-container text-center">
                        <h2>Start Saving Sites Now</h2>
                        <Form onSubmit={this.handleSubmit} className="register-form">
                        <Form.Group as={Row} controlId="formPlaintextUser" onChange={this.onChangeUser}>
                                <Form.Label column sm="2">
                                    User
    </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="user" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextEmail" onChange={this.onChangeEmail}>
                                <Form.Label column sm="2">
                                    Email
    </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="email" defaultValue="email@example.com" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword" onChange={this.onChangePass}>
                                <Form.Label column sm="2">
                                    Password
    </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="password" placeholder="Password" />
                                </Col>
                            </Form.Group>
                            {/** Provisional
                            <Form.Group as={Row} controlId="formPlaintextRepeatPassword">
                                <Form.Label column sm="2">
                                    Repeat password
    </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="password" placeholder="Password" />
                                </Col>
                            </Form.Group> */}
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
