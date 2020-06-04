import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPoetPageShayaris } from '../../actions/fetchPoetPageShayaris'

import { withRouter } from 'react-router-dom'
import PoetWritings from '../PoetWritings'
import ShareIcon from '@material-ui/icons/Share';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import no_profile_pic from '../../images/no_profile_pic.jpeg'

class PoetPage extends Component {
    
    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.fetchPoetPageShayaris(this.props.match.params.poet)
        window.addEventListener('scroll', this.scrollToTop)
        window.addEventListener('scroll', this.scrollToBottom)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollToTop)
        window.removeEventListener('scroll', this.scrollToBottom)
    }

    componentDidUpdate(prevProps, prevState) {
        var prev_poet = prevProps.match.params.poet;
        var curr_poet = this.props.match.params.poet;
        
        if(prev_poet !== curr_poet) {
            this.props.fetchPoetPageShayaris(curr_poet)
            window.scrollTo(0, 0);
        }
    }

    scrollToTop = () => {
        var element = document.getElementById('scroll-up-btn')
        if(window.pageYOffset > 232) {
            element.style.display = 'block'
        } else {
            element.style.display = 'none'
        }
    }

    scrollToBottom = () => {
        var element = document.getElementById('scroll-down-btn')
        if(window.pageYOffset > 232) {
            element.style.display = 'block'
        } else {
            element.style.display = 'none'
        }
    }
    

    handleShare = () => {
        if(navigator.share) {
            navigator.share({
                title: `Take a look at all of the writings of ${this.props.match.params.poet}.`,
                url: window.location.href
            })
        } else {
            console.log('no')
        }
    }


    render() {
        const { theme, sher, ghazal, poems, pic_url } = this.props;
        var poet_hindi = ''
        if(sher[0]) poet_hindi = sher[0].poet
        if(ghazal[0]) poet_hindi = ghazal[0].poet
        if(poems[0]) poet_hindi = poems[0].poet
        const poetNameStyle = {
            fontSize: '23px',
            padding: '15px',
            textAlign: 'center',
        }
        const profile_pic_style = {
            height: '120px',
            width: '120px',
            borderRadius: '50%',
            marginTop: '15px',
            verticalAlign: 'middle',
            position: 'relative',
            left: '12px'
        }
        const share_btn_style = {
            position: 'relative',
            left: '30px'
        }
        const scroll_up_btn_style = {
            position: 'fixed',
            bottom: '10px',
            right: '10px',
            display: 'none',
            fontSize: '30px',
            zIndex: 3,
        }
        const scroll_down_btn_style = {
            position: 'fixed',
            bottom: '10px',
            left: '10px',
            display: 'none',
            fontSize: '30px',
            zIndex: 3
        }
        return (
            <div>
                <div>
                    <div style={{textAlign: 'center'}}>
                        <img src={pic_url ? pic_url : no_profile_pic} alt='writer_profile_pic' style={profile_pic_style} />
                        <ShareIcon style={share_btn_style} onClick={this.handleShare} />
                    </div>
                    <div style={poetNameStyle}>
                        {poet_hindi}
                    </div>
                </div>
                <div className='poet-container'>
                    {
                        <PoetWritings 
                        theme={theme} />
                    }
                </div>
                <hr/>
                
                <ArrowUpwardIcon 
                id='scroll-up-btn'
                style={scroll_up_btn_style} 
                onClick={() => window.scroll({ top: 0, left: 0, behavior: 'smooth'})} />

                <ArrowDownwardIcon
                id='scroll-down-btn'
                style={scroll_down_btn_style}
                onClick={() => window.scroll({ top: document.body.scrollHeight, left: 0, behavior: 'smooth'})} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    sher: state.poetPageShayaris.sher,
    ghazal: state.poetPageShayaris.ghazal,
    poems: state.poetPageShayaris.poems,
    pic_url: state.poetPageShayaris.pic_url,
    theme: state.theme.theme
})

export default connect(mapStateToProps, { fetchPoetPageShayaris })(withRouter(PoetPage))