import React, { Component } from 'react'
import '../../styles/About.css'

class About extends Component {
    componentDidMount(){
        window.scrollTo(0,0)
    }
    
    render() {
        return (
            <div>
            <h2 style={{textAlign: 'center'}}>About Us</h2>
                <p className='about-para'>
                Shayari is something that starts from the heart and eyes of the writer and  remains in the heart and eyes of the listeners for many years! 
                This travel a long path from tears of happiness to tears of loneliness, 
                the beauty of the early sunshine to sleepless nights. Shayari expresses our love for loved ones.
                So in the series of this love , we the team <span style={{color: 'crimson'}}>"bestshayaris.com"</span> provide the best shero-shayari in hindi and urdu for our visitors.
                </p>
                <p className='about-para'>
                Need not to mention, in this new era of readers, we always focus on their interest. 
                Our features are we provide unique as well as interesting content with ease in searching through tags, 
                we have faster page loading time, translation of Shayari in English and the option of directly copying the Shayari, 
                So our visitors can read desired Shayari without any interruption which makes our visitors happy.
                </p>
                <p className='about-para'>
                We always treat our visitors as a part of our family and their views as an honor. 
                So if you have any suggestions to make our family stronger than you are free and open to contact us.
                </p>
            </div>
        )
    }
}

export default About