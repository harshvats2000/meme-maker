import React, { Component } from 'react'
import '../../styles/Home.css';
import { Link } from 'react-router-dom'
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import SkeletonContainer from '../../container/Skeleton';

class Home extends Component {

    constructor(){
        super()
        this.state = {
            pageSize: 3
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        const { pageSize } = this.state;
        const { title, content, poet, relatedTags } = this.props;
        if(title.length){
            return (
                <React.Fragment>
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
                        onClick={e => this.setState(prev => ({pageSize: prev.pageSize + 3}))}>
                            <span className='seeMoreSpan'>see more</span>
                        </div>
                        : null
                    }
                </React.Fragment>
            )
        } else {
            return <SkeletonContainer />
        }
    }
}

export default Home