import React, { Component } from 'react';
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import Error404 from './components/Error404';
import firebase from 'firebase'
import TagPage from './components/pages/TagPage';
import Upload from './components/Upload';
import Edit from './components/pages/Edit';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/pages/About';
import mainTags from './constants/Maintags';
import HomeTagCards from './components/HomeTagCards';
import SuggestionPage from './components/SuggestionPage';

class App extends Component {
  constructor(){
    super()
    this.state = {
        tags: [],
        shayariObject: {},
        title: [],
        content: [],
        poet: [],
        relatedTags: {},
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
          totalShayaris: totalShayaris
        }
      })

      tagsArray.forEach(tag => {
        tempShayariObject[tag].relatedTagsObject = {};
        tempShayariObject[tag].titleObject = {}
        tempShayariObject[tag].contentObject = {}
        tempShayariObject[tag].poetObject = {}
        for(let i=0; i<totalShayaris; i++){
          tempShayariObject[tag].titleObject[i] = '';
          tempShayariObject[tag].contentObject[i] = '';
          tempShayariObject[tag].poetObject[i] = '';
          tempShayariObject[tag].relatedTagsObject[i] = [];
        }
      })
      
      this.setState(prev => ({
        tags: tagsArray,
        shayariObject: Object.assign({}, prev.shayariObject, tempShayariObject)
      }))
    })
    .catch(error => {
      console.log(error);
      alert('error in app.js did mount')
    })
    //fetching shayaris for home page
    var titleArray = [];
    var contentArray = [];
    var poetArray = [];
    var tempTagsObject = {};
    var i = 0;
    firebase.firestore().collection('tags').doc('sher').collection('shayaris').get()
    .then(snap => {
        snap.forEach(doc => {
            titleArray.push(doc.data().title);
            contentArray.push(doc.data().content);
            poetArray.push(doc.data().poet);
            Object.assign(tempTagsObject, {
                [i]: doc.data().tags
            })
            i++;
        })
        this.setState({
            title: titleArray,
            content: contentArray,
            poet: poetArray,
            relatedTags: Object.assign(this.state.relatedTags, tempTagsObject)
        })
    })
  }

  putIntoShayariObject = (shayariObject) => {
    this.setState(prev => ({
      shayariObject: Object.assign(prev.shayariObject, shayariObject)
    }))
  }

  render() {
    const { tags, shayariObject, title, content, poet, relatedTags } = this.state;

    return (
      <div className="App">
          
          <Header tags={tags} shayariObject={shayariObject} />

          <Switch>
            <Route exact path='/' render={props => <Home tags={tags} title={title} content={content} poet={poet} relatedTags={relatedTags} />} />

            <Route path='/tags/:tag' render={props => 
            <TagPage 
            tag={props.match.params.tag}
            shayariObject={shayariObject}
            putIntoShayariObject={this.putIntoShayariObject} />} />

            <Route exact path='/upload' render={props => <Upload tags={tags} />} />
            <Route exact path='/edit' render={props => <Edit tags={tags} />} />
            <Route exact path='/about' render={props => <About />} />
            <Route exact path='/suggest' render={props => <SuggestionPage /> } />
            
            <Route path='*' component={Error404} />
          </Switch>

          <h2 style={{fontFamily: 'Alconica', textAlign: 'center'}}>Top Tags</h2>
          <HomeTagCards mainTags={mainTags} />

          <Footer />
    </div>
    )
  }
}

export default App;