import React, {Component} from 'react';
import './App.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class App extends Component() {
  constructor(props){
    this.state = {
      
    }
  }

  render(){
    return (
      <div>
        <form onSubmit={()=>{console.log("submitted")}}>
          <Input defaultValue="Add an ingredient"
            className={classes.input}
            inputProps={{
            'aria-label': 'Description',
            }}
          />
          <Button variant="contained" color="primary" className={classes.button}>
              Primary
          </Button>
        </form>
    </div> 