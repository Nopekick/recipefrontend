import React, {Component} from 'react'
import './App.css';
import Form from './Components/MainForm/Form'
import Result from './Components/Result/Result'
import Scrape from './Components/Scrape/Scrape'
import Landing from './Components/Landing/Landing'
import {Switch, Route, withRouter} from 'react-router-dom'
import img1 from './index.jpg'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      results: [],
      rating: null,
      receivedResult: false
    }
  }

  setResults = (rating, results) => {
    this.setState({rating: rating, results: results, receivedResult: true})
  }

  render(){
    return (
      <div>
        <main>
          <h1 id="title">Recipe App</h1>
        </main>
        <Switch>
          <Route exact path="/" component={()=> <Landing  />} />
          <Route exact path="/manual" component={()=> <Form setResults={this.setResults} />} />
          <Route exact path="/result" component={()=> <Result receivedResult={this.state.receivedResult} rating={this.state.rating} results={this.state.results} />} />
          <Route exact path="/link" component={()=> <Scrape setResults={this.setResults}/>} />
        </Switch>

      </div>
    );
  }

}

export default App;
