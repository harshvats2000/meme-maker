import React from 'react';
import Upload from './Upload';
import Home from './Home';
import TagPage from './TagPage';
import Error404 from './Error404';
import { Switch, Route } from 'react-router-dom';

export default function Routes(props) {
    const { tags, shayariObject, putIntoShayariObject } = props;
    return (
        <React.Fragment>
            <Switch>
                <Route exact path='/' render={props => <Home tags={tags} />} />

                <Route path='/tags/:tag' render={props => 
                <TagPage 
                    tag={props.match.params.tag}
                    shayariObject={shayariObject}
                    putIntoShayariObject={putIntoShayariObject} />} 
                />

                <Route exact path='/upload' render={props => <Upload tags={tags} />} />
                
                <Route path='*' component={Error404} />
            </Switch>
        </React.Fragment>
    )
}
