import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        const btnStyle = {
            padding: '10px',
            fontSize: '20px',
            marginTop: '20px',
            border: 'none',
            boxShadow: '4px 4px 8px 1px darkmagenta',
            borderRadius: '6px'
        }
        return (
            <div style={{ textAlign: 'center', color: 'white'}} id='home'>
                <div style={{ color: 'white', fontSize: '30px', padding: '5px'}}>Make memes using pre-made templates.</div>
                <Link to='/edit'>
                    <button style={btnStyle}>Let's start</button>
                </Link>
                <div>
                    <ol>
                        <li>Click anywhere on the pic to start editing.</li>
                        <li>Click on the text to change color.</li>
                        <li>Take screenshot of the edited template and it's done.</li>
                    </ol>
                </div>
            </div>
        )
    }
}
