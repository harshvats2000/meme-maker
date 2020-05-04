import React, { Component } from 'react'
import MenuContainer from '../container/Menu';
import { Link } from 'react-router-dom'
import Search from './Search';

class Header extends Component {
    render() {
        const { tags } = this.props;
        const headerStyle = {
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 10,
        }
        const headerNameStyle = {
            fontSize: '28px',
            position: 'absolute',
            bottom: '4px',
            marginLeft: '10px',
            fontFamily: 'Alconica',
            textDecoration: 'none',
            color: 'crimson'
        }

        return (
            <div 
            style={headerStyle}
            >
              <MenuContainer />
              <Link to='/' style={headerNameStyle}>bestshayaris.com</Link>
              <Search tags={tags} />
            </div>
        )
    }
}

export default Header