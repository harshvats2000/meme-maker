import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import mainTags from '../constants/Maintags'
class HomeTagCards extends Component {
    render() {
        const tagCardContainerStyle = {
            display: 'flex',
            flexWrap: 'wrap'
        }
        const tagCardStyle = {
            0: {
                textDecoration: 'none',
                fontSize: '20px',
                textTransform: 'capitalize',
                border: '1px solid white',
                color: 'white',
                boxSizing: 'border-box',
                textAlign: 'center',
                lineHeight: '80px',
                flex: '0 50%',
                background: 'linear-gradient(to right, #43cea2, #185a9d)'
            },
            1: {
                textDecoration: 'none',
                fontSize: '20px',
                textTransform: 'capitalize',
                border: '1px solid white',
                color: 'white',
                boxSizing: 'border-box',
                textAlign: 'center',
                lineHeight: '80px',
                flex: '0 50%',
                background: 'linear-gradient(to right, #870000, #190a05)'
            },
            2: {
                textDecoration: 'none',
                fontSize: '20px',
                textTransform: 'capitalize',
                border: '1px solid white',
                color: 'white',
                boxSizing: 'border-box',
                textAlign: 'center',
                lineHeight: '80px',
                flex: '0 50%',
                background: 'linear-gradient(to right, #fe8c00, #f83600)'
            },
            3: {
                textDecoration: 'none',
                fontSize: '20px',
                textTransform: 'capitalize',
                border: '1px solid white',
                color: 'white',
                boxSizing: 'border-box',
                textAlign: 'center',
                lineHeight: '80px',
                flex: '0 50%',
                background: 'linear-gradient(to right, #ff0084, #33001b)'
            },
            4: {
                textDecoration: 'none',
                fontSize: '20px',
                textTransform: 'capitalize',
                border: '1px solid white',
                color: 'white',
                boxSizing: 'border-box',
                textAlign: 'center',
                lineHeight: '80px',
                flex: '0 50%',
                background: 'linear-gradient(to right, #00c6ff, #0072ff)'
            },
            5: {
                textDecoration: 'none',
                fontSize: '20px',
                textTransform: 'capitalize',
                border: '1px solid white',
                color: 'white',
                boxSizing: 'border-box',
                textAlign: 'center',
                lineHeight: '80px',
                flex: '0 50%',
                background: 'linear-gradient(to right, #fbd3e9, #bb377d)'
            },
            6: {
                textDecoration: 'none',
                fontSize: '20px',
                textTransform: 'capitalize',
                border: '1px solid white',
                color: 'white',
                boxSizing: 'border-box',
                textAlign: 'center',
                lineHeight: '80px',
                flex: '0 50%',
                background: 'linear-gradient(to right, #870000, #190a05)'
            }
        }
        return (
            <div style={tagCardContainerStyle} 
            >
                {
                    mainTags.map((tag, i) => {
                        return (
                            <Link to={`/tags/${tag}/`} key={i} style={tagCardStyle[i]}>
                                {tag}
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}

export default HomeTagCards