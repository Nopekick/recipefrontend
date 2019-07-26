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
    console.log(this.state.cur)
    apiCall('post', 'https://recipe-server-vmware.herokuapp.com/api/link', this.state).then(async ({result})=>{
        let temp = []
        fetch("https://sandbox.zestfuldata.com/parseIngredients", {
            method : "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "ingredients": result
              })
          }).then(data=> data.json()).then(({results})=>{
              results.forEach((data)=>{
                temp.push(data.ingredientParsed.product)
              })
              let arr = this.capitalizeArr(temp)
              let obj = {
                ingredients: arr,
                date: (new Date()).getMonth() + 1
              }
              console.log(obj)
              apiCall("post", "https://recipe-server-vmware.herokuapp.com/api/food", obj).then(({foods, rating})=>{
                this.props.setResults(rating, foods)
                this.props.history.push('/result')
                console.log(foods)
              }).catch((err)=>{
                console.log(err)
              })
          }).catch((err)=>{ console.log(err )})

    }).catch((err)=>{
      console.log(err)
    })
    this.setState({cur: ''})
  }

  capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  capitalizeArr = (arr) => {
    let temp = []
    for(let i = 0; i < arr.length; i++){
      temp[i] = this.capitalize(arr[i])
    }
    return temp
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  render(){

    return(
        <div id="scrapeBox">
            <form onSubmit={this.handleSubmit}>
              <Input style={{'color': 'white', 'fontWeight': '800'}} className='cust' onChange={this.handleChange}
                inputProps={{'aria-label': 'Description',}} name='cur' value={this.state.cur}/>
          </form>
          <h2><em>Just paste in an Allrecipes link and we'll handle the ingredients</em></h2>
        </div>
    )
  }
}

// console.log(result)
// let appId = 'da5f13f1'
// let appKey = '64c47e4ffd51e406cb6e7088e9c00eea	—'
// let appId2 = '97391f03'
// let appKey2 = '165ab6ff16f2b83e493287fdb52e0e10	—'
//
// let ing = encodeURI(result[3])
// apiCall('get', `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${ing}`)
// .then((data)=>{
//   if(data) console.log(data)
// }).catch((err)=>{
//   console.log(err)
// })


export default withRouter(Scrape)
