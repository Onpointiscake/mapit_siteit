import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import firstPic from '../../assets/pitch_1.jpg'
import secondPic from '../../assets/pitch_2.jpg'
import thirdPic from '../../assets/pitch_3.jpg'
import './styles.css'

export default class AboutLanding extends Component {
    render() {
        return (
            <div className="card-deck-container">
                <CardDeck>
  <Card className="card-pitch">
    <Card.Img variant="top" width="160px" height="50%" src={firstPic} />
    <Card.Body>
      <Card.Title>Ten tu propio mapa</Card.Title>
      <Card.Text>
       Con Mapit puedes tener tu propio mapa con los sitios a los que has viajado creando así un increíble memoria gráfica de tus viajes para siempre.
      </Card.Text>
    </Card.Body>
    <Button className="demo-btn">Pruébalo</Button>
  </Card>
  <Card className="card-pitch">
    <Card.Img variant="top" width="160px" height="50%" src={secondPic} />
    <Card.Body>
      <Card.Title>Crea galerias de fotos</Card.Title>
      <Card.Text>
      Cada galería corresponderá a cada sitio que guardes en tu mapa personalizado
      </Card.Text>
    </Card.Body>
    <Button className="demo-btn">Mira algunas galerias</Button>
  </Card>
  <Card className="card-pitch">
    <Card.Img variant="top" width="160px" height="50%" src={thirdPic} />
    <Card.Body>
      <Card.Title>Comparte rápidamente con quien quieras.
      </Card.Title>
      <Card.Text>
      También podrás permitir que se puedan dejar comentarios en cada galería de tu mapa
      </Card.Text>
    </Card.Body>
    <Button className="demo-btn">Request a Demo</Button>
  </Card>
</CardDeck>
            </div>
        )
    }
}
