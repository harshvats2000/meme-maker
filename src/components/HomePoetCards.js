import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import mirza_ghalib from '../images/mirza_ghalib.jpeg'
import kumar_vishwas from '../images/kumar_vishwas.jpeg'
import jaun_elia from '../images/jaun_elia.jpeg'
import mmeer_taqi_meer from '../images/meer_taqi_meer.jpeg'
import faiz_ahmed_faiz from '../images/faiz_ahmed_faiz.jpeg'
import munawwar_rana from '../images/munawwar_rana.jpeg'

class HomePoetCards extends Component {
    render() {
        const poetsArray = [mirza_ghalib, faiz_ahmed_faiz, kumar_vishwas, munawwar_rana, mmeer_taqi_meer, jaun_elia]
        const mainPoets = ['mirza ghalib', 'faiz ahmed faiz', 'kumar vishwas', 'munawwar rana', 'mmeer taqi meer', 'jaun elia']
        const tagCardContainerStyle = {
            display: 'flex',
            overflow: 'scroll'
        }
        const poetBoxStyle = {
            margin: '10px',
            textAlign: 'center'
        }
        const imgStyle = {
            width: '100px',
            height: '100px',
            borderRadius: '50%'
        }
        const poetNameStyle = {
            fontSize: '18px',
            textDecoration: 'none',
            color: 'crimson'
        }
        return (
            <div style={tagCardContainerStyle}>
                {
                    mainPoets.map((poet, i) => {
                        return (
                            <div style={poetBoxStyle} key={i}>
                                <img src={poetsArray[i]} style={imgStyle} alt='poet_img' />
                                <div>
                                    <Link to={`/poet/${poet}/`} style={poetNameStyle}>
                                        {poet}
                                    </Link>         
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default HomePoetCards