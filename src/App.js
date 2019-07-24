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

  setResults = (rating, results) => {
    this.setState({rating: true, results, receivedResult: true})
  }

  render(){
    return (
      <div>
        <div className='Heading'>
          <h1>Recipe App</h1>
          <p>Welcome to the Recipe App. Here, you can check if the food you are going to cook is seasonal or not. To do this, you simply need to add all the ingredients you are going to use and we'll let you know if those ingredients are seasonal.</p>
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
