import {Link} from 'react-router-dom'
import {Menu,Search} from '../../../components'
import './Header.css'
import logo from '../../../images/suber_logo1.png'


const Header = () => {


  return (
    <>
    <header className="social2__headerWrapper">
    <nav className="social2__navbar">
      <div className="social2__nav-wrapper">
       <span className="social2__brand-wrapper">
          <Link to="/" className="social2__link"> <img src={logo} className="social2__brand-img" alt=""/></Link>
          <h1 className="social2_logoText" onClick={()=>window.scrollTo({top:0})}>Geneasocial</h1>

        </span>
        <Search/>
        <Menu/>

      </div>
    </nav>
</header>




    </>
  )
}

export default Header
