import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchHomePageShayaris } from '../../actions/fetchHomePageShayaris'
import Skeleton from '../../container/Skeleton'

import '../../styles/Home.css';
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
        this.props.fetchHomePageShayaris()
    }

    render() {
        const { pageSize } = this.state;
        const { shayaris, fetching } = this.props;
        const shayariCard = shayaris.map((shayari, i) => (
            i < pageSize ? <ShayariCard key={i} shayari={shayari} i={i} /> : null
        ))
        return (
            <>
            <h1 style={{textAlign: 'center', fontFamily: 'Alconica'}}>Famous Writings</h1>
            <hr/>
            {
                fetching ? <Skeleton /> : shayariCard
            }
            {
                pageSize < this.props.shayaris.length 
                ? 
                <div
                className='seeMoreDiv'
                onClick={e => this.setState(prev => ({pageSize: prev.pageSize + 3}))}>
                    <span className='seeMoreSpan'>see more</span>
                </div>
                : null
            }
            </>
        )
    }
}

const mapStateToProps = state => ({
    shayaris: state.homePageShayaris.homePageShayaris,
    fetching: state.homePageShayaris.fetching,
})

export default connect(mapStateToProps, { fetchHomePageShayaris })(Home)