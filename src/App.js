import React, { Component } from 'react';
import './App.css'
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import Home from './components/Home';
import Error404 from './components/Error404';
import firebase from 'firebase'
import TagPage from './components/TagPage';
import Upload from './components/Upload';
import Search from './components/Search';
import MenuContainer from './container/Menu';
import Edit from './components/Edit';

class App extends Component {
  constructor(){
    super()
    this.state = {
        tags: [],
        loading: true,
        shayariObject: {}
    }
  }

  componentDidMount() {
    var tagsArray = [];
    var tempShayariObject = {};
    var totalShayaris = 0;
    firebase.firestore().collection('tags').get()
    .then(snap => {
      snap.forEach(doc => {
        var tag =  doc.id;
        totalShayaris = doc.data().totalShayaris;
        tagsArray.push(tag)
        tempShayariObject[tag] = {
          titleArray: [],
          totalShayaris: totalShayaris
        }
      })
      tagsArray.forEach(tag => {
        tempShayariObject[tag].relatedTagsObject = {};
        for(let i=0; i<totalShayaris; i++){
          tempShayariObject[tag].relatedTagsObject[i] = [];
        }
      })
      this.setState(prev => ({
        tags: tagsArray,
        loading: false,
        shayariObject: Object.assign({}, prev.shayariObject, tempShayariObject)
      }))
    })
    .catch(error => {
      alert(error.message)
    })
  }

  putIntoShayariObject = (shayariObject) => {
    this.setState(prev => ({
      shayariObject: Object.assign(prev.shayariObject, shayariObject)
    }))
  }

  render() {
    const { tags, shayariObject } = this.state;

    return (
      this.state.loading ? <h1>loading</h1> :
      <div className="App">
      <HashRouter>
      <div 
      className='header'>
        <MenuContainer />
        <span className='headerName'><Link to='/' className='link'>𝓫𝓮𝓼𝓽𝓼𝓱𝓪𝔂𝓪𝓻𝓲𝓼.𝓬𝓸𝓶</Link><span></span></span>
        <Search tags={tags} />
      </div>

      <Switch>
        <Route exact path='/' render={props => <Home tags={tags} shayariObject={shayariObject} />} />

        <Route path='/tags/:tag' render={props => 
        <TagPage 
        tag={props.match.params.tag}
        shayariObject={shayariObject}
        putIntoShayariObject={this.putIntoShayariObject} />} />

        <Route exact path='/upload' render={props => <Upload tags={tags} />} />
        <Route exact path='/edit' render={props => <Edit tags={tags} />} />

        <Route path='*' component={Error404} />
      </Switch>
      </HashRouter>
    </div>
    )
  }
}

export default App;