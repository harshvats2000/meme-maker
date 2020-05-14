import React, { Component } from 'react';
import Menu from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';

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
        const list = () => (
            <div
              role="presentation"
              onClick={() => this.toggleDrawer()}
              onKeyDown={() => this.toggleDrawer()}
            >
              <List>
                  <ListItem button>
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText><Link to='/' className='drawerTextLink'>Home</Link></ListItemText>
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon><InfoIcon/></ListItemIcon>
                    <ListItemText><Link to='/about' className='drawerTextLink'>About Us</Link></ListItemText>
                  </ListItem>
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