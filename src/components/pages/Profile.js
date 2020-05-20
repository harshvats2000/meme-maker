import React, { Component } from 'react'
import { PhotoURLConsumer, DisplayNameConsumer } from '../context';
import '../../styles/Profile.css'

export default class Profile extends Component {
    render() {
        return (
            <div>
                <div className='profile-header'>
                <PhotoURLConsumer>
                    {
                        url => {
                            return <img src={url} alt='profile_pic' className='profile-header-pic' />
                        }
                    }
                </PhotoURLConsumer>
                <DisplayNameConsumer>
                    {
                        name => {
                            return <div className='profile-header-name'>{name}</div>
                        }
                    }
                </DisplayNameConsumer>
                </div>
                <hr/>
            </div>
        )
    }
}
