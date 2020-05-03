import React, { Component } from 'react';
import '../styles/Search.css';
import { Link, withRouter } from 'react-router-dom';

class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            searching: false,
            searchingWord: '',
            searchingList: props.tags
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
                return tag.indexOf(e.target.value.toLowerCase()) !== -1
            })
        })
      }

    render() {
      const focusStyle = {
        position: 'absolute',
        border: 'none',
        left: '0',
        width: '100%',
        margin: '0',
        height: '35px',

      }
      const style = {
        position: 'absolute',
        width: '20%',
        right: '0',
        margin: '6px',
        height: '25px',
        fontSize: '16px',
        border: '1px solid black',
        paddingLeft: '5px',
        transition: '.4s',
        boxShadow: '1px 1px 3px'
      }
        return (
            <React.Fragment>
                  {
                    this.state.searching
                    ? window.addEventListener('popstate', () => this.setState({searching: false, searchingWord: ''}))
                    : null
                  }
                  <input
                  style={this.state.searching ? focusStyle : style}
                  placeholder='search...'
                  maxLength='20'
                  onClick={(e) => this.setState({searching: true, searchingWord: e.target.value})}
                  value={this.state.searchingWord} 
                  onChange={e => this.handleInputChange(e)}/>
                {
                    !this.state.searching ? null :
                    <div id='searchingListParent'>
                      <ul className='searchingList' onClick={() => this.setState({searching: false, searchingWord: '', searchingList: this.props.tags})}>
                        {
                          this.state.searchingList.map((tag, i) => (
                            <Link key={tag} to={`/tags/${tag}`} className='searchingListItemLink'>
                                <li className='searchingListItem'>{tag}</li>
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