import React, { Component } from 'react'
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import ShayariCard from '../container/ShayariCard'

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Typography component={'div'}>{children}</Typography>
        )}
      </div>
    );
}


class PoetWritings extends Component {
    
    constructor() {
        super()
        this.state = {
            value: 0,
        }
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
    };
    
    handleChangeIndex = (index) => {
        this.setState({ value: index})
    };

    render() {
        const { fetching, sher, ghazal, poems, theme } = this.props;
        const { value } = this.state; 
        const lightBarStyle = {
            position: 'sticky',
            top: 0,
            transition: 'all .5s linear'
          }
          const darkBarStyle = {
            position: 'sticky',
            top: 0,
            background: '#363537',
            transition: 'all .5s linear'
        }
        const darkTabStyle = {
          color: 'white'
        }

        return (
            <div>
                <AppBar position="static" color='default' style={theme === 'light' ? lightBarStyle : darkBarStyle}>
                    <Tabs
                      value={value}
                      onChange={this.handleChange}
                      indicatorColor="secondary"
                      textColor="secondary"
                      variant="fullWidth"
                      aria-label="full width tabs example"
                    >
                      <Tab label={`Sher ${sher.length}`} style={theme === 'light' ? null : darkTabStyle} />
                      <Tab label={`Ghazal ${ghazal.length}`} style={theme === 'light' ? null : darkTabStyle} />
                      <Tab label={`Poems ${poems.length}`} style={theme === 'light' ? null : darkTabStyle} />
                    </Tabs>
                </AppBar>

                <SwipeableViews
                  index={value}
                  onChangeIndex={this.handleChangeIndex}
                >
                  <TabPanel value={value} index={0} >
                    {
                      fetching ? <h3>Fetching...</h3> : (sher.length === 0 ? <h4>0 Sher</h4> : null)
                    }
                    {
                        sher.map((shayari, i) => {
                            return <ShayariCard 
                            key={i} 
                            i={i}
                            theme={theme}
                            shayari={shayari} />
                        })
                    }
                  </TabPanel>
                  <TabPanel value={value} index={1} >
                    {
                      fetching ? <h3>Fetching...</h3> : (ghazal.length === 0 ? <h4>0 Ghazal</h4> : null)
                    }
                    {
                        ghazal.map((shayari, i) => {
                            return <ShayariCard 
                            key={i} 
                            i={i}
                            theme={theme}
                            shayari={shayari} />
                        })
                    }
                  </TabPanel>
                  <TabPanel value={value} index={2} >
                    {
                      fetching ? <h3>Fetching...</h3> : (poems.length === 0 ? <h4>0 Poems</h4> : null)
                    }
                    {
                        poems.map((shayari, i) => {
                            return <ShayariCard 
                            key={i} 
                            i={i}
                            theme={theme}
                            shayari={shayari} />
                        })
                    }
                  </TabPanel>
                </SwipeableViews>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  sher: state.poetPageShayaris.sher,
  ghazal: state.poetPageShayaris.ghazal,
  poems: state.poetPageShayaris.poems,
  fetching: state.poetPageShayaris.fetching
})

export default connect(mapStateToProps)(PoetWritings);