import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import ShayariCard from '../container/ShayariCard'
import SnackbarContainer from '../container/Snackbar';
import { setCORS } from "google-translate-api-browser";

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
            snackbar: false,
            message: '',
            autoHideDuration: 2000
        }
    }

    handleCopy = () => {
      this.setState({
        snackbar: true,
        message: 'copied.',
        autoHideDuration: 2000
      })
    }

    handleTranslateEnglish = (e, i) => {
      this.setState({
          snackbar: true,
          message: 'translating...',
          autoHideDuration: 30000
      })
      var content = document.getElementsByClassName(`div${i}`)[3].innerHTML;
      const translate = setCORS("https://cors-anywhere.herokuapp.com/");
      translate(content, { to: "en" })
      .then(res => {
          this.setState({
              message: res.text,
              snackbar: true,
          })
      })
      .catch(err => {
          console.error(err);
      });
    }

    handleTranslateUrdu = (e, i) => {
      this.setState({
          snackbar: true,
          message: 'translating...',
          autoHideDuration: 50000
      })
      var content = document.getElementsByClassName(`div${i}`)[3].innerHTML;
      const translate = setCORS("https://cors-anywhere.herokuapp.com/");
      translate(content, { to: "ur" })
      .then(res => {
          this.setState({
              message: res.text,
              snackbar: true,
          })
      })
      .catch(err => {
          console.error(err);
      });
    }

    handeSnackbarClose = () => {
      this.setState({
        snackbar: false,
        message: '',
      })
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue })
    };
    
    handleChangeIndex = (index) => {
        this.setState({ value: index})
    };

    render() {
        const { fetching, poetEnglish, sher, ghazal, poems, sherObject, ghazalObject, poemsObject, theme } = this.props;
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
                            title={sherObject[key].title} 
                            content={sherObject[key].content} 
                            poet={sherObject[key].poet} 
                            relatedTags={sherObject[key].tags} i={i} 
                            theme={theme} 
                            handleCopy={this.handleCopy}
                            handleTranslateEnglish={this.handleTranslateEnglish}
                            handleTranslateUrdu={this.handleTranslateUrdu} />
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
                            title={ghazalObject[key].title} 
                            content={ghazalObject[key].content} 
                            poet={ghazalObject[key].poet} 
                            relatedTags={ghazalObject[key].tags} 
                            theme={theme}
                            handleTranslateEnglish={this.handleTranslateEnglish}
                            handleTranslateUrdu={this.handleTranslateUrdu} />
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
                            title={poemsObject[key].title} 
                            content={poemsObject[key].content} 
                            poet={poemsObject[key].poet} 
                            relatedTags={poemsObject[key].tags} 
                            theme={theme} 
                            handleCopy={this.handleCopy}
                            handleTranslateEnglish={this.handleTranslateEnglish}
                            handleTranslateUrdu={this.handleTranslateUrdu}
                            poetEnglish={poetEnglish} />
                        })
                    }
                  </TabPanel>
                </SwipeableViews>
                
                <SnackbarContainer
                message={this.state.message}
                autoHideDuration={this.state.autoHideDuration}
                open={this.state.snackbar}
                handleClose={this.handeSnackbarClose}
                />
            </div>
        )
    }
}

export default PoetWritings;