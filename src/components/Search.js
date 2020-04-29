import React, { Component } from 'react';
import '../styles/Search.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search'

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
                return tag.indexOf(e.target.value) !== -1
            })
        })
      }

    render() {
        return (
            <React.Fragment>
                <div style={{float: 'left'}}>
                  <input className='headerSearchInput'
                  placeholder='search...'
                  maxLength='20'
                  value={this.state.searchingWord}
                  onFocus={e => this.handleInputFocus(e)} 
                  onChange={e => this.handleInputChange(e)}/>
                </div>
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

export default Search