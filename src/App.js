import React, {Component} from 'react';
import './App.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      ingredients: [],
      cur: ''
    }
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleAdd = () => {
    let ingredients = this.state.ingredients.slice()
    ingredients.push(this.state.cur)
    this.setState({ingredients, cur: ''})
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render(){
    let ingredients = this.state.ingredients.map((ing)=>{
      return <div>
        <h2> {ing} </h2>
      </div>
    })
    
    return (
      <div>
        {ingredients}
        <form onSubmit={this.handleSubmit}>
          <Input onChange={this.handleChange} defaultValue="ingredient..."
            inputProps={{
            'aria-label': 'Description',
            }} name='cur' value={this.state.cur}
          />
          <div className='buttons'>
            <Button type='button' onClick={this.handleAdd} variant="contained" color="primary" >
                Add Another
            </Button>
            <Button type='submit'  variant="contained" color="primary" >
              Submit
          </Button>
          </div>
        </form>
        <h1>Recipe App</h1>
          <p>Welcome to the Recipe App. Here, you can check if the food you are going to cook is seasonal or not. To do this, you simply need to add all the ingredients you are going to use and we'll let you know if those ingredients are seasonal.</p>
          
      </div>
    );
  }
  
}

export default App;
