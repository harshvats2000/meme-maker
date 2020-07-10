import React from 'react';
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import Edit from './components/Edit';

class App extends React.Component {
  render() {
    return (
      <>
      <Switch>
        <Route exact path='/' render={props => <Home />} />
        <Route path='/edit' render={props => <Edit />} />
      </Switch>
      </>
    )
  }
}


export default App