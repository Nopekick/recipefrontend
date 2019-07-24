import React, {Component} from 'react'
import {apiCall} from '../../services.js'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import './Scrape.css'
import {withRouter} from 'react-router-dom'

class Scrape extends Component {
  constructor(props){
    super(props)
    this.state = {
      cur: ''
    }

  }

  handleSubmit = (e) => {
    e.preventDefault()
    apiCall('get', `http://localhost:8081/api/link/${this.state.cur}`).then((data)=>{
      console.log(data)
    }).catch((err)=>{
      console.log(err)
    })

  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  render(){

    return(
        <div>
            <form onSubmit={this.handleSubmit}>
              <Input onChange={this.handleChange} placeholder="ingredient..."
                inputProps={{'aria-label': 'Description',}} name='cur' value={this.state.cur}/>
              <Button type='submit' variant="contained" color="primary" >
               Search
              </Button>
          </form>
        </div>
    )
  }
}

export default withRouter(Scrape)
