import React, {Component} from 'react'
import './App.css';
import Form from './Components/MainForm/Form'
import Result from './Components/Result/Result'
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

  setResults = (_rating, results) => {
    this.setState({rating: true, results, receivedResult: true})
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
        </Switch>

      </div>
    );
  }

}

export default App;
