import React, { Component } from 'react'
import Clipboard from 'react-clipboard.js';
import FilterNoneIcon from '@material-ui/icons/FilterNone';

class ShayariCard extends Component {
    render() {
        const { title, content, poet, relatedTags, theme, i } = this.props;
        const translateBtnStyle = {
            backgroundColor: '#363537',
            color: 'white',
            transition: '0.5s',
            border: 'none'
        }
        const darkShayariCardStyle = {
            boxShadow: '0 0 4px 1px gainsboro'
        }
        return (
            <div className={`shayariCard div${i}`}
            style={theme === 'dark' ? darkShayariCardStyle : null}>
                <div className={`shayariCardHeader div${i}`}>
                    {/* <button style={theme === 'dark' ? translateBtnStyle : null} className='translateBtn' onClick={e => this.handleTranslateEnglish(e, i)}>English</button>
                    <button style={theme === 'dark' ? translateBtnStyle : null} className='translateBtn' onClick={e => this.handleTranslateUrdu(e, i)}>Urdu</button> */}
                    <Clipboard 
                    style={theme === 'dark' ? translateBtnStyle : null}
                    className='copyBtn'
                    data-clipboard-text={
                        title.charAt(0).toUpperCase() + title.slice(1) + '\n' 
                        + content.charAt(0).toUpperCase() + content.slice(1) 
                        + '\nbestshayaris.com'}
                    onClick={this.handleCopy}>
                    <FilterNoneIcon />
                    </Clipboard>
                </div>
                <div className={`shayariCardTitle div${i}`}>{title}</div><br/>
                {/* <div className={`shayariCardContent div${i}`}>{this.makeSpansFromString(content[i])}</div> */}
                <div className={`shayariCardContent div${i}`}>{content}</div>
                <div className={`div${i}`} style={{textAlign: 'center'}}>
                    <span>{poet}</span>
                </div>
            </div>
        )
    }
}

export default ShayariCard