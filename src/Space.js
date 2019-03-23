import React from 'react';

class Space extends React.Component {
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
            <div>
                <img src={this.state.url} alt={this.state.explanation} />
            </div>
        )
    }
}

export default Space;