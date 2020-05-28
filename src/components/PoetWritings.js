import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
          <Box p={3}>
            <Typography component={'div'}>{children}</Typography>
          </Box>
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
        const { fetching, sher, ghazal, poems, sherObject, ghazalObject, poemsObject, theme } = this.props;
        const { value } = this.state;
        const lightBarStyle = {
            position: 'sticky',
            top: 0,
            transition: 'all .5s linear'
          }
          const darkBarStyle = {
            position: 'sticky',
            top: 0,
            background: '#121212',
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
                      <Tab label={`Sher ${sher}`} style={theme === 'light' ? null : darkTabStyle} />
                      <Tab label={`Ghazal ${ghazal}`} style={theme === 'light' ? null : darkTabStyle} />
                      <Tab label={`Poems ${poems}`} style={theme === 'light' ? null : darkTabStyle} />
                    </Tabs>
                </AppBar>

                <SwipeableViews
                  index={value}
                  onChangeIndex={this.handleChangeIndex}
                >
                  <TabPanel value={value} index={0} >
                    {
                      fetching ? null : (sher === 0 ? <h4>0 Sher</h4> : null)
                    }
                    {
                        Object.keys(sherObject).map((key, i) => {
                            return <ShayariCard key={i} 
                            title={sherObject[key].title} content={sherObject[key].content} 
                            poet={sherObject[key].poet} relatedTags={sherObject[key].tags} i={i} theme={theme} />
                        })
                    }
                  </TabPanel>
                  <TabPanel value={value} index={1} >
                    {
                      fetching ? null : (ghazal === 0 ? <h4>0 Ghazal</h4> : null)
                    }
                    {
                        Object.keys(ghazalObject).map((key, i) => {
                            return <ShayariCard key={i} 
                            title={ghazalObject[key].title} content={ghazalObject[key].content} 
                            poet={ghazalObject[key].poet} relatedTags={ghazalObject[key].tags} theme={theme} />
                        })
                    }
                  </TabPanel>
                  <TabPanel value={value} index={2} >
                    {
                      fetching ? null : (poems === 0 ? <h4>0 Poems</h4> : null)
                    }
                    {
                        Object.keys(poemsObject).map((key, i) => {
                            return <ShayariCard key={i} 
                            title={poemsObject[key].title} content={poemsObject[key].content} 
                            poet={poemsObject[key].poet} relatedTags={poemsObject[key].tags} theme={theme} />
                        })
                    }
                  </TabPanel>
                </SwipeableViews>
            </div>
        )
    }
}

export default PoetWritings;