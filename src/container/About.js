import React, { Component } from 'react'
import '../styles/About.css'

class About extends Component {
    render() {
        return (
            <div>
            <h2 style={{textAlign: 'center'}}>About Us</h2>
                <p className='about-para'>
                Shayari is like something started from heart and eyes of a writer and remain in the heart and eyes of many listeners for years. 
                This travel a long path from tears of happiness to tears of loneliness , beauty of the early sunshine to  sleepless nights.
                Shayari express our love for loving ones.
                So in the series of this love , we the team <span style={{color: 'crimson'}}>"bestshayaris.com"</span> providing best shero-shayari in hindi and urdu for our visitors.
                </p>
                <p className='about-para'>
                Needs not to mention , in this new era of readers, 
                we always focus on their interest and provide unique and interesting content with ease in searching through tags, 
                having faster page loading time and option of direct copying the content, 
                So our visitors can read desired articles without any interruption that makes our visitors Happy.
                </p>
                <p className='about-para'>
                We always take our visitors as our family and their views as honour so if you have any 
                suggestion to make our family more stronger than you are free and open to contact us.
                </p>
            </div>
        )
    }
}

export default About