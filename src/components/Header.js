import React, { Component } from 'react'
import MenuContainer from '../container/Menu';
import { Link } from 'react-router-dom'
import Search from './Search';

class Header extends Component {
    render() {
        const { theme, tags, shayariObject } = this.props;
        const headerStyle = {
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 10,
        }
        const darkHeaderStyle = {
            position: 'sticky',
            top: 0,
            backgroundColor: '#363537',
            zIndex: 10,
            transition: '.5s'
        }
        const headerNameStyle = {
            fontSize: '28px',
            position: 'absolute',
            bottom: '4px',
            fontFamily: 'Alconica',
            textDecoration: 'none',
            color: 'crimson'
        }

        return (
            <div 
            style={theme === 'light' ? headerStyle : darkHeaderStyle}
            >
              <MenuContainer theme={theme} />
              <Link to='/' style={headerNameStyle}>bestshayaris.com</Link>
              <Search theme={theme} tags={tags} shayariObject={shayariObject} />
            </div>
        )
    }
}

export default Header