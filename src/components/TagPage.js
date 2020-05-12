import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import '../styles/TagPage.css';
import SnackbarContainer from '../container/Snackbar';
import Clipboard from 'react-clipboard.js';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import ClipLoader from "react-spinners/ClipLoader";
import SkeletonContainer from '../container/Skeleton';


class TagPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shayariObject: Object.assign({}, props.shayariObject),
            snackbar: false,
            pageSize: 5,
        }
    }

    componentWillReceiveProps() {
        this.setState(prev => ({
            pageSize: 5,
        }))
    }

    fetchContent = () => {
        var tempTitleObject = {};
        var tempContentObject = {};
        var tempPoetObject = {};
        var tempRelatedTagsObject = {};
            firebase.firestore().collection('tags').doc(this.props.tag).collection('shayaris').orderBy('timestamp', 'desc').get()
            .then(snap => {
                var i = 0;
                snap.forEach(doc => {
                    Object.assign(tempTitleObject, {
                        [i]: doc.data().title
                    })
                    Object.assign(tempContentObject, {
                        [i]: doc.data().content
                    })
                    Object.assign(tempPoetObject, {
                        [i]: doc.data().poet
                    })
                    Object.assign(tempRelatedTagsObject, {
                        [i]: doc.data().tags
                    })
                    i++;
                })
                this.setState(prev => ({
                    shayariObject: Object.assign({}, prev.shayariObject, {
                            [this.props.tag]: {
                                ...prev.shayariObject[this.props.tag],
                                titleObject: tempTitleObject,
                                contentObject: tempContentObject,
                                poetObject: tempPoetObject,
                                relatedTagsObject: tempRelatedTagsObject,
                                }
                            })
                }), () => {
                    this.props.putIntoShayariObject(this.state.shayariObject)
                })
            })
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
        const { shayariObject, pageSize } = this.state;

        if(shayariObject[tag]){
            var titleObject = shayariObject[tag].titleObject;
            var contentObject = shayariObject[tag].contentObject;
            var poetObject = shayariObject[tag].poetObject;
            var tagsObject = shayariObject[tag].relatedTagsObject;
            return (
                <div id='tagPage'>
                    <h2 style={{textAlign: 'center', textTransform: 'capitalize'}}>{tag}</h2>
                    <hr/>
                    {
                        shayariObject[tag].titleObject[0] ?
                        Object.keys(titleObject).slice(0,pageSize).map((key, i) => (
                            <React.Fragment key={i}>
                            <div className={`shayariCard div${i}`}>
    
                                <div className={`shayariCardHeader div${i}`}>
                                    <Clipboard 
                                    className='copyBtn'
                                    data-clipboard-text={
                                        titleObject[i].charAt(0).toUpperCase() + titleObject[i].slice(1) + '\n' 
                                        + contentObject[i].charAt(0).toUpperCase() + contentObject[i].slice(1) 
                                        + '\nbestshayaris.com'}
                                    onClick={this.handleCopy}>
                                    copy
                                    </Clipboard>
                                </div>
    
                                <div className={`div${i} shayariCardTitle`}>
                                    {titleObject[i].charAt(0).toUpperCase() + titleObject[i].slice(1)}
                                </div>
    
                                <br/>
    
                                <div 
                                className={`div${i} shayariCardContent`} 
                                onClick={e => this.handleContentClick(e, contentObject[i])}>
                                    {contentObject[i].length > 200 ? contentObject[i].substring(0,200) + '....' : contentObject[i]}
                                </div>
    
                                <div className='shayariCardPoet'>
                                    <span>{poetObject[i]}</span>
                                </div>
    
                                <Carousel
                                slidesPerPage={4}
                                slidesPerScroll={4}
                                keepDirectionWhenDragging
                                >
                                    {
                                        tagsObject[i].map(tag => (
                                        <Link to={`/tags/${tag}`} className='tagCards' key={tag}>{tag}</Link>
                                    ))
                                    }
                                </Carousel>
                            </div>
                            <hr/>
                            </React.Fragment>
                        ))
                        : <React.Fragment>
                            {this.fetchContent()}
                            <SkeletonContainer/>
                        </React.Fragment>
                    }
                    {
                        shayariObject[tag].totalShayaris > pageSize
                        ?
                        <div 
                        className='seeMoreDiv' 
                        onClick={() => this.setState(prev => ({pageSize: prev.pageSize + 5}))}
                        >
                        <span className='seeMoreSpan'>See more</span>
                        </div>
                        : null
                    }
                    <SnackbarContainer open={this.state.snackbar} message='copied.' handleClose={this.handleSnackbarClose} />
                </div>
            )
        } else {
            this.fetchContent()
            // return <h3 style={{textAlign: 'center'}}>fetching...</h3>
            return <SkeletonContainer/>
        }
    }
}

export default TagPage