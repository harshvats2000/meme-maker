import React, { Component } from 'react'
import MenuContainer from '../container/Menu';
import { Link } from 'react-router-dom'
import Search from './Search';

class Header extends Component {

    componentDidMount(){
        var prev = window.pageYOffset
        var header = document.getElementById('header')
        window.addEventListener('scroll', () => {
            var curr = window.pageYOffset
            if(prev > curr){
                header.style.top = '0'
            } 
            else {
                header.style.top = '-40px'
            }
            prev = curr;
        })
    }

    render() {
        const { theme, themeToggler, tags, shayariObject } = this.props;
        const headerStyle = {
            transition: 'all .5s linear',
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            zIndex: 10,
        }
        const darkHeaderStyle = {
            transition: 'all .5s linear',
            position: 'sticky',
            top: 0,
            backgroundColor: '#363537',
            zIndex: 10,
        }
        const headerNameStyle = {
            fontSize: '28px',
            position: 'absolute',
            bottom: '4px',
            fontFamily: 'Alconica',
            textDecoration: 'none',
            color: 'crimson',
            marginLeft: '5px'
        }

        return (
            <div 
            id='header'
            style={theme === 'light' ? headerStyle : darkHeaderStyle}
            >
              <MenuContainer theme={theme} themeToggler={themeToggler} />
              <Link to='/' style={headerNameStyle}>bestshayaris.com</Link>
              <Search theme={theme} tags={tags} shayariObject={shayariObject} />
            </div>
        )
    }
}

export default Header