import React, { Component } from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import mainPic from '../../assets/landing-picture.jpg'
import Footer from '../Global/Footer'


export default class Home extends Component {
    render() {
        return (
            <div>
                <Jumbotron className="jumbo" fluid>
                    <Container>
                    <Image width="90%" src={mainPic} fluid />
                    </Container>
                    <Container className="jumbo-container-2">
                        <h1>Mapit is the best way to save the best sites of your life</h1>
                      
                        <h4>
                            Add all the places that you have loved and visited, create galleries associated to this places, and share it whenever you want
    </h4>
                        <Button variant="primary" className="start-btn" size="lg"><a className="start-link" href="/register">Get Started</a></Button>
                    </Container>
                </Jumbotron>
                <Footer />
            </div>
        )
    }
}
