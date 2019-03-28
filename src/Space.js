import React, { Component } from 'react';
import './Space.css';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Space extends Component {
    state = {
        url: '',
        hdurl: '',
        title: '',
        explanation: '',
        date: '',
        copyright: '',
        hasError: false
    }

    componentDidMount() {
        this.callApi()
            .then(res => {
                this.setState({
                    url: res.url,
                    hdurl: res.hdurl,
                    title: res.title,
                    explanation: res.explanation,
                    date: res.date,
                    copyright: res.copyright,
                    hasError: false
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
                    <Col>1</Col>
                    <Col>2</Col>
                    <Col>3</Col>
                </Row>
                <Row>
                    <Col>
                        <Image src={this.state.url} alt={this.state.explanation} className='space-image'/>
                    </Col>
                    <Col>
                        <Image src={this.state.url} alt={this.state.explanation} className='space-image'/>
                    </Col>
                    <Col>
                        <Image src={this.state.url} alt={this.state.explanation} className='space-image'/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Image src={this.state.url} alt={this.state.explanation} className='space-image'/>
                    </Col>
                    <Col>
                        <Image src={this.state.url} alt={this.state.explanation} className='space-image'/>
                    </Col>
                    <Col>
                        <Image src={this.state.url} alt={this.state.explanation} className='space-image'/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Space;