
import './IndexPage.css'
import {Link} from 'react-router-dom'

const IndexPage = () => {
  const logoutHandler=()=>{
    localStorage.removeItem("firstLogin")

  }
  return (

    <>
    <input type="checkbox" id="theme" />
    <div className="index-body">
      <button onClick={logoutHandler}>Logout</button>

      <div className="index-wrapper">
          <Link to="/social_home" className="social2__link"><div className="index-box1">
          <h1 className="index-box1_title">MSB-Social</h1>
        </div></Link>

      <div className="index-box1"></div>
        <div className="index-box1"></div>
        <div className="index-box1"></div>
      </div>

      </div>
    </>

  )
}

export default IndexPage
