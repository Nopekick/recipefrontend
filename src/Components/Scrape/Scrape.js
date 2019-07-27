import React, {useState} from 'react'
import {apiCall} from '../../services.js'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import './Scrape.css'
import {withRouter} from 'react-router-dom'

function Scrape(props){
  let [cur, setCur] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    apiCall('post', 'https://recipe-server-vmware.herokuapp.com/api/link', {cur}).then(async ({result})=>{
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
              let arr = capitalizeArr(temp)
              let obj = {
                ingredients: arr,
                date: (new Date()).getMonth() + 1
              }
              apiCall("post", "https://recipe-server-vmware.herokuapp.com/api/food", obj).then(({foods, rating})=>{
                props.setResults(rating, foods)
                props.history.push('/result')
              }).catch((err)=>{
                console.log(err)
              })
          }).catch((err)=>{ setCur('Error with API. You may have hit the quota.')})

    }).catch((err)=>{
      console.log(err)
    })
    setCur('')
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const capitalizeArr = (arr) => {
    let temp = []
    for(let i = 0; i < arr.length; i++){
      temp[i] = capitalize(arr[i])
    }
    return temp
  }

  return(
        <div id="scrapeBox">
            <form onSubmit={handleSubmit}>
              <Input style={{'color': 'white', 'fontWeight': '800'}} className='cust' onChange={e=>{setCur(e.target.value)}}
                inputProps={{'aria-label': 'Description',}} name='cur' value={cur}/>
          </form>
          <h2><em>Just paste in an Allrecipes link and we'll handle the ingredients</em></h2>
        </div>
    )
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
