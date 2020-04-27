import React, { Component } from 'react';
import './App.css'
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import Home from './components/Home';
import Error404 from './components/Error404';
import Menu from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import firebase from 'firebase'
import TagPage from './components/TagPage';
import Upload from './container/Upload';

class App extends Component {
  constructor(){
    super()
    this.state = {
        tags: [],
        drawer: false,
        loading: true,
        shayariObject: {}
    }
  }

  componentDidMount() {
    var tagsArray = [];
    var tempShayariObject = {};
    firebase.firestore().collection('tags').get()
    .then(snap => {
      snap.forEach(doc => {
        var tag =  doc.id;
        tagsArray.push(tag)
        tempShayariObject[tag] = {
          titleArray: [],
          contentArray: []
        }
      })
      this.setState(prev => ({
        tags: tagsArray,
        loading: false,
        shayariObject: Object.assign({}, prev.shayariObject, tempShayariObject)
      }))
    })
    .catch(error => {
      alert(error)
    })
  }

  putIntoShayariObject = (shayariObject) => {
    console.log(shayariObject);
    console.log(this.state.shayariObject)
    this.setState(prev => ({
      shayariObject: Object.assign(prev.shayariObject, shayariObject)
    }))
  }

  toggleDrawer = () => {
    this.setState({
      drawer: !this.state.drawer
    })
  }

  render() {
    const list = () => (
      <div
        role="presentation"
        onClick={() => this.toggleDrawer()}
        onKeyDown={() => this.toggleDrawer()}
      >
        <List>
            <ListItem button>
              <ListItemIcon><HomeIcon/> </ListItemIcon>
              <ListItemText><Link to='/' className='drawerTextLink'>Home</Link></ListItemText>
            </ListItem>
        </List>
      </div>
    );

    return (
      this.state.loading ? <h1>loading</h1> :
      <div className="App">
      <HashRouter>
      
      <div className='header'><Menu fontSize='large' onClick={this.toggleDrawer} /></div>

        <Switch>
          <Route exact path='/' render={props => <Home tags={this.state.tags} />} />

          <Route path='/tags/:tag' render={props => 
          <TagPage 
          tag={props.match.params.tag}
          shayariObject={this.state.shayariObject}
          putIntoShayariObject={this.putIntoShayariObject} />} />

          <Route exact path='/upload' render={props => <Upload tags={this.state.tags} />} />

          <Route path='*' component={Error404} />
        </Switch>

        <Drawer anchor='top' open={this.state.drawer} onClose={this.toggleDrawer}>
            {list()}
          </Drawer>
      </HashRouter>
    </div>
    )
  }
}

export default App;