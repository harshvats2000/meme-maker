import React, { Component } from 'react';
import Menu from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import { AuthenticationConsumer, PhotoURLConsumer, DisplayNameConsumer } from '../components/context';
import firebase from 'firebase'
import MuiAlert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core';

class MenuContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            snackbar: false,
            message: '',
            severity: ''
        }
    }

    toggleDrawer = () => {
      this.setState({
        open: !this.state.open
      })
    }

    logout = () => {
      firebase.auth().signOut()
      .then(res => {
        this.setState({
          snackbar: true,
          message: 'successfully logged out!',
          severity: 'success'
        })
      })
      .catch(err => {
        this.setState({
          snackbar: true,
          message: 'cannot logout due to some error!',
          severity: 'error'
        })
      })
    }

    handleClose = () => {
      this.setState({
        snackbar: false
      })
    }

    render() {
      const drawerTextLinkStyle = {
        textDecoration: 'none',
        color: 'black'
      }
      
      const list = () => (
          <div
            role="presentation"
            onClick={() => this.toggleDrawer()}
            onKeyDown={() => this.toggleDrawer()}
          >
            <List>
                <AuthenticationConsumer>
                {
                  authenticated => {
                    return (
                      !authenticated 
                      ?
                      <Link to='/login' style={drawerTextLinkStyle}>
                        <ListItem button>
                          <ListItemText>Log In</ListItemText>
                          <ListItemIcon><ArrowRightAltIcon/></ListItemIcon>
                        </ListItem>
                      </Link> 
                      :
                      <Link to='/profile' style={drawerTextLinkStyle}>
                        <ListItem button>
                          <PhotoURLConsumer>
                            {
                              url => {
                                return <ListItemIcon><img src={url} alt='profile_photo' style={{height: '30px', width: '30px', borderRadius: '50%'}} /></ListItemIcon>
                              }
                            }
                          </PhotoURLConsumer>
                          <DisplayNameConsumer>
                            {
                              name => {
                                return <ListItemText>{name}</ListItemText>
                              }
                            }
                          </DisplayNameConsumer>
                        </ListItem>
                      </Link>
                    )
                  }
                }
                </AuthenticationConsumer>

                <Divider/>

                <Link to='/' style={drawerTextLinkStyle}>
                  <ListItem button>
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText>Home</ListItemText>
                  </ListItem>
                </Link>

                <Link to='/about' style={drawerTextLinkStyle}>
                  <ListItem button>
                    <ListItemIcon><InfoIcon/></ListItemIcon>
                    <ListItemText>About Us</ListItemText>
                  </ListItem>
                </Link>

                <Link to='/suggest' style={drawerTextLinkStyle}>
                  <ListItem button>
                    <ListItemIcon><RateReviewIcon /></ListItemIcon>
                    <ListItemText>Suggestions?</ListItemText>
                  </ListItem>
                </Link>

                <Divider/>

                <Link to='/tags/sher' style={drawerTextLinkStyle}>
                  <ListItem button>
                    <ListItemText>Sher</ListItemText>
                    <ListItemIcon><ArrowRightAltIcon/></ListItemIcon>
                  </ListItem>
                </Link>

                <Link to='/tags/ghazal' style={drawerTextLinkStyle}>
                  <ListItem button>
                    <ListItemText>Ghazal</ListItemText>
                    <ListItemIcon><ArrowRightAltIcon/></ListItemIcon>
                  </ListItem>
                </Link>

                <Link to='/tags/poems' style={drawerTextLinkStyle}>
                  <ListItem button>
                    <ListItemText>Poems</ListItemText>
                    <ListItemIcon><ArrowRightAltIcon/></ListItemIcon>
                  </ListItem>
                </Link>

                <Divider />

                <a href='https://www.facebook.com/hindishayarisbest/?modal=admin_todo_tour' target="_blank" style={drawerTextLinkStyle}>
                  <ListItem button>
                    <ListItemIcon><FacebookIcon/></ListItemIcon>
                  </ListItem>
                </a>

                <Divider />

                <AuthenticationConsumer>
                {
                  authenticated => {
                    return (
                      !authenticated ? null
                      :
                        <ListItem button onClick={this.logout}>
                          <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                          <ListItemText>Logout</ListItemText>
                        </ListItem>
                    )
                  }
                }
                </AuthenticationConsumer>
            </List>
          </div>
        );
          
      return (
          <React.Fragment>

              <Menu fontSize='large' onClick={this.toggleDrawer} />

              <Drawer anchor='left' open={this.state.open} onClose={this.toggleDrawer}>
                {list()}
              </Drawer>

              <Snackbar open={this.state.snackbar} autoHideDuration={3000} onClose={this.handleClose}>
                <MuiAlert elevation={6} variant='filled' severity={this.state.severity}>{this.state.message}</MuiAlert>
              </Snackbar>
          </React.Fragment>
      )
    }
}

export default MenuContainer;