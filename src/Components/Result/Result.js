import React, {useEffect} from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import './Result.css'
import Rating from '../Rating/Rating'
import {withRouter} from 'react-router-dom'

function Result(props){

  useEffect(()=>{
    if(props.receivedResult===false){
        props.history.push('/')
    }
  })

  let cards = props.results.map((food)=>{
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
            <div> <Rating rating={props.rating} /> </div>
            <div className="cardbox">
                {cards}
            </div>
        </div>
    )

}

export default withRouter(Result)
