import React from 'react';
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import Edit from './components/Edit';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      memes: [],
      random: ''
    }
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
    .then(res => res.json())
    .then(data => {
      this.setState({
        memes: data.data.memes,
        random: Math.floor(Math.random() * (data.data.memes.length - 1)) + 1
      })
    })
  }

  nextMeme = (reset) => {
    this.setState({
      random: Math.floor(Math.random() * (this.state.memes.length - 1)) + 1
    }, () => reset())
  }
  render() {
    const { memes, random } = this.state;
    return (
      <>
      <Switch>
        <Route exact path='/' render={props => <Home />} />
        <Route path='/edit' render={props => <Edit memes={memes} random={random} nextMeme={this.nextMeme}/>} />
      </Switch>
      </>
    )
  }
}


export default App