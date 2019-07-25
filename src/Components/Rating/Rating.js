import React, {Component} from 'react'
import './Rating.css'

let a = `rating a`
let b = `rating b`
let c = `rating c`
let d = `rating d`
let f = `rating f`


const Rating = ({rating}) => {

    return <div>
        <h3 className="rate">Seasonality Rating:</h3>
        {rating===null ? null : (rating > 90 ? <h1 className={a}> A </h1>
        : (rating > 80 ? <h1 className={b}> B </h1>
        : (rating > 70 ? <h1 className={c}> C</h1>
        : (rating > 60 ? <h1 className={d}> D</h1>
        : <h1 className={f}> F</h1>
        ))))}
    </div>

}

export default Rating;
