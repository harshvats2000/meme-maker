import React, { Component } from 'react';
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
      const { shayariObject } = this.props;

      const focusStyle = {
        position: 'absolute',
        boxSizing: 'border-box',
        padding: '5px',
        border: 'none',
        left: '0',
        width: '100%',
        margin: '0',
        height: '35px',
      }
      const style = {
        position: 'absolute',
        right: '12px',
        top: '3px',
        width: '40px',
        textAlign: 'center'
      }
      const closeSearch = {
        color: 'red',
        paddingTop: '6px',
        textAlign: 'center',
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
                      style={focusStyle}
                      placeholder='search tag...'
                      maxLength='20'
                      value={this.state.searchingWord || ''} 
                      onChange={e => this.handleInputChange(e)}/>
                  }

                  <div style={closeSearch} hidden={!this.state.showCross} onClick={() => this.closeSearch()}>close search<hr/></div>

                {
                    !this.state.searching ? null :
                    <div id='searchingListParent'>
                      <ul className='searchingList' onClick={() => this.closeSearch()}>
                        {
                          this.state.searchingList.map((tag, i) => (
                            <Link key={tag} to={`/tags/${tag}`} className='searchingListItemLink'>
                                <li className='searchingListItem'>{tag}<span> ({shayariObject[tag].totalShayaris})</span></li>
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

export default withRouter(Search)