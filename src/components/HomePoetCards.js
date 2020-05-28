import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import mainPoets from '../constants/MainPoets'

class HomePoetCards extends Component {
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
                background: 'linear-gradient(to right, #c94b4b, #4b134f)'
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
                background: 'linear-gradient(to right, #000000, #0f9b0f)'
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
                background: 'linear-gradient(to right, #1e130c, #9a8478)'
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
                background: 'linear-gradient(to right, #fdfc47, #24fe41)'
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
                background: 'linear-gradient(to right, #f857a6, #ff5858)'
            }
        }
        return (
            <div style={tagCardContainerStyle}>
                {
                    mainPoets.map((tag, i) => {
                        return (
                            <Link to={`/poet/${tag}/`} key={i} style={tagCardStyle[i]}>
                                {tag}
                            </Link>
                        )
                    })
                }
            </div>
        )
    }
}

export default HomePoetCards