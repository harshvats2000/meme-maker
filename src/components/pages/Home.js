import React, { Component } from 'react'
import '../../styles/Home.css';
import SkeletonContainer from '../../container/Skeleton';
import { setCORS } from "google-translate-api-browser";
import SnackbarContainer from '../../container/Snackbar';
import ShayariCard from '../../container/ShayariCard';

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
        const { title, content, poet, poetEnglish, relatedTags, totalShayaris, theme } = this.props;

        if(title.length){
            return (
                <React.Fragment>
                    <h1 style={{textAlign: 'center', fontFamily: 'Alconica'}}>{Math.floor(totalShayaris/10) * 10}+ Writings</h1>
                    <hr/>
                    {
                        title.slice(0, pageSize).map((title, i) => {
                            return (
                                <ShayariCard
                                key={i}
                                i={i}
                                title={title}
                                content={content[i]}
                                poet={poet[i]}
                                poetEnglish={poetEnglish[i]}
                                relatedTags={relatedTags[i]}
                                theme={theme}
                                handleCopy={this.handleCopy}
                                handleTranslateEnglish={this.handleTranslateEnglish}
                                handleTranslateUrdu={this.handleTranslateUrdu}
                                />
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