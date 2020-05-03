import React, { Component } from 'react'
import '../styles/Home.css';
import { Link } from 'react-router-dom'

class Home extends Component {

    render() {
        const { tags, shayariObject } = this.props;
        return (
            <React.Fragment>
                {
                    tags.map(tag => (
                    <div className='tagCards' 
                    key={tag}>
                    <Link to={`/tags/${tag}`}>{tag}</Link><span> {shayariObject[tag].totalShayaris}</span>
                    </div>
                    ))
                }
            </React.Fragment>
        )
    }
}

export default Home