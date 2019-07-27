import React, {useState} from 'react'
import './App.css';
import Form from './Components/MainForm/Form'
import Result from './Components/Result/Result'
import Scrape from './Components/Scrape/Scrape'
import Rating from './Components/Rating/Rating'
import {Switch, Route, withRouter, Link} from 'react-router-dom'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import NavigateNext from '@material-ui/icons/NavigateNext'
import img1 from './index.jpg'

function App(props){
  let [results, setResults] = useState([])
  let [rating, setRating] = useState(null)
  let [receivedResult, setReceivedResult] = useState(false)

  const setItems = (rating, results) => {
    setRating(rating)
    setResults(results)
    setReceivedResult(true)
  }

    return (
      <div>
        <div className="plate">
          <p className="script"><span>MY</span></p>
          <p className="shadow text1">SEASONALITY</p>
          <p className="script"><span>APP</span></p>
        </div>
        {props.location.pathname==="/" ?  <Link to="/link"> <NavigateNext id="next"  /> </Link>
          :   <Link to="/"> <NavigateBefore id="before" /> </Link>}
        <Switch>
          <Route exact path="/" component={()=> <Form setResults={setItems} />} />
          <Route exact path="/result" component={()=> <Result receivedResult={receivedResult} rating={rating} results={results} />} />
          <Route exact path="/link" component={()=> <Scrape setResults={setItems}/>} />
        </Switch>

      </div>

    );
  }

export default withRouter(App);
