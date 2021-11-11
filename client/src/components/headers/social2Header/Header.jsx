import React,{useState,useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
import {Home,NearMe,Explore,Favorite} from '@material-ui/icons'
import {logout} from '../../../redux/actions/authAction'
import {GLOBALTYPES} from '../../../redux/actions/globlaTypes'
import {Avatar} from '../../../components'
import './Header.css'
import logo from '../../../images/suber_logo1.png'
import profile from '../../../images/me.webp'
import {useDispatch,useSelector} from 'react-redux'


const Header = () => {

  const navLinks2 = [
    {label:'Home',icon:<Home/>,path:'/social_home'},
    {label:'Message',icon:<NearMe/>,path:'/message'},
    {label:'Discover',icon:<Explore/>,path:'/discover'},
    {label:'Notify',icon:<Favorite/>,path:'/notify'},

  ]
  const {auth,theme} = useSelector(state => state)

  const dispatch = useDispatch()
  const{pathname} = useLocation()


  const isActive =(pn) =>{
      if(pn===pathname){
        return 'social2__active'
      }
  }

  return (
    <>
    <header className="social2__headerWrapper">
    <nav className="social2__navbar">
      <div className="social2__nav-wrapper">
      <Link to="/" className="social2__link">  <span className="social2__brand-wrapper">
          <img src={logo} className="social2__brand-img" alt=""/>
          <h1 className="social2_logoText">Geneasocial</h1>

        </span></Link>
        <span> <input type="text" className="social2__search-box" placeholder="search" /></span>
        <div className="social2__nav-items">
        {navLinks2.map((link,index)=>(
          <Link to={link.path} className="social2__link"><span key={index} className={`${isActive(link.path)}`}>{link.icon}</span></Link>
        ))}

          <div className="social2__dropdown">

          <Avatar src={auth.user.profilePic? auth.user.profilePic : profile}/>

              <div className="social2__dropdown-content">
                <Link to={`/profile/${auth.user._id}`}>Profile</Link>
                <label htmlFor="theme" className="social2__dropdown-content-theme" onClick={()=> dispatch({type:GLOBALTYPES.THEME,payload: !theme})}>{theme ? 'Light mode' : 'Dark mode'}</label>

                <Link to="/social_home"
                onClick={()=>dispatch(logout())}>
                Logout
                </Link>
            </div>
</div>
        </div>
      </div>
    </nav>
</header>




    </>
  )
}

export default Header
