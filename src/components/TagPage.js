import React, { Component } from 'react'

class TagPage extends Component {
    render() {
        const { tag, shayariObject } = this.props;
        var contentArray = shayariObject[tag].content[0];
        var titleArray = shayariObject[tag].title[0];
        return (
            <div>
                <h2>{tag}</h2>
                <hr/>
                {
                    titleArray.slice(0).reverse().map((title, i) => (
                    <div>
                        <div>{title}</div>
                        <div>{contentArray[contentArray.length-i-1]}</div><hr/>
                    </div>
                    ))
                }
                    {console.log(shayariObject[tag])}
            </div>
        )
    }
}

export default TagPage