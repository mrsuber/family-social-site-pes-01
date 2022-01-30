import {Link,useLocation} from 'react-router-dom'
import {Home,NearMe,Explore,Favorite,Group} from '@material-ui/icons'
import {logout} from '../../redux/actions/authAction'
import {GLOBALTYPES} from '../../redux/actions/globlaTypes'
import {Avatar, NotifyModal} from '../../components'
import './Menu.css'
import profile from '../../images/me.webp'
import {useDispatch,useSelector} from 'react-redux'

const Menu = () => {

  const navLinks2 = [
    {label:'Home',icon:<Home/>,path:'/social_home'},
    {label:'Message',icon:<NearMe/>,path:'/message'},
    {label:'Discover',icon:<Explore/>,path:'/discover'},
    {label:'Family',icon:<Group/>,path:'/family_home'},

  ]
  const {auth,theme,notify} = useSelector(state => state)

  const dispatch = useDispatch()
  const{pathname} = useLocation()


  const isActive =(pn) =>{
      if(pn===pathname){
        return 'social2__active'
      }
  }

  return (
    <>
    <span className="social2__nav-items">
    <div className="social2__menu">
    {navLinks2.map((link,index)=>(
      <Link to={link.path} className="social2__link" key={index}><span  className={`${isActive(link.path)}`}>{link.icon}</span></Link>
    ))}
</div>
    {/*Notify dropdown*/}
    <div className="nav-item dropdown">
      <span className="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span className="social2__perent_fevorite" style={{color: notify.data.length >0 ? 'crimson' : ''}}><Favorite/><span className="social2__children_fevorite">{notify.data.length}</span></span>

      </span>

      <div className="dropdown-menu social2__translate_notification" aria-labelledby="navbarDropdown"   style={{transform:'translate3d(-114px, 40px, 0px)'}}>
          <NotifyModal />
      </div>
    </div>

    {/*Notify dropdown*/}

        {/*Avatar dropdown*/}
        <div className="nav-item dropdown">
          <span className="nav-link social2__adjust_avatar" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span><Avatar src={ auth.user.profilePic} size="social2__normal-profileImage"/></span>
          </span>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link to={`/profile/${auth.user._id}`} className="dropdown-item">Profile</Link>
          <label htmlFor="theme" className=" dropdown-item" onClick={()=> dispatch({type:GLOBALTYPES.THEME,payload: !theme})}>{theme ? 'Light mode' : 'Dark mode'}</label>

            <div className="dropdown-divider"></div>
            <a href="/social_home" onClick={()=>dispatch(logout())} className="dropdown-item"> Logout </a>
          </div>
        </div>
          {/*Avatar dropdown*/}


      {/*<div className="social2__dropdown">
      <Avatar src={ auth.user.profilePic} size="social2__normal-profileImage"/>
          <div className="social2__dropdown-content">
            <Link to={`/profile/${auth.user._id}`}>Profile</Link>
            <label htmlFor="theme" className="social2__dropdown-content-theme" onClick={()=> dispatch({type:GLOBALTYPES.THEME,payload: !theme})}>{theme ? 'Light mode' : 'Dark mode'}</label>

            <a href="/social_home"
            onClick={()=>dispatch(logout())}>
            Logout
            </a>
            </div>
      </div>*/}

    </span>






    </>
  )
}

export default Menu
