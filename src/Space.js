import React, { Component } from 'react';
import './Space.css';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactPlayer from 'react-player';
import _ from 'lodash';

class Space extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [],
            isLoading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.callApi()
            .then(res => {
                this.setState({
                    images: this.state.images.concat(res),
                    isLoading: false
                })
            })
            .catch(err => {
                this.setState({ hasError: true });
                console.log(err);
            });

        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        event.preventDefault();
        
        // don't do anything if we're already loading more content
        if (this.state.isLoading) {
            return false;
        }

        // load more content if we've reached the bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.setState({
                isLoading: true
            })
            this.componentDidMount();
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit(event) {
        this.componentDidMount();

        event.preventDefault();
    }

    callApi = async () => {
        var response;
        if (this.state.userApiKey != null) {
            let keyQuery = '?api_key=' + this.state.userApiKey;
            response = await fetch('/image' + keyQuery);
        } else {
            response = await fetch('/image');
        }
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
            <div>
                <Container>
                    <Row>
                        <Col>
                            <input type='text' name='userApiKey' placeholder='Paste API key here' onChange={this.handleChange} className='api_key' />
                        </Col>
                        <Col>
                            <form onSubmit={this.handleSubmit}>
                                <input type="submit" value="Go!" className='submit' />
                            </form>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        {/* Iterate over image list and display each one */}
                        {this.state.images.map(image => (
                            this.getCol(image)
                        ))}
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col>
                            <div className='loading' hidden={!this.state.isLoading}></div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Space;