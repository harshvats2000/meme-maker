import React, { Component } from 'react'
import '../../styles/Home.css';
import { Link } from 'react-router-dom'
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import SkeletonContainer from '../../container/Skeleton';
import Clipboard from 'react-clipboard.js';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { setCORS } from "google-translate-api-browser";
import SnackbarContainer from '../../container/Snackbar';

class Home extends Component {

    constructor(){
        super()
        this.state = {
            pageSize: 3,
            snackbar: false,
            message: '',
            autoHideDuration: 2000
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleCopy = () => {
        this.setState({
            snackbar: true,
            message: 'copied.',
            autoHideDuration: 2000
        })
    }

    handleSnackbarClose = () => {
        this.setState({
            snackbar: false,
            message: ''
        })
    }

    handleTranslateEnglish = (e, i) => {
        this.setState({
            snackbar: true,
            message: 'translating...',
            autoHideDuration: 30000
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
            autoHideDuration: 50000
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

    render() {
        const { pageSize } = this.state;
        const { title, content, poet, relatedTags, totalShayaris } = this.props;
        if(title.length){
            return (
                <React.Fragment>
                    <h1 style={{textAlign: 'center', fontFamily: 'Alconica'}}>{Math.floor(totalShayaris/10) * 10}+ Shayaris</h1>
                    {
                        title.slice(0, pageSize).map((title, i) => {
                            return (
                                <React.Fragment key={i}>
                                <div className={`shayariCard div${i}`}>
                                <div className={`shayariCardHeader div${i}`}>
                                    <button className='translateBtn' onClick={e => this.handleTranslateEnglish(e, i)}>English</button>
                                    <button className='translateBtn' onClick={e => this.handleTranslateUrdu(e, i)}>Urdu</button>
                                    <Clipboard 
                                    className='copyBtn'
                                    data-clipboard-text={
                                        title.charAt(0).toUpperCase() + title.slice(1) + '\n' 
                                        + content[i].charAt(0).toUpperCase() + content[i].slice(1) 
                                        + '\nbestshayaris.com'}
                                    onClick={this.handleCopy}>
                                    <FilterNoneIcon />
                                    </Clipboard>
                                </div>
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
                    <SnackbarContainer
                    autoHideDuration={this.state.autoHideDuration} 
                    open={this.state.snackbar} 
                    message={this.state.message} 
                    handleClose={this.handleSnackbarClose} />
                </React.Fragment>
            )
        } else {
            return <SkeletonContainer />
        }
    }
}

export default Home