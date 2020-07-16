import React, { Component } from 'react'

export default class Edit extends Component {
    constructor(props) {
      super(props)
      this.state = {
        layout: 'grid'
      }
    }
    
    componentDidMount() {
      document.getElementById('meme').contentEditable = true
      document.getElementById('functions').contentEditable = false
    }

    divClicked = e => {
      var element = document.getElementById(e.target.id)
      var color = element.style.color
      color === 'black' ? element.style.color = 'white' : element.style.color = 'black'
    }

    hideCursor = () => {
        document.getElementById('meme').style.cursor = 'none'
    }

    toggleLayout = () => {
        this.state.layout === 'default' ? this.setState({ layout: 'grid' }) : this.setState({ layout: 'default'})
    }

    reset = () => {
        const layout = this.state.layout
        if(layout === 'default') {
            for(var i=1; i<=20; i++) {
                document.getElementById(`div${i}`).innerHTML = ''
            }
        } else {
            for(i=1; i<=20; i++) {
                for(var j=1; j<=5; j++) {
                    document.getElementById(`div${i}${j}`).innerHTML = ''
                }
            }
        }
    }

    render() {
        const Vdivisions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
        const { layout } = this.state;
        const { memes, random, nextMeme } = this.props;
        const Hdivisions = layout === 'default' ? [1] : [1,2,3,4,5]
        const meme = memes[random] || ''

        const container = {
          backgroundImage: `url(${meme.url})`,
          height: '100vh',
          backgroundSize: '100vw 95vh',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column'
        }

        const btn = {
            border: '1px solid white',
            height: '5vh',
            color: 'white',
            background: '#121212',
        }

        return (
            <div style={container} id='meme'>
              {
                  Vdivisions.map(i => {
                      return (
                          <div key={i} className="text-div" id={`div${i}`}>
                            {
                                Hdivisions.map(j => {
                                    return <div style={{ flex: '2 2 0%'}} key={j} onClick={e => this.divClicked(e)} id={`div${i}${j}`}></div>
                                })
                            }
                          </div>
                      )
                  })
              }
              <div id='functions'>
                  <button style={btn} onClick={() => this.hideCursor()}>Hide cursor</button>
                  <button style={btn} onClick={() => this.toggleLayout()}>
                      {
                          layout === 'default' ? 'default layout' : 'grid layout'
                      }
                  </button>
                  <button style={btn} onClick={() => this.reset()}>reset</button>
                  <button style={btn} onClick={() => nextMeme(this.reset)}>Next meme</button>
              </div>
            </div>
        )
    }
}
