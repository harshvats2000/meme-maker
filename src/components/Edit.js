import React, { Component } from 'react'

export default class Edit extends Component {
    constructor() {
      super()
      this.state = {
        memes: []
      }
    }
    
    componentDidMount() {
      document.body.contentEditable = true
      fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => {
        this.setState({
          memes: data.data.memes
        })
      })
    }

    divClicked = e => {
      console.log(e.target.offsetTop);
      console.log(e.clientY);
      var element = document.getElementById(e.target.id)
      element.style.paddingLeft = e.clientX + 'px'
      element.style.paddingTop = e.clientY - e.target.offsetTop - 10 + 'px'
      var color = element.style.color
      color === 'black' ? element.style.color = 'white' : element.style.color = 'black'
    }

    render() {
        const { memes } = this.state;
        const random = Math.floor(Math.random() * (memes.length - 1)) + 1;
        const meme = memes[random] || ''

        const container = {
          backgroundImage: `url(${meme.url})`,
          height: '100vh',
          backgroundSize: '100vw 100vh',
          display: 'flex',
          flexDirection: 'column'
        }

        return (
            <div style={container}>
              <div onClick={e => this.divClicked(e)} id='div1' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div2' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div3' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div4' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div5' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div6' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div7' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div8' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div9' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div10' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div11' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div12' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div13' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div14' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div15' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div16' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div17' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div18' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div19' className='text-div'></div>
              <div onClick={e => this.divClicked(e)} id='div20' className='text-div'></div>
            </div>
        )
    }
}
