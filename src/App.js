import React, { Component } from 'react';
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import Error404 from './components/Error404';
import firebase from 'firebase/app'
import 'firebase/firestore'
import TagPage from './components/pages/TagPage';
import Upload from './components/Upload';
import Edit from './components/pages/Edit';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/pages/About';
import mainTags from './constants/Maintags';
import HomeTagCards from './components/HomeTagCards';
import SuggestionPage from './components/pages/SuggestionPage';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Theme"
import 'aos/dist/aos.css';
import AOS from 'aos'
// import GetTotalPosts from './functions/GetTotalPosts';
// import RenameTag from './functions/RenameTag';

class App extends Component {
  constructor(){
    super()
    this.state = {
        theme: 'light',
        tags: [],
        shayariObject: {},
        title: [],
        content: [],
        poet: [],
        id: [],
        relatedTags: {},
        totalShayaris: 0,
    }
  }

  componentDidMount() {
    AOS.init()
    AOS.refresh()
    
    var tagsArray = [];
    var tempShayariObject = {};
    var totalShayaris = 0;
    firebase.firestore().collection('tags').get()
    .then(snap => {
      var total = 0;
      snap.forEach(doc => {
        var tag =  doc.id;
        totalShayaris = doc.data().totalShayaris;
        total += totalShayaris;
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
        totalShayaris: total,
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
    var idArray = [];
    var tempTagsObject = {};
    var i = 0;
    firebase.firestore().collection('tags').doc('sher').collection('shayaris').orderBy('timestamp', 'desc').limit(9).get()
    .then(snap => {
      snap.forEach(doc => {
            idArray.push(doc.id);
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
            id: idArray,
            relatedTags: Object.assign(this.state.relatedTags, tempTagsObject)
          })
        })
  }

  putIntoShayariObject = (shayariObject) => {
    this.setState(prev => ({
      shayariObject: Object.assign(prev.shayariObject, shayariObject)
    }))
  }

  themeToggler = () => {
    this.state.theme === 'light' ? this.setState({theme: 'dark'}) : this.setState({theme: 'light'})
  }

  render() {
    const { theme, tags, shayariObject, title, content, poet, id, relatedTags, totalShayaris } = this.state;

    return (
      <ThemeProvider theme={this.state.theme === 'light' ? lightTheme : darkTheme}>
      {/* <GetTotalPosts /> */}
      {/* <RenameTag from='angdaai ' to='angdaai'/> */}
      <GlobalStyles/>
      <div className="App">

          <Header theme={theme} themeToggler={this.themeToggler} tags={tags} shayariObject={shayariObject} />
          <div style={{overflowX: 'hidden'}}>


          <Switch>
            <Route exact path='/' 
            render={props => <Home 
                              tags={tags} title={title} content={content} poet={poet} id={id} 
                              relatedTags={relatedTags} totalShayaris={totalShayaris} theme={theme} />} />

            <Route path='/tags/:tag/' render={props => 
            <TagPage 
            tag={props.match.params.tag} theme={theme}
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
      </div>
      </ThemeProvider>
    )
  }
}

export default App;