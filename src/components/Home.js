import React, { Component } from 'react'
import '../styles/Home.css';
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

class Home extends Component {
    constructor(){
        super()
        this.state = {
            title: [],
            content: [],
            poet: [],
            relatedTags: {},
            pageSize: 3
        }
    }

    componentDidMount() {
        var titleArray = [];
        var contentArray = [];
        var poetArray = [];
        var tempTagsObject = {};
        var i = 0;
        firebase.firestore().collection('tags').doc('sher').collection('shayaris').get()
        .then(snap => {
            snap.forEach(doc => {
                titleArray.push(doc.data().title);
                contentArray.push(doc.data().content);
                poetArray.push(doc.data().poet);
                Object.assign(tempTagsObject, {
                    [i]: doc.data().tags
                })
                i++;
            })
            // this.setState(prev => ({
            //     title: titleArray,
            //     content: contentArray,
            //     poet: poetArray,
            //     relatedTags: Object.assign({}, ...prev.relatedTags)
            // }))

            this.setState({
                title: titleArray,
                content: contentArray,
                poet: poetArray,
                relatedTags: Object.assign(this.state.relatedTags, tempTagsObject)
            })
        })
    }

    render() {
        const { tags } = this.props;
        const { title, content, poet, relatedTags, pageSize } = this.state;
        // var cx = '007954369214827889398:jybfnymzbis'; 
        // var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
        // gcse.src = (document.location.protocol === 'https' ? 'https:' : 'http:') + '//www.google.com/cse/cse.js?cx=' + cx;
        // var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
        return (
            <React.Fragment>
                {/* <div className="gcse-search"></div> */}
                <h2 style={{textAlign: 'center'}}>Shayaris of the day</h2>
                {
                    title.slice(0, pageSize).map((title, i) => {
                        return (
                            <React.Fragment key={i}>
                            <div className={`shayariCard div${i}`}>
                                <div className={`shayariCardTitle div${i}`}>{title}</div><br/>
                                <div className={`shayariCardContent div${i}`}>{content[i]}</div>
                                <div className={`div${i}`} style={{textAlign: 'center'}}>
                                    <span>{poet[i]}</span>
                                </div>
                            </div>
                            <hr/>
                            <Carousel
                            slidesPerPage={4}
                            slidesPerScroll={4}
                            keepDirectionWhenDragging
                            >
                                {
                                    relatedTags[i].map(tag => (
                                    <div className='tagCards'
                                    key={tag}>
                                    <Link to={`/tags/${tag}`} className='tagCardLinks'>{tag}</Link>
                                    </div>
                                ))
                                }
                            </Carousel>
                            <hr/>
                            </React.Fragment>
                        )
                    })
                }
                {
                    pageSize < title.length 
                    ? 
                    <div
                    className='seeMoreDiv'
                    onClick={e => this.setState(prev => ({pageSize: prev.pageSize + 2}))}>
                        <span className='seeMoreSpan'>see more</span>
                    </div>
                    : null
                }
                <h2>All Tags</h2>
                <Carousel
                slidesPerPage={4}
                slidesPerScroll={4}
                keepDirectionWhenDragging
                infinite>
                    {
                        tags.map(tag => (
                        <div className='tagCards'
                        key={tag}>
                        <Link to={`/tags/${tag}`} className='tagCardLinks'>{tag}</Link>
                        </div>
                    ))
                    }
                </Carousel>
                {/* {
                    tags.map(tag => (
                    <div className='tagCards' 
                    key={tag}>
                    <Link to={`/tags/${tag}`}>{tag}</Link><span> {shayariObject[tag].totalShayaris}</span>
                    </div>
                    ))
                } */}
            </React.Fragment>
        )
    }
}

export default Home