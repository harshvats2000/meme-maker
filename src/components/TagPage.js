import React, { Component } from 'react';
import firebase from 'firebase';

class TagPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shayariObject: Object.assign({}, props.shayariObject)
        }
    }

    componentDidMount() {
        var titleArray = [];
        var contentArray = [];
        if(!this.state.shayariObject[this.props.tag].titleArray.length){
            firebase.firestore().collection('tags').doc(this.props.tag).collection('shayaris').get()
            .then(snap => {
                snap.forEach(doc => {
                    var title = doc.data().title;
                    var content = doc.data().content;
                    titleArray.push(title);
                    contentArray.push(content);
                })
                this.setState({
                    shayariObject: {
                        [this.props.tag]: {
                            titleArray: titleArray,
                            contentArray: contentArray
                        }
                    }
                }, () => {
                    this.props.putIntoShayariObject(this.state.shayariObject)
                })
            })
        }
    }

    render() {
        const { tag } = this.props;
        return (
            <div>
                <h2>{tag}</h2>
                {this.state.shayariObject[tag].titleArray}
                <hr/>
            </div>
        )
    }
}

export default TagPage