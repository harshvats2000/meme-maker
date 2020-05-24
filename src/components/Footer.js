import React, { Component } from 'react'
import '../styles/Footer.css';
import { Link } from 'react-router-dom'

class Footer extends Component {
    render() {
        return (
            <div className='footer'>
                <Link to='/about' className='footerAbout'>About Us</Link>
                <div 
                className='footerContact'>
                Contact Us:
                <span style={{letterSpacing: '1px'}}>&ensp;
                <a href='mailto:bestshayari4u@gmail.com' style={{textDecoration: 'none', fontSize: '20px'}}>
                bestshayari4u@gmail.com</a></span>
                </div>
            </div>
        )
    }
}

export default Footer