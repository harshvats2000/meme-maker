import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class HomeTagCards extends Component {
    render() {
        const { mainTags } = this.props;
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
                width: '50%',
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
                width: '50%',
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
                width: '50%',
                textAlign: 'center',
                lineHeight: '80px',
                flex: '0 50%',
                background: 'linear-gradient(to right, #fe8c00, #f83600)'
            }
        }
        return (
            <div style={tagCardContainerStyle}>
                {
                    mainTags.map((tag, i) => {
                        return (
                            <Link to={`/tags/${tag}`} key={i} style={tagCardStyle[i]}>
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