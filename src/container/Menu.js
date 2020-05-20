import React, { Component } from 'react';
import Menu from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';

class MenuContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    toggleDrawer = () => {
      this.setState({
        open: !this.state.open
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
            </List>
          </div>
        );
          
      return (
          <React.Fragment>

              <Menu fontSize='large' onClick={this.toggleDrawer} />

              <Drawer anchor='left' open={this.state.open} onClose={this.toggleDrawer}>
                {list()}
              </Drawer>
          </React.Fragment>
      )
    }
}

export default MenuContainer;