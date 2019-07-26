import React, {Component} from 'react'
import './App.css';
import Form from './Components/MainForm/Form'
import Result from './Components/Result/Result'
import Scrape from './Components/Scrape/Scrape'
import Rating from './Components/Rating/Rating'
import {Switch, Route, withRouter, Link} from 'react-router-dom'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import NavigateNext from '@material-ui/icons/NavigateNext'
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
        <div className="plate">
          <p className="script"><span>THE</span></p>
          <p className="shadow text1">SEASONALITY</p>
          <p className="script"><span>APP</span></p>
        </div>
        {this.props.location.pathname==="/" ?  <Link to="/link"> <NavigateNext id="next"  /> </Link>
          :   <Link to="/"> <NavigateBefore id="before" /> </Link>}
        <Switch>
          <Route exact path="/" component={()=> <Form setResults={this.setResults} />} />
          <Route exact path="/result" component={()=> <Result receivedResult={this.state.receivedResult} rating={this.state.rating} results={this.state.results} />} />
          <Route exact path="/link" component={()=> <Scrape setResults={this.setResults}/>} />
        </Switch>

      </div>

    );
  }

}


export default withRouter(App);
