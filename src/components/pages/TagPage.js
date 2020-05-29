import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore'
import '../../styles/TagPage.css';
import SnackbarContainer from '../../container/Snackbar';
import SkeletonContainer from '../../container/Skeleton';
import { setCORS } from "google-translate-api-browser";
import ShayariCard from '../../container/ShayariCard';


class TagPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shayariObject: Object.assign({}, props.shayariObject),
            snackbar: false,
            pageSize: 5,
            message: '',
            autoHideDuration: 2000
        }
    }

    UNSAFE_componentWillReceiveProps() {
        this.setState(prev => ({
            pageSize: 5,
        }))
        window.scrollTo(0, 0)
    }

    fetchContent = () => {
        var tempTitleObject = {};
        var tempContentObject = {};
        var tempPoetObject = {};
        var tempPoetEnglishObject = {};
        var tempRelatedTagsObject = {};
            firebase.firestore().collection('tags').doc(this.props.tag).collection('shayaris').limit(50).orderBy('timestamp', 'desc').get()
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
                    Object.assign(tempPoetEnglishObject, {
                        [i]: doc.data().english_name
                    })
                    Object.assign(tempRelatedTagsObject, {
                        [i]: doc.data().tags.map(tag => tag.toLowerCase())
                    })
                    i++;
                })
                firebase.firestore().collection('tags').doc(this.props.tag).get()           //get total shayaris too to show see more
                .then(doc =>  {
                    this.setState(prev => ({
                        shayariObject: Object.assign({}, prev.shayariObject, {
                                [this.props.tag]: {
                                    ...prev.shayariObject[this.props.tag],
                                    titleObject: tempTitleObject,
                                    contentObject: tempContentObject,
                                    poetObject: tempPoetObject,
                                    poetEnglishObject: tempPoetEnglishObject,
                                    relatedTagsObject: tempRelatedTagsObject,
                                    totalShayaris: doc.data().totalShayaris
                                    }
                                })
                    }), () => {
                        this.props.putIntoShayariObject(this.state.shayariObject)
                    })
                })
            })
    }

    handleSnackbarClose = () => {
        this.setState({
            snackbar: false,
            message: ''
        })
    }

    handleCopy = () => {
        this.setState({
            snackbar: true,
            message: 'copied.',
            autoHideDuration: 2000
        })
    }

    handleTranslateEnglish = (e, i) => {
        this.setState({
            snackbar: true,
            message: 'translating...',
            autoHideDuration: 50000
        })
        var content = document.getElementsByClassName(`div${i}`)[3].innerHTML;
        const translate = setCORS("https://cors-anywhere.herokuapp.com/");
        translate(content, { to: "en" })
        .then(res => {
            this.setState({
                message: res.text,
                snackbar: true,
            })
        })
        .catch(err => {
            console.error(err);
        });
    }

    handleTranslateUrdu = (e, i) => {
        this.setState({
            snackbar: true,
            message: 'translating...',
            autoHideDuration: 30000
        })
        var content = document.getElementsByClassName(`div${i}`)[3].innerHTML;
        const translate = setCORS("https://cors-anywhere.herokuapp.com/");
        translate(content, { to: "ur" })
        .then(res => {
            this.setState({
                message: res.text,
                snackbar: true,
            })
        })
        .catch(err => {
            console.error(err);
        });
    }

    handleSeeMore = () => {
        this.setState(prev => ({
            pageSize: prev.pageSize + 5
        }))
    }

    render() {
        const { tag, theme } = this.props;
        const { shayariObject, pageSize, message, autoHideDuration } = this.state;

        if(shayariObject[tag]){
            var titleObject = shayariObject[tag].titleObject;
            var contentObject = shayariObject[tag].contentObject;
            var poetObject = shayariObject[tag].poetObject;
            var poetEnglishObject = shayariObject[tag].poetEnglishObject;
            var tagsObject = shayariObject[tag].relatedTagsObject;
            return (
                <div id='tagPage'>
                    <h2 style={{textAlign: 'center', textTransform: 'capitalize'}}>{tag}({shayariObject[tag].totalShayaris})</h2>
                    <hr/>
                    {
                        shayariObject[tag].titleObject[0] ?
                        Object.keys(titleObject).slice(0,pageSize).map((key, i) => (
                            <ShayariCard
                            i={i}
                            key={i}
                            title={titleObject[i]}
                            content={contentObject[i]}
                            poet={poetObject[i]}
                            poetEnglish={poetEnglishObject[i]}
                            relatedTags={tagsObject[i]}
                            theme={theme}
                            handleTranslateEnglish={this.handleTranslateEnglish}
                            handleTranslateUrdu={this.handleTranslateUrdu}
                            handleCopy={this.handleCopy}
                            />
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
                        onClick={() => this.handleSeeMore()}
                        >
                        <span className='seeMoreSpan'>See more</span>
                        </div>
                        : null
                    }
                    <SnackbarContainer
                    autoHideDuration={autoHideDuration} 
                    open={this.state.snackbar} 
                    message={message} 
                    handleClose={this.handleSnackbarClose} />
                </div>
            )
        } else {
            this.fetchContent()
            return <SkeletonContainer/>
        }
    }
}

export default TagPage