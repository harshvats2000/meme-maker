import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTagPageShayaris } from '../../actions/fetchTagPageShayaris'

import '../../styles/TagPage.css';
import ShayariCard from '../../container/ShayariCard';


class TagPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageSize: 5,
        }
    }

    componentDidMount() {
        this.props.fetchTagPageShayaris(this.props.tag)
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.tag !== this.props.tag) {
            this.props.fetchTagPageShayaris(this.props.tag)
            window.scrollTo(0, 0)
            this.setState({ pageSize: 5 })
        }
    }

    render() {
        const { tag } = this.props;
        const { pageSize } = this.state;
        const shayaris = this.props.shayaris.map((shayari, i) => (
            i < pageSize ? <ShayariCard key={i} shayari={shayari} i={i} /> : null
        ))

        return (
            <div id='tagPage'>
                    <h2 style={{textAlign: 'center', textTransform: 'capitalize'}}>{tag}({shayaris.length})</h2>
                    <hr/>
                    {
                        shayaris
                    }
                    {
                        shayaris.length > pageSize
                        ?
                        <div 
                        className='seeMoreDiv' 
                        onClick={e => this.setState(prev => ({pageSize: prev.pageSize + 5}))}
                        >
                        <span className='seeMoreSpan'>See more</span>
                        </div>
                        : null
                    }
                </div>
        )
    }
}

const mapStateToProps = state => ({
    shayaris: state.tagPageShayaris.tagPageShayaris
})

export default connect(mapStateToProps, { fetchTagPageShayaris })(TagPage)