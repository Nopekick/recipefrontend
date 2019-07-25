import React, {Component} from 'react'
import {apiCall} from '../../services.js'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import './Form.css'
import {withRouter} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';


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

//"https://recipe-server-vmware.herokuapp.com/api/food"
  handleSubmit(e){
    e.preventDefault()
    apiCall("post", "https://recipe-server-vmware.herokuapp.com/api/food", this.state).then((data)=>{
      this.props.setResults(data.rating, data.foods)
      console.log(data)
      this.props.history.push('/result')
    }).catch((err)=>{
      console.log(err)
    })
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleAdd = () => {
    let ingredients = this.state.ingredients.slice()
    ingredients.push(this.capitalize(this.state.cur))
    this.setState({ingredients, cur: ''})
  }

  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  render(){
    let ingredients = this.state.ingredients.map((ing)=>{
        return <Card className="item"  key={ing}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {ing}
          </Typography>
        </CardContent>
      </Card>
    })
    return(
        <div className="card1">
          <form onSubmit={this.handleSubmit}>
            <Input autoComplete='off' id="input" onChange={this.handleChange} placeholder="Ingredient "
              inputProps={{
              'aria-label': 'Description',
              }} name='cur' value={this.state.cur}
            />

              <Button style={{'transform': 'scale(1.2)'}} id="button1" type='button' color='primary' onClick={this.handleAdd} variant="contained">
                  Add
              </Button>
              <Button id="button2" style={{'transform': 'scale(1.2)'}} type='submit' color='primary'  variant="contained" >
                Submit
            </Button>

        </form>
        <div id="item-box">
          {ingredients}
        </div>
        </div>
    )
  }
}

export default withRouter(Form)
