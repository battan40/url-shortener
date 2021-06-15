import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  addUrl = (newUrl) => {
    postUrls(newUrl)
    .then(data => this.setState({ urls: [...this.state.urls, data]}))
  }

  componentDidMount = () => {
    getUrls()
    .then(data => this.setState({urls: [...data.urls]}))
    .catch(err => 'uhoh, having trouble with that url.  Please try again later.')
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1 className='main-title'>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl}/>
        </header>
        <section className='url'>
        <UrlContainer urls={this.state.urls}/>
        </section>
      </main>
    );
  }
}

export default App;
