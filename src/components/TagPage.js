import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import '../styles/TagPage.css';
import SnackbarContainer from '../container/Snackbar';
import Clipboard from 'react-clipboard.js'

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
        var tempRelatedTagsObject = {};
        var relatedTagsArray = [];
        if(!this.state.shayariObject[this.props.tag].titleArray.length){
            firebase.firestore().collection('tags').doc(this.props.tag).collection('shayaris').orderBy('timestamp', 'desc').get()
            .then(snap => {
                var i = 0;
                snap.forEach(doc => {
                    var title = doc.data().title;
                    var content = doc.data().content;
                    relatedTagsArray = doc.data().tags;
                    titleArray.push(title);
                    contentArray.push(content);
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
        var tagsObject = shayariObject[tag].relatedTagsObject;
        return (
            <div>
                <h2>{tag}</h2>
                <hr/>
                {
                    shayariObject[tag].titleArray.length ?
                    titleArray.map((title, i) => (
                        <React.Fragment key={i}>
                        <div className={`shayariCard div${i}`}>
                            <div className={`shayariCardHeader div${i}`}>
                                <Clipboard 
                                data-clipboard-text={contentArray[i]}
                                onClick={this.handleCopy}>
                                copy
                                </Clipboard>
                            </div>
                            <div className={`div${i}`}>
                                {title}
                            </div>
                            <div className={`div${i}`} onClick={e => this.handleContentClick(e, contentArray[i])}>
                                {contentArray[i].length > 100 ? contentArray[i].substring(0,100)+'....' : contentArray[i]}
                            </div>
                            <div>{tagsObject[i].map((tag, i) => (
                                <React.Fragment key={tag}>
                                    <Link to={`./${tag}`}>{tag}</Link>
                                    &ensp;
                                </React.Fragment>
                            ))}
                            </div>
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