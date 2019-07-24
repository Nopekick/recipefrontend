import React, {Component} from 'react'
import './App.css';
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import {apiCall} from './services.js'
import Rating from './Components/Rating/Rating'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      ingredients: [],
      cur: '',
      date: (new Date()).getMonth() + 1,
      results: [],
      rating: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleAdd = () => {
    let ingredients = this.state.ingredients.slice()
    ingredients.push(this.state.cur)
    this.setState({ingredients, cur: ''})
  }

  handleSubmit(e){
    e.preventDefault()
    apiCall("post", "https://recipe-server-vmware.herokuapp.com/api/food", this.state).then(({foods, rating})=>{
      this.setState({results: foods, rating})
      console.log(foods)
    }).catch((err)=>{
      console.log(err)
    })
  }

  render(){
    let ingredients = this.state.ingredients.map((ing)=>{
      return <div key={ing}>
        <h2> {ing} </h2>
      </div>
    })
    let cards = this.state.results.map((food)=>{ 
      return <Card className="card">
      <CardContent>
        <Typography variant="h5" component="h2">
          {food.name}
        </Typography>
        {food.seasonality==false ? 
          <Typography color="secondary">
          Not in season
          </Typography> 
          : <Typography color="primary">
            In Season
          </Typography>
        }
        <Typography variant="body2" component="p">
          {food.tips}
        </Typography>
      </CardContent>
    </Card>
    })

    return (
      <div>
        <div className="Heading"> 
          <h1>Recipe App</h1>
          <p>Welcome to the Recipe App. Here, you can check if the food you are going to cook is seasonal or not. To do this, you simply need to add all the ingredients you are going to use and we'll let you know if those ingredients are seasonal.</p>
        </div>
        {ingredients}
        <form onSubmit={this.handleSubmit}>
          <Input onChange={this.handleChange} placeholder="ingredient..."
            inputProps={{
            'aria-label': 'Description',
            }} name='cur' value={this.state.cur}
          />
          <div className='buttons'>
            <Button type='button' onClick={this.handleAdd} variant="contained" color="primary" >
                Add an ingredient
            </Button>
            <Button type='submit'  variant="contained" color="primary" >
              Submit
          </Button>
          </div>
        </form>
        <div> <Rating rating={this.state.rating} /> </div>
        <div className="cardbox"> 
          {cards}
        </div>
      </div>
    );
  }
  
}

export default App;
