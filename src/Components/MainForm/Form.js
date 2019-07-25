import React, {Component} from 'react'
import {apiCall} from '../../services.js'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import './Form.css'
import {withRouter} from 'react-router-dom'

class Form extends Component {
  constructor(props){
    super(props)
    this.state = {
        ingredients: [],
        cur: '',
        date: (new Date()).getMonth() + 1,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    apiCall("post", "https://recipe-server-vmware.herokuapp.com/api/food", this.state).then(({foods, rating})=>{
      this.props.setResults(rating, foods)
      this.props.history.push('/result')
      console.log(foods)
    }).catch((err)=>{
      console.log(err)
    })
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleAdd = () => {
    let ingredients = this.state.ingredients.slice()
    ingredients.push(this.state.cur)
    this.setState({ingredients, cur: ''})
  }

  render(){
    let ingredients = this.state.ingredients.map((ing)=>{
        return <div  key={ing}>
          <h2> {ing} </h2>
        </div>
    })
    return(
        <div className="card1">
            {ingredients}
             <form onSubmit={this.handleSubmit}>
          <Input id="in" onChange={this.handleChange} placeholder="Ingredient " placeholderTextColor="white"
            inputProps={{
            'aria-label': 'Description',
            }} name='cur' value={this.state.cur}
          />
          <div className='buttons'>
            <Button type='button' onClick={this.handleAdd} variant="outlined">
                Add 
            </Button>
            </div>
            <div className='buttons2'>
            <Button type='submit'  variant="outlined" >
              Submit
          </Button>
         </div>
        </form>
        </div>
    )
  }
}

export default withRouter(Form)