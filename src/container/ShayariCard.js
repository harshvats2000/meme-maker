import React, { Component } from 'react'
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
    
    render() {
        const { title, content, poet, poetEnglish, relatedTags, theme, i, handleCopy, handleTranslateEnglish, handleTranslateUrdu } = this.props;
        // console.log(poet);
        const translateBtnStyle = {
            backgroundColor: '#363537',
            color: 'white',
            transition: '0.5s',
            border: 'none'
        }
        const darkShayariCardStyle = {
            // boxShadow: '0 0 4px 1px gainsboro'
        }
        const poetLinkStyle = {
            textDecoration: 'none',
            color: 'crimson'
        }

        return (
            <React.Fragment>
            <div className={`shayariCard div${i}`}
            style={theme === 'dark' ? darkShayariCardStyle : null}>

                <div className={`shayariCardHeader div${i}`}>
                    <button style={theme === 'dark' ? translateBtnStyle : null} className='translateBtn' onClick={e => handleTranslateEnglish(e, i)}>English</button>
                    <button style={theme === 'dark' ? translateBtnStyle : null} className='translateBtn' onClick={e => handleTranslateUrdu(e, i)}>Urdu</button>
                    <Clipboard 
                    style={theme === 'dark' ? translateBtnStyle : null}
                    className='copyBtn'
                    data-clipboard-text={
                        title.charAt(0).toUpperCase() + title.slice(1) + '\n' 
                        + content.charAt(0).toUpperCase() + content.slice(1) 
                        + '\nbestshayaris.com'}
                    onClick={handleCopy}>
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
                        <Link style={poetLinkStyle} to={`/poet/${poetEnglish}/`} >{poet}</Link>
                    </span>
                </div>
            </div>
            <Carousel
            slidesPerPage={4}
            slidesPerScroll={4}
            keepDirectionWhenDragging
            >
                {
                    relatedTags.map(tag => (
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

export default ShayariCard