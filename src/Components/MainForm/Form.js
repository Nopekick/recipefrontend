import React, {useState} from 'react'
import {apiCall} from '../../services.js'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import './Form.css'
import {withRouter} from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';


function Form(props){
  let [ingredients, setIngredients] = useState([])
  let [cur, setCur] = useState('')
  let [date, setDate] = useState((new Date()).getMonth() + 1)

//"https://recipe-server-vmware.herokuapp.com/api/food"
  const handleSubmit = (e) => {
    e.preventDefault()
    apiCall("post", "https://recipe-server-vmware.herokuapp.com/api/food", {ingredients, cur, date}).then((data)=>{
      props.setResults(data.rating, data.foods)
      props.history.push('/result')
    }).catch((err)=>{
      console.log(err)
    })
  }

  const handleAdd = () => {
    let temp = ingredients.slice()
    temp.push(capitalize(cur))
    setIngredients(temp)
    setCur('')
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  let ingreds = ingredients.map((ing)=>{
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
            <form onSubmit={handleSubmit}>
              <Input autoComplete='off' id="input" onChange={e=>{setCur(e.target.value)}} placeholder="Ingredient "
                inputProps={{
                'aria-label': 'Description',
                }} name='cur' value={cur}
              />

                <Button style={{'transform': 'scale(1.2)'}} id="button1" type='button' color='primary' onClick={handleAdd} variant="contained">
                    Add
                </Button>
                <Button id="button2" style={{'transform': 'scale(1.2)'}} type='submit' color='primary'  variant="contained" >
                  Submit
              </Button>
          </form>
          <div id="item-box">
            {ingreds}
          </div>
      </div>
    )
}

export default withRouter(Form)
