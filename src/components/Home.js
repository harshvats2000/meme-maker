import React, { Component } from 'react'
import '../styles/Home.css';
import { Link } from 'react-router-dom'
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

class Home extends Component {

    constructor(){
        super()
        this.state = {
            pageSize: 3
        }
    }

    render() {
        const { pageSize } = this.state;
        const { tags, title, content, poet, relatedTags } = this.props;
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
                                    <Link to={`/tags/${tag}`} className='tagCards' key={tag}>{tag}</Link>
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
                keepDirectionWhenDragging
                infinite>
                    {
                        tags.map(tag => (
                        <Link to={`/tags/${tag}`} className='tagCards' key={tag}>{tag}</Link>
                    ))
                    }
                </Carousel>
            </React.Fragment>
        )
    }
}

export default Home