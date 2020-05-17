import React, { Component } from 'react'
import '../styles/Footer.css';
import { Link } from 'react-router-dom'

class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <Link to='/about' className='footerAbout'>About Us</Link>
                <div className='footerContact'>Contact Us:<span style={{letterSpacing: '1px'}}>&ensp;bestshayari4u@gmail.com</span></div>
            </div>
        )
    }
}

export default Footer