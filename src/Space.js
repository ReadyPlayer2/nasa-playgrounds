import React, { Component } from 'react';
import './Space.css';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Space extends Component {
    state = {
        images: []
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

    callApi = async () => {
        const response = await fetch('/image');
        const body = await response.json();

        return body;
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        
        return (
            <Container>
                <Row>
                    {/* Iterate over image list and display each one */}
                    {this.state.images.map(image => (
                        <Col key={image.url}>
                            <Image src={image.url} alt={image.explanation} className='space-image'/>
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }
}

export default Space;