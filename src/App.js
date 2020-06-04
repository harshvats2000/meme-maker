import React, { Component } from 'react';
import './App.css'
import { connect } from 'react-redux'
import { fetchTags } from './actions/fetchTags'

import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from './components/pages/Home';
import Error404 from './components/Error404';
import TagPage from './components/pages/TagPage';
import Upload from './components/Upload';
import Edit from './components/pages/Edit';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/pages/About';
// import HomeTagCards from './components/HomeTagCards';
import SuggestionPage from './components/pages/SuggestionPage';
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Theme"
import 'aos/dist/aos.css';
// import AOS from 'aos'
import PoetPage from './components/pages/WriterPage';
import SearchPoet from './components/pages/SearchWriter';
import HomePoetCards from './components/HomePoetCards';
import SnackbarContainer from './container/Snackbar';
// import GetTotalPosts from './functions/GetTotalPosts';
// import RenameTag from './functions/RenameTag';

class App extends Component {

  componentDidMount() {
    this.props.fetchTags()
  }

  render() {
    const { open, message, autoHideDuration, theme } = this.props;

    return (
      <BrowserRouter>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      {/* <GetTotalPosts /> */}
      {/* <RenameTag from='angdaai ' to='angdaai'/> */}
      <GlobalStyles/>
      <div className="App">

          <Header />

          <Switch>
            <Route exact path='/' render={props => <Home />} />
            <Route path='/tags/:tag' render={props => <TagPage tag={props.match.params.tag} />} />
            <Route exact path='/poet/' render={props => <SearchPoet />} />
            <Route path='/poet/:poet/' render={props => <PoetPage />} />
            <Route exact path='/upload' render={props => <Upload />} />
            <Route exact path='/edit' render={props => <Edit />} />
            <Route exact path='/about' render={props => <About />} />
            <Route exact path='/suggest' render={props => <SuggestionPage /> } />
            
            <Route path='*' component={Error404} />
          </Switch>
                
          <hr/>
          <div>      
            <h2 style={{fontFamily: 'Alconica', textAlign: 'center'}}>Top Poets</h2>
            <HomePoetCards/>
          </div> 
          {/* <div>      
            <h2 style={{fontFamily: 'Alconica', textAlign: 'center'}}>Top Tags</h2>
            <HomeTagCards/>
          </div>  */}
          <Footer />
      </div>
      
      <SnackbarContainer 
      open={open} 
      message={message}
      handleClose={this.handleClose}
      autoHideDuration={autoHideDuration}
      />
      </ThemeProvider>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  open: state.snackbar.open,
  message: state.snackbar.message,
  handleClose: state.snackbar.handleClose,
  autoHideDuration: state.snackbar.autoHideDuration,
  theme: state.theme.theme
})

export default connect(mapStateToProps, { fetchTags })(App)