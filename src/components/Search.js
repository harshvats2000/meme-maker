import React, { Component } from 'react';
import { connect } from 'react-redux'

import '../styles/Search.css';
import { Link, withRouter } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            searching: false,
            searchingWord: '',
            searchingList: '',
            showCross: false
        }
    }
    
      handleInputFocus = (e) => {
        this.setState({
          searching: true
        })
      }
    
      handleInputChange = (e) => {
        this.setState({
            searchingWord: e.target.value,
            searchingList: this.props.tags.filter(tag => {
                return tag.toLowerCase().indexOf(e.target.value.toLowerCase()) === 0
            })
        })
      }

      handleInputClick = e => {
        setTimeout(() => {
          // document.getElementById('header').style.top = 0;
        }, 1)
        this.setState({
          searching: true, 
          searchingWord: e.target.value, 
          searchingList: this.props.tags,
          showCross: true
        })
      }

      closeSearch = () => {
        this.setState({
          searching: false, 
          searchingWord: '', 
          searchingList: this.props.tags,
          showCross: false
        })
      }

    render() {
      const { tags, totalShayaris } = this.props;

      const focusStyle = {
        position: 'absolute',
        top: 0,
        boxSizing: 'border-box',
        padding: '5px',
        border: 'none',
        left: '0',
        width: '100%',
        margin: '0',
        height: '35px',
        fontSize: '16px',
        caretColor: 'crimson'
      }
      const style = {
        position: 'absolute',
        right: '12px',
        top: '6px',
        width: '40px',
        textAlign: 'center'
      }
      const darkInputStyle = {
        position: 'absolute',
        top: 0,
        boxSizing: 'border-box',
        padding: '5px',
        border: 'none',
        left: '0',
        width: '100%',
        margin: '0',
        height: '35px',
        color: 'white',
        backgroundColor: '#363537',
        fontSize: '16px',
        caretColor: 'crimson'
      }
      const closeSearch = {
        color: 'red',
        paddingTop: '6px',
        textAlign: 'center',
      }
      const darkList = {
        color: 'white'
      }

        return (
            <React.Fragment>
                  {
                    this.state.searching
                    ? window.addEventListener('popstate', () => this.setState({searching: false, searchingWord: ''}))
                    : null
                  }
                  
                  {
                    !this.state.searching ? <div style={style} onClick={(e) => this.handleInputClick(e)} ><SearchIcon/></div>:
                      <input
                      autoFocus
                      style={this.props.theme === 'dark' ? darkInputStyle : focusStyle}
                      placeholder='search tag...'
                      maxLength='30'
                      value={this.state.searchingWord || ''} 
                      onChange={e => this.handleInputChange(e)}/>
                  }

                  <div style={closeSearch} 
                  hidden={!this.state.showCross} 
                  onClick={() => this.closeSearch()}>close search<hr/></div>

                {
                    !this.state.searching ? null :
                    <div id='searchingListParent'>
                      <ul className='searchingList' onClick={() => this.closeSearch()}>
                        {
                          this.state.searchingList.map((tag, i) => (
                            <Link key={tag} to={`/tags/${tag}`} className='searchingListItemLink'>
                                <li 
                                className='searchingListItem'
                                style={this.props.theme === 'dark' ? darkList : null}>
                                {tag.toLowerCase()}
                                <span> ({totalShayaris[tags.indexOf(tag)]})</span>
                                </li>
                            </Link>
                          ))
                        }
                      </ul>
                    </div> 
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
  tags: state.tags.tags,
  totalShayaris: state.tags.totalShayaris
})

export default connect(mapStateToProps)(withRouter(Search))