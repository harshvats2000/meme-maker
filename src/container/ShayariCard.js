import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { showSnackbar, clearSnackbar } from '../actions/snackbar'
import { translateToEnglish, translateToUrdu } from '../functions/Translate'

import Clipboard from 'react-clipboard.js';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { Link } from 'react-router-dom'
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import '../styles/ShayariCard.css'

class ShayariCard extends Component {

    handleContentClick = (e, content) => {
        e.target.innerHTML = content;
    }

    handleCopy = () => {
        this.props.open ? this.props.clearSnackbar() : this.props.showSnackbar('copied.', 2000)
    }

     translate =  e => {
        var { showSnackbar } = this.props
        showSnackbar('Fetching...', 30000)              //show fetching message instantly
        var content = this.props.shayari.content;
        if(e.target.name === 'english') {
            translateToEnglish(content)
            .then(res => showSnackbar(res.text))
            
        } else {
            translateToUrdu(content)
            .then(res => showSnackbar(res.text))
        }
    }
    
    render() {
        const { shayari, theme, i } = this.props;
        const title = shayari.title;
        const content = shayari.content;
        const poet_english = shayari.english_name || this.props.match.params.poet;
        const poet_hindi = shayari.poet;
        const related_tags = shayari.tags;
        const translateBtnStyle = {
            backgroundColor: '#363537',
            color: 'white',
            transition: '0.5s',
            border: 'none'
        }
        const poetLinkStyle = {
            textDecoration: 'none',
            color: 'crimson'
        }

        return (
            <React.Fragment>
            <div className={`shayariCard div${i}`}>
                <div className={`shayariCardHeader div${i}`}>
                    <button name='english' style={theme === 'dark' ? translateBtnStyle : null} className='translateBtn' onClick={e => this.translate(e)}>English</button>
                    <button name='urdu' style={theme === 'dark' ? translateBtnStyle : null} className='translateBtn' onClick={e => this.translate(e)}>Urdu</button>

                    <Clipboard 
                    style={theme === 'dark' ? translateBtnStyle : null}
                    className='copyBtn'
                    data-clipboard-text={
                        title.charAt(0).toUpperCase() + title.slice(1) + '\n' 
                        + content.charAt(0).toUpperCase() + content.slice(1) 
                        + `\n—${poet_hindi}`
                        + '\n\nbestshayaris.com'}
                    onClick={this.handleCopy}>
                    <FilterNoneIcon />
                    </Clipboard>

                </div>

                <div className={`shayariCardTitle div${i}`}>{title}</div><br/>

                <div className={`div${i} shayariCardContent`} 
                onClick={e => this.handleContentClick(e, content)}>
                    {content.length > 200 ? content.substring(0,200) + '....' : content}
                </div>

                <div className={`div${i}`} style={{textAlign: 'center'}}>
                    <span>
                        <Link style={poetLinkStyle} to={`/poet/${poet_english}/`}>{poet_hindi}</Link>
                    </span>
                </div>
            </div>

            <Carousel
            slidesPerPage={4}
            slidesPerScroll={4}
            keepDirectionWhenDragging
            >
                {
                    related_tags.map(tag => (
                    <Link to={`/tags/${tag}/`}
                    style={theme === 'dark' ? translateBtnStyle : null} 
                    className='tagCards' key={tag}>{tag}</Link>
                ))
                }
            </Carousel>
            <hr/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    open: state.snackbar.open,
    theme: state.theme.theme
})

export default connect(mapStateToProps, { showSnackbar, clearSnackbar })(withRouter(ShayariCard))