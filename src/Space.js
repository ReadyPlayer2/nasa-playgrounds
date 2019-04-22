import React, { Component } from 'react';
import './Space.css';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactPlayer from 'react-player';

class Space extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: []
        }

        this.handleChange = this.handleChange.bind(this);
    }
    

    componentDidMount() {
        this.callApi()
            .then(res => {
                let images = [];

                // iterate over all returned images and store details in state
                for (let i = 0; i < res.length; i++) {
                    const imageObj = {
                        url: res[i]['url'],
                        hdurl: res[i]['hdurl'],
                        title: res[i]['title'],
                        explanation: res[i]['explanation'],
                        date: res[i]['date'],
                        copyright: res[i]['copyright'],
                        media_type: res[i]['media_type']
                    }

                    images.push(imageObj);
                }

                this.setState({
                    images: images
                })
            })
            .catch(err => {
                this.setState({ hasError: true });
                console.log(err);
            });
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        })
      }

    callApi = async () => {
        const response = await fetch('/image');
        const body = await response.json();

        return body;
    }

    getCol(image) {
        if (image.media_type === 'image') {
            return (
                <Col key={image.url}>
                    <Image src={image.url} alt={image.explanation} className='space-image' />
                </Col>
            );
        } else if (image.media_type === 'video') {
            return (
                <Col key={image.url}>
                    <ReactPlayer url={image.url} controls className='space-image' />
                </Col>
            );
        } else {
            return (
                <h1>Unsupported media_type</h1>
            )
        }
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return (
            <div className='App-content'>
                <input type='text' name='userApiKey' placeholder='Paste API key here' onChange={this.handleChange}/>
                <Container>
                    <Row>
                        {/* Iterate over image list and display each one */}
                        {this.state.images.map(image => (
                            this.getCol(image)
                        ))}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Space;