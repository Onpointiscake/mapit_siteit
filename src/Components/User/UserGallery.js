import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Carousel from 'react-bootstrap/Carousel'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import brazilPic from '../../assets/userGallery/brazil.jpg'
import francePic from '../../assets/userGallery/france.jpg'
import italyPic from '../../assets/userGallery/italy.jpg'
import './styles.css'
import axios from 'axios'
import config from '../../config.json'
import { Auth } from 'aws-amplify'

const apiGatewayDevStage = config.apiGateway.devStage

export default class UserGallery extends Component {

    state = {
        authenticatedUser: "",
        galleries: []
    }

    async componentDidMount() {
        const session = await Auth.currentSession();
        const userEmail = session.idToken.payload.email
        axios.get(`${apiGatewayDevStage}/get-sites/${userEmail}`)
        .then((res) => {
            let gallery = JSON.stringify(res.data);
            this.setState({
                galleries: JSON.parse(gallery)
            })
            console.log(this.state.galleries)
        })
    }

    renderSites() {
        if(this.state.galleries.length > 0){
            return this.state.galleries.map((site, i) => (
                <div key={i} className="added-items-container">
                    <Container className="bg-dark text-white card-site">
                        <Row>
                            <Col sm={8}>
                                <p>
                                    Viaje a {site.name}
                            <br />
                            Fuiste el 13 de Marzo al 19 Marzo de 2012
</p>
                            </Col>
                            <Col><Image src={site.urlpic} rounded alt="Card image" />
                            </Col>
                        </Row>
                        <Button href={`/usergallery/${site.name}`}>Añadir fotos</Button>
                    </Container>
                </div>
            ))
        }
    }

    render() {
        //let sites = this.state.galleries
        return (
            <div className="usergallery-container">
                <Container>
                    <Row>
                        <Col className="search-gallery-col-1">
                            <Container className="search-gallery-container">

                                <Form>
                                    <h4>Busca una galeria </h4>
                                    <Row>
                                        <Col className="search-gallery-form" sm={8}>
                                            <Form.Control type="text" placeholder="ejemplo: Madrid, New York...etc" />
                                        </Col>
                                        <Col sm={2}>
                                            <Button type="submit" variant="success">Buscar</Button>
                                        </Col>
                                    </Row>
                                </Form>
                                
                                {
                                  this.renderSites()
                                }

                            </Container>
                        </Col>
                               

                        <Col className="search-gallery-col-2" xs={7}>
                            <h4>Ultimo añadido</h4>
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={brazilPic}
                                        alt="First slide"
                                    />
                                    <Carousel.Caption>
                                        <h3>Viaje a Brasil</h3>

                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={francePic}
                                        alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                        <h3>Viaje a Francia</h3>

                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={italyPic}
                                        alt="Third slide"
                                    />

                                    <Carousel.Caption>
                                        <h3>Viaje a Italia</h3>

                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
