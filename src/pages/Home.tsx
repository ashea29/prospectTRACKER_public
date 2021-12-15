import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import jobHunt from '../assets/images/jobHunt.svg'


const Home: React.FC = () => {
  return (
    <React.Fragment>
        <div className="container">
          <div className="card">
            <img src={jobHunt} id="job-hunt-img" alt="Job Hunt Image"></img>
              <div className="content">
                <h2>Staying on top of your job search can be tough. <br /> <span id='title-h2'>prospect<span className='title-span-h2'>TRACKER</span></span> can help. </h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam facere maxime illum architecto, sunt ratione quibusdam laboriosam, natus labore rerum veritatis dolores incidunt repellendus praesentium libero, doloremque cum asperiores mollitia.
                Vel facilis dicta accusamus doloremque laboriosam nihil non amet assumenda. Optio, nostrum minus. Corporis inventore consequatur voluptate asperiores totam, explicabo beatae consequuntur, tenetur amet, dolorem ipsam aliquam? Velit, deserunt inventore.</p>
              </div>
              <div id="link-container">
                <Link to="/signup"><button>Get Started</button></Link>
                <div>Already registered? <Link to='/login'>Login</Link></div>
            </div>
        </div>
      </div>
    </React.Fragment>
        
  )
}

export default Home
