import React, {Component} from 'react'
import './App.css';
import Form from './Components/MainForm/Form'
import Result from './Components/Result/Result'
import Scrape from './Components/Scrape/Scrape'
import {Switch, Route, withRouter} from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      results: [],
      rating: null,
      tab: 'FORM',
      receivedResult: false
    }
  }

  setResults = (rating, results) => {
    this.setState({rating: rating, results: results, receivedResult: true})
  }

  render(){
    return (
      <div>
        <div className='Heading'>
          <h1>Recipe App</h1>
        </div>
        <Switch>
          <Route exact path="/" component={()=> <Form setResults={this.setResults} />} />
          <Route exact path="/result" component={()=> <Result receivedResult={this.state.receivedResult} rating={this.state.rating} results={this.state.results} />} />
          <Route exact path="/link" component={()=> <Scrape setResults={this.setResults}/>} />
        </Switch>

      </div>
    );
  }

}

export default App;
