import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import '../styles/TagPage.css';
import SnackbarContainer from '../container/Snackbar';
import Clipboard from 'react-clipboard.js';
import LabelSharpIcon from '@material-ui/icons/LabelSharp'

class TagPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shayariObject: Object.assign({}, props.shayariObject),
            snackbar: false
        }
    }

    fetchContent = () => {
        var titleArray = [];
        var contentArray = [];
        var poetArray = [];
        var tempRelatedTagsObject = {};
        var relatedTagsArray = [];
        if(!this.state.shayariObject[this.props.tag].titleArray.length){
            firebase.firestore().collection('tags').doc(this.props.tag).collection('shayaris').orderBy('timestamp', 'desc').get()
            .then(snap => {
                var i = 0;
                snap.forEach(doc => {
                    var title = doc.data().title;
                    var content = doc.data().content;
                    var poet = doc.data().poet;
                    relatedTagsArray = doc.data().tags;
                    titleArray.push(title);
                    contentArray.push(content);
                    poetArray.push(poet);
                    Object.assign(tempRelatedTagsObject, {
                        [i]: relatedTagsArray
                    })
                    i++;
                })
                this.setState(prev => ({
                    shayariObject: Object.assign({}, prev.shayariObject, {
                            [this.props.tag]: {
                                ...prev.shayariObject[this.props.tag],
                                titleArray: titleArray,
                                contentArray: contentArray,
                                poetArray: poetArray,
                                relatedTagsObject: tempRelatedTagsObject
                            }
                    })
                }), () => {
                    this.props.putIntoShayariObject(this.state.shayariObject)
                })
            })
        }
    }

    handleContentClick = (e, content) => {
        e.target.innerHTML = content;
    }

    handleSnackbarClose = () => {
        this.setState({
            snackbar: false
        })
    }

    handleCopy = () => {
        this.setState({
            snackbar: true
        })
    }


    render() {

        const { tag } = this.props;
        const { shayariObject } = this.state;
        var titleArray = shayariObject[tag].titleArray;
        var contentArray = shayariObject[tag].contentArray;
        var poetArray = shayariObject[tag].poetArray;
        var tagsObject = shayariObject[tag].relatedTagsObject;
        const labelIconStyle = {
            fontSize: '22px'
        }
        return (
            <div id='tagPage'>
                <h2 style={{textAlign: 'center', textTransform: 'capitalize'}}>{tag}</h2>
                <hr/>
                {
                    shayariObject[tag].titleArray.length ?
                    titleArray.map((title, i) => (
                        <React.Fragment key={i}>
                        <div className={`shayariCard div${i}`}>
                            <div className={`shayariCardHeader div${i}`}>
                                <Clipboard 
                                className='copyBtn'
                                data-clipboard-text={
                                    titleArray[i].charAt(0).toUpperCase() + titleArray[i].slice(1) + '\n' 
                                    + contentArray[i].charAt(0).toUpperCase() + contentArray[i].slice(1) 
                                    + '\nbestshayaris.com'}
                                onClick={this.handleCopy}>
                                copy
                                </Clipboard>
                            </div>
                            <div className={`div${i} shayariCardTitle`}>
                                {title.charAt(0).toUpperCase() + title.slice(1)}
                            </div>
                            <br/>
                            <div className={`div${i} shayariCardContent`} onClick={e => this.handleContentClick(e, contentArray[i])}>
                                {contentArray[i].length > 200 ? contentArray[i].substring(0,200) + '....' : contentArray[i]}
                            </div>
                            <div className='shayariCardLinks'>
                                <LabelSharpIcon style={labelIconStyle} />
                                {tagsObject[i].map((tag, i) => (
                                    <React.Fragment key={tag}>
                                        <Link to={`./${tag}`} className='relatedLinks'>{i === 0 ? null : ','}{tag}</Link>
                                    </React.Fragment>
                                ))}
                            </div>
                            <div className='shayariCardPoet'>
                                {poetArray[i]}
                            </div>
                            &ensp;
                        </div>
                        <hr/>
                        </React.Fragment>
                    ))
                    :
                    this.fetchContent()
                }
                <SnackbarContainer open={this.state.snackbar} message='copied.' handleClose={this.handleSnackbarClose} />
            </div>
        )
    }
}

export default TagPage