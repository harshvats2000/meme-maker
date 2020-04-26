import React, { Component } from 'react';
import './App.css'
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import Home from './components/Home';
import Error404 from './components/Error404';
import About from './components/About';
import Menu from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import firebase from 'firebase'
import TagPage from './components/TagPage';

class App extends Component {
  constructor(){
    super()
    this.state = {
        tags: [],
        drawer: false,
        loading: true,
        shayariObject: {},
    }
  }

  componentDidMount() {
    firebase.firestore().collection('tags').get()
    .then(snap => {
      var tagsArray = [];
      var shayariObject = {};

      snap.forEach(doc => {
        var tag = doc.id;
        var title = doc.data().title;
        var content = doc.data().content;
        tagsArray.push(tag);
        var tempObject = {
          [tag]: {
            title: [title],
            content: [content]
          }
        }
        Object.assign(shayariObject, tempObject)
      })
      this.setState({
        loading: false,
        tags: tagsArray,
        shayariObject: shayariObject
      })
    })
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
            <ListItem button>
            <ListItemIcon><InfoIcon/> </ListItemIcon>
              <ListItemText><Link to='/about' className='drawerTextLink'>About Us</Link></ListItemText>
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

          <Route path='/:tag' render={props => 
          <TagPage 
          tag={props.match.params.tag} 
          shayariObject={this.state.shayariObject} />} />

          <Route path='/about' component={About} />

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