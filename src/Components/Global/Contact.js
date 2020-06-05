import React, { Component } from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import mainPic from '../../../src/assets/profile.png'
import './styles.css'

export default class Contact extends Component {
    render() {
        return (
            <div>
               <Container className="container-contact">
                   <Col className="col-contact" >
                       <Row className="justify-content-md-center row-contact-first"><h3>Want to Chat?</h3></Row>
                       <Row className="justify-content-md-center row-contact-first"><Image width="40%" src={mainPic} fluid roundedCircle /></Row>
                   </Col>
                   <Col className="col-contact-second ">
                       <Row className="row-contact"><h6>Do you have any questions about the app, or want to make a suggestion?</h6></Row>
                       <Row className="row-contact"><h6>Complete the form below and I´ll get to you ASAP!</h6></Row>
                   </Col>
                   <Col className="col-contact">
                        
                        <Form>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Your email</Form.Label>
    <Form.Control type="email" placeholder="name@example.com" />
  </Form.Group>
 
  
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Your message</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
</Form>
                       
                   </Col>
               </Container>
            </div>
        )
    }
}
