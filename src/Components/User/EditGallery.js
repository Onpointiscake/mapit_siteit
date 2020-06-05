import React, { Component } from 'react'
import ReactS3 from 'react-s3'
import axios from 'axios'
import config from '../../config.json'
import { Auth } from 'aws-amplify'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Button from "react-bootstrap/Button"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAltSquare } from "@fortawesome/free-solid-svg-icons";
import './styles.css'

const apiGatewayDevStage = config.apiGateway.devStage
const s3configUpload = config.s3manualUpload

export default class EditGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
          fetched_photos: [],
          currentLimitIntheArray: 0,
          imagesPerPage: 0,
          totalNumberOfPages: 0,
          currentPage: 1,
          currentStartOfImages: 0
        };
        this.nextPageAction = this.nextPageAction.bind(this);
        this.previousPageAction = this.previousPageAction.bind(this);
        this.uploadPhotos = this.uploadPhotos.bind(this)
      }
    
      async componentDidMount() {
        const session = await Auth.currentSession();
        const userEmail = session.idToken.payload.email;
        let emailKey = this.props.match.params.gallery_name + "_" + userEmail

        // Set AWS S3 folder name for email´s key user
        s3configUpload.dirName = emailKey
        
        axios.get(`${apiGatewayDevStage}/get-gallery/${emailKey}`)
            .then((res) => {
                this.setState({
                   fetched_photos: res.data
                })
                console.log(this.state.fetched_photos)
            })
            
        // Get quantity of images to render per page
        const height = document.documentElement.clientHeight;
        const width = document.documentElement.clientWidth;
    
        let rowsPerDevice = 0;
        let columnsPerRowOfDevice = 0;
    
        if (width > 1200) {
          columnsPerRowOfDevice = 9;
          rowsPerDevice = 5;
        } else if (width < 1200 && width > 1000) {
          columnsPerRowOfDevice = 8;
          rowsPerDevice = 9;
        } else if (width < 1000 && width > 766) {
          columnsPerRowOfDevice = 6;
          rowsPerDevice = 6;
        } else if (width < 766 && width > 569) {
          columnsPerRowOfDevice = 4;
        } else if (width < 569 && width > 490) {
          columnsPerRowOfDevice = 6;
        } else if (width < 490 && width > 413) {
          columnsPerRowOfDevice = 5;
          rowsPerDevice = 6;
        } else if (width < 413) {
          columnsPerRowOfDevice = 4;
          rowsPerDevice = 5;
    
          if (height > 700 && height < 800) {
            rowsPerDevice = 6;
          } else if (height > 800) {
            rowsPerDevice = 8;
          }
        }
       
        console.log(Math.round(this.state.fetched_photos.length / (columnsPerRowOfDevice * rowsPerDevice)))
        console.log(this.state.fetched_photos.length)
        this.setState({
          currentLimitIntheArray: columnsPerRowOfDevice * rowsPerDevice,
          imagesPerPage: columnsPerRowOfDevice * rowsPerDevice,
          totalNumberOfPages: Math.round(
            this.state.fetched_photos.length / (columnsPerRowOfDevice * rowsPerDevice)
          ) 
        });
      }
      nextPageAction(){
        this.setState({
          currentPage: this.state.currentPage+1,
          currentStartOfImages: this.state.currentStartOfImages + this.state.imagesPerPage,
          currentLimitIntheArray: this.state.currentLimitIntheArray + this.state.imagesPerPage
        })
       
      }
      previousPageAction(){
       this.setState({
          currentPage: this.state.currentPage-1,
          currentStartOfImages: this.state.currentStartOfImages - this.state.imagesPerPage,
          currentLimitIntheArray: this.state.currentLimitIntheArray - this.state.imagesPerPage
        })
      }
      uploadPhotos(e){
        for (let i = 0; i < e.target.files.length; i++) {
            ReactS3.uploadFile(e.target.files[i], s3configUpload)
                .then((urls) => { console.log(urls.location) })
                .catch((err) => { alert(err) })
        }
      }
      render() {
        return (
          <Container className="container-md">
            <Row className="header-nav-container">
              {/* Title+Upload button --> */}
              <Col className="upload-container col-8">
                <h3>{this.props.match.params.gallery_name} Gallery </h3>
                <input className="inputfile" type="file" multiple id="file" onChange={this.uploadPhotos} />
                <Button><label for="file">Subir Fotos Ahora</label></Button>
              </Col>
              {/* Title+Upload button --> */}
              <Col className="share-container col-4">
                <h5>Share this gallery</h5>
    
                <FontAwesomeIcon icon={faShareAltSquare} />
                <a href="www.google.es">
                  <h6> Copiar Enlace</h6>
                </a>
              </Col>
            </Row>
    
            <Container className="showcase-container">
              {this.state.fetched_photos
                .slice(this.state.currentStartOfImages, this.state.currentLimitIntheArray)
                .map((image, index) => (
                  <Image key={index} src={image} />
                ))}
            </Container>
    
            <Container className="pagination-container">
              <Button className="page-prev-btn" onClick={
    this.previousPageAction} variant="secondary">&#8592;</Button>
          <Button variant="secondary" className="page-info-btn">Página {this.state.currentPage} <br/> de {this.state.totalNumberOfPages}</Button>
          <Button onClick={this.nextPageAction}   variant="secondary">&#10132; </Button>
            </Container>
          </Container>
        );
      }
}
