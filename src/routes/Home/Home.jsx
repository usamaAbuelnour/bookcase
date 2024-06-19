import classes from './Home.module.scss'
import React from 'react'

const Home = () => {
  return (
    <div className={classes.container}>
        <input type="text" placeholder='Number Of Books' />
        <button>OK</button>
    </div>
  )
}

export default Home