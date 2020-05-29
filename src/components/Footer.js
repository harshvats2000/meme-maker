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
                    <a href='mailto:bestshayari4u@gmail.com' style={{color: 'white'}}>Contact Us</a>
                </div>
            </div>
        )
    }
}

export default Footer