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
      <Link to="/" className="social2__link">  <span className="social2__brand-wrapper">
          <img src={logo} className="social2__brand-img" alt=""/>
          <h1 className="social2_logoText">Geneasocial</h1>

        </span></Link>
        <Search/>
        <Menu/>

      </div>
    </nav>
</header>




    </>
  )
}

export default Header
