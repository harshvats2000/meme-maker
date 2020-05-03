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
            zIndex: 10
        }
        const headerNameStyle = {
            fontSize: '28px',
            verticalAlign: 'top',
            marginLeft: '10px'
        }
        const searchLink = {
            textDecoration: 'none',
            color: 'crimson'
        }

        return (
            <div 
            style={headerStyle}
            >
              <MenuContainer />
              <span style={headerNameStyle}><Link to='/' style={searchLink}>𝓫𝓮𝓼𝓽𝓼𝓱𝓪𝔂𝓪𝓻𝓲𝓼.𝓬𝓸𝓶</Link><span></span></span>
              <Search tags={tags} />
            </div>
        )
    }
}

export default Header