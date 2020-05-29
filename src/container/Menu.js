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
import { withStyles } from "@material-ui/core/styles";
import SwitchMode from '@material-ui/core/Switch';

const styles = {
  paper: {
    background: "#363537"
  }
};

class MenuContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
        }
    }

    toggleDrawer = () => {
      this.setState({
        open: !this.state.open
      })
    }

    render() {
      const { classes, theme, themeToggler } = this.props;
      const darkStyle = {
        color: 'white'
      }
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
                    <ListItemIcon style={theme === 'dark' ? darkStyle : null}><HomeIcon/></ListItemIcon>
                    <ListItemText style={theme === 'dark' ? darkStyle : null}>Home</ListItemText>
                  </ListItem>
                </Link>

                <Link to='/about' style={drawerTextLinkStyle}>
                  <ListItem button>
                    <ListItemIcon style={theme === 'dark' ? darkStyle : null}><InfoIcon/></ListItemIcon>
                    <ListItemText style={theme === 'dark' ? darkStyle : null}>About Us</ListItemText>
                  </ListItem>
                </Link>

                <Link to='/suggest' style={drawerTextLinkStyle}>
                  <ListItem button>
                    <ListItemIcon style={theme === 'dark' ? darkStyle : null}><RateReviewIcon /></ListItemIcon>
                    <ListItemText style={theme === 'dark' ? darkStyle : null}>Suggestions?</ListItemText>
                  </ListItem>
                </Link>

                <Divider/>

                <Link to='/tags/sher' style={drawerTextLinkStyle}>
                  <ListItem button>
                    <ListItemText style={theme === 'dark' ? darkStyle : null}>Sher</ListItemText>
                    <ListItemIcon style={theme === 'dark' ? darkStyle : null}><ArrowRightAltIcon/></ListItemIcon>
                  </ListItem>
                </Link>

                <Link to='/tags/ghazal' style={drawerTextLinkStyle}>
                  <ListItem button>
                    <ListItemText style={theme === 'dark' ? darkStyle : null}>Ghazal</ListItemText>
                    <ListItemIcon style={theme === 'dark' ? darkStyle : null}><ArrowRightAltIcon/></ListItemIcon>
                  </ListItem>
                </Link>

                <Link to='/tags/poems' style={drawerTextLinkStyle}>
                  <ListItem button>
                    <ListItemText style={theme === 'dark' ? darkStyle : null}>Poems</ListItemText>
                    <ListItemIcon style={theme === 'dark' ? darkStyle : null}><ArrowRightAltIcon/></ListItemIcon>
                  </ListItem>
                </Link>

                <Link to='/poet/' style={drawerTextLinkStyle}>
                  <ListItem button>
                    <ListItemText style={theme === 'dark' ? darkStyle : null}>Writers</ListItemText>
                    <ListItemIcon style={theme === 'dark' ? darkStyle : null}><ArrowRightAltIcon/></ListItemIcon>
                  </ListItem>
                </Link>

                <Divider />

                <a href='https://www.facebook.com/hindishayarisbest/?modal=admin_todo_tour' target="_blank" rel="noopener noreferrer" style={drawerTextLinkStyle}>
                  <ListItem button>
                    <ListItemIcon style={theme === 'dark' ? darkStyle : null}><FacebookIcon/></ListItemIcon>
                  </ListItem>
                </a>

                <Divider />

                <ListItem>
                <ListItemText style={theme === 'dark' ? darkStyle : null}>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</ListItemText>
                  <SwitchMode
                    checked={theme === 'dark' ? true : false}
                    onChange={themeToggler}
                    name="checkedA"
                  />
                </ListItem>

            </List>
          </div>
        );
          
      return (
          <React.Fragment>

              <Menu fontSize='large' onClick={this.toggleDrawer} />

              <Drawer classes={{ paper: this.props.theme === 'dark' ? classes.paper : null }} anchor='left' open={this.state.open} onClose={this.toggleDrawer}>
                {list()}
              </Drawer>
          </React.Fragment>
      )
    }
}

export default withStyles(styles)(MenuContainer);