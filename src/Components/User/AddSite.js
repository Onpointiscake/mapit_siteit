import React, { Component } from 'react'
import Geocode from "react-geocode";
import { Map, Marker, TileLayer } from "react-leaflet"
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Auth } from 'aws-amplify'
import './styles.css'
import config from '../../config.json'
import axios from 'axios'

const PexelsAPI = require('pexels-api-wrapper')

Geocode.setApiKey(config.maps.api);
Geocode.setLanguage("es");
Geocode.setRegion("es");

const apiGatewayDevStage = config.apiGateway.devStage
const pexelsClient = new PexelsAPI(config.pexels.api);

export default class AddSite extends Component {
    state = {
        new_location: "",
        new_site: "",
        view_location: [42.600273, -5.572582],
        user_sites: [],
        zoom: 2,
        current_user: ""
    }
    async componentDidMount() {

        const session = await Auth.currentSession();
        this.setState({
            current_user: session.idToken.payload.email
        })
        let userEmail = this.state.current_user
        axios.get(`${apiGatewayDevStage}/get-sites/${userEmail}`)
            .then((res) => {
                let sites = JSON.stringify(res.data);
                this.setState({
                    user_sites: JSON.parse(sites)
                })

            })
    }
    updateDynamo = () => {
        axios.patch(`${apiGatewayDevStage}/add-site`, {
            email: this.state.current_user,
            sites: this.state.user_sites,
        }).then(() => {
            console.log('DB-Users en Dynamo actualizada')
        }).catch(err => console.log(err))

        axios.post(`${apiGatewayDevStage}/create-gallery`, {
            site: this.state.new_site + "_" + this.state.current_user
        }).then(() => {
            console.log('DB-Galleries en Dynamo actualizada')
        }).catch(err => console.log(err))

    }
    addMarkUp = async (event) => {
        event.preventDefault();

        let pictureData = await this.insertPicture(this.state.new_site);
    
        Geocode.fromAddress(this.state.new_site).then(
            response => {
                
                const { lat, lng } = response.results[0].geometry.location;
                this.setState(prevState => ({
                    user_sites: [{
                        
                    "name": this.state.new_site, "id": this.state.user_sites.length + 1, coordinates: [lat, lng], "urlpic": pictureData.photos[0]?.src["small"] ?? "https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?auto=compress&cs=tinysrgb&h=130"

                    }, ...prevState.user_sites]
                }))
                this.updateDynamo()
            },
            error => { console.error(error); }
        );
    }
    async deleteSite(id) {
        await this.setState({
            user_sites: this.state.user_sites.filter(function (item) {
                return item.id !== id
            })
        })
        this.updateDynamo()
    }
    async insertPicture(site) {
          return pexelsClient.search(site, 1, 1).catch(function(e) {
          console.err(e);
        });
    }
    geoCodeToCoordinates = (event) => {
        event.preventDefault()
        const newAdress = this.state.new_location;
        Geocode.fromAddress(newAdress).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState({
                    view_location: [lat, lng],
                    zoom: 6
                })
            },
            error => {
                console.error(error);
            }
        );
    }
    onChangeNewLocation = event => {
        this.setState({
            new_location: event.target.value
        })
    };
    onChangeNewSite = event => {
        this.setState({
            new_site: event.target.value
        })
    };
    render() {
        return (
            <div className="addsite-container">
                <Container>
                    {/** BUSCADOR PAIS */}
                    <Row>
                        <Container className="search-container">
                            <Form onSubmit={this.geoCodeToCoordinates}>
                                <h4>Busca un pais en el mundo</h4>
                                <Row>
                                    <Col>
                                        <Form.Control type="text" onChange={this.onChangeNewLocation} value={this.state.new_location} placeholder="ejemplo: Madrid, New York...etc" />
                                    </Col>
                                    <Col>
                                        <Button variant="primary" type="submit">Buscar</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Row>

                    {/** EL MAPA */}
                    <Row>
                        <Col sm={8} >
                            <Container>
                                <Map center={this.state.view_location} zoom={this.state.zoom}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    {this.state.user_sites.map(site => (
                                        <Marker
                                            key={site.id}
                                            position={[site.coordinates[0], site.coordinates[1]]}

                                        />
                                    ))}
                                </Map>
                            </Container>
                        </Col>

                        {/** AÑADIDOR SITIOS */}
                        <Col className="p-0">
                            <Container className="add-container">
                                <Form onSubmit={this.addMarkUp}>
                                    <h4>Añade un sitio </h4>
                                    <Row>
                                        <Form.Control type="text" onChange={this.onChangeNewSite} value={this.state.new_site} placeholder="ejemplo: Madrid, New York...etc" />
                                    </Row>
                                    <Row>
                                        <Button type="submit" variant="success">Añadir</Button>
                                    </Row>

                                </Form>
                            </Container>
                            <ListGroup>
                                {this.state.user_sites.map((site, i) => (
                                    <div key={i} className="added-items-container">
                                        <ListGroup.Item className="added-items" variant="warning" >{site.name}</ListGroup.Item>
                                        <Button onClick={this.deleteSite.bind(this, site.id)}>Quitar</Button>
                                    </div>
                                ))}

                            </ListGroup>
                        </Col>
                    </Row>

                </Container>
            </div>
        )
    }
}
