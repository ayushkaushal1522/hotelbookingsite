import React from 'react'
import {Link} from 'react-router-dom'
const Landingscreen = () => {
  return (
    <div className='row landing justify-content-center'>
        <div className="col-md-9 my-auto text-center">
            <h2 style={{color:'white' , fontSize:'130px'}}>Roomie</h2>
            <h1 style={{color:'white'}}>"There is only one boss the Guest."</h1>
            <Link to='/home'>
            <button className='btn landingbtn' style={{color:'black'}}><b>Get Started</b></button>
            </Link>
        </div>
    </div>
  )
}

export default Landingscreen