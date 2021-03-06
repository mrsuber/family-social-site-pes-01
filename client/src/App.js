import {BrowserRouter as Router,Switch,Route } from 'react-router-dom'
//Routing
import PrivateRoute from './routing/privateRoute/PrivateRoute'
// Pages
import {
  IndexPage,
  RegisterScreen,ForgotPasswordScreen,ResetPasswordScreen,LoginScreen2,
  PostDetails,HomePage,Message,Discover,Notify,Profile,PorfolioHome,MessageDetails,
  BlogHomePage,
  AdminHome,AdminLoginScreen,AdminErrorScreen,AdminExpenseScreen,
  AdminProjectExpansionScreen,
  AdminApplicationScreen,AdminApplicationScreen2,AdminApplicationScreen3,
  AdminStudent,AdminCourse,AdminCourse2,
  AdminRelCourse2



} from './pages'
//component
import {Alert,CallModal} from './components'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {refreshToken} from './redux/actions/authAction'
import io from 'socket.io-client'
import {GLOBALTYPES} from './redux/actions/globlaTypes'
import SocketClient from './SocketClient'
import Peer from 'peerjs'



const App=()=> {

  const {auth,modal,status,call} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(refreshToken())
    const socket = io()
    dispatch({type:GLOBALTYPES.SOCKET, payload:socket})
    return () => socket.close()
  },[dispatch])

  useEffect(()=>{
    const newPeer = new Peer(undefined, {
      path:'/', secure:true

    })
    dispatch({type:GLOBALTYPES.PEER, payload:newPeer})
  },[dispatch])

  return (
    <Router>
      <div className={`App ${(status || modal) && 'social2__mode'}`} >
      <Alert />
            {auth.token && <SocketClient />}
            {call && <CallModal/>}
        <Switch>
            <Route exact path="/porfolio/home" component={PorfolioHome} />
            <Route exact path="/login" component={LoginScreen2} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
            <Route exact path="/resetpassword" component={ResetPasswordScreen} />
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/admin" component={AdminHome} />
            <Route exact path="/admin/login" component={AdminLoginScreen} />
              <PrivateRoute exact path="/blog_home" component={ BlogHomePage}/>

            <PrivateRoute exact path="/social_home" component={auth.token ? HomePage : LoginScreen2}/>
            <PrivateRoute exact path="/message" component={auth.token ? Message : LoginScreen2}/>
            <PrivateRoute exact path="/message/:id" component={auth.token ? MessageDetails : LoginScreen2}/>
            <PrivateRoute exact path="/discover" component={auth.token ? Discover : LoginScreen2}/>
            <PrivateRoute exact path="/notify" component={auth.token ? Notify : LoginScreen2}/>
            <PrivateRoute exact path="/profile/:id" component={auth.token ? Profile : LoginScreen2}/>
            <PrivateRoute exact path="/post/:id" component={auth.token ? PostDetails : LoginScreen2}/>

            <Route exact path="/admin/expense" component={auth.token && auth.user.isSuperAdmin===true? AdminExpenseScreen : AdminErrorScreen}/>
            <Route exact path="/admin/projectExpansion" component={auth.token && auth.user.isSuperAdmin===true? AdminProjectExpansionScreen : AdminErrorScreen}/>


            <Route exact path="/admin/application" component={auth.token && auth.user.isSuperAdmin===true? AdminApplicationScreen : AdminErrorScreen}/>
            <Route exact path="/admin/application/oracle" component={auth.token && (auth.user.isApplication1===true || auth.user.isSuperAdmin===true)? AdminApplicationScreen2 : AdminErrorScreen}/>
            <Route exact path="/admin/application/hippo" component={auth.token && (auth.user.isApplication2===true || auth.user.isSuperAdmin===true)? AdminApplicationScreen3 : AdminErrorScreen}/>





            <Route exact path="/school/devcourse" component={auth.token && (auth.user.isStudentTech===true || auth.user.isSuperAdmin===true)? AdminCourse : AdminErrorScreen}/>
            <Route exact path="/school/devcourse/webstuden" component={auth.token && (auth.user.isStudentTech===true || auth.user.isSuperAdmin===true)? AdminCourse2 : AdminErrorScreen}/>
            <Route exact path="/school/religion" component={auth.token && (auth.user.isStudentRel===true || auth.user.isSuperAdmin===true)? AdminRelCourse2 : AdminErrorScreen}/>

            <Route exact path="/school" component={auth.token && auth.user.isSuperAdmin===true? AdminStudent : AdminErrorScreen}/>






        </Switch>
      </div>
    </Router>
  );
}

export default App;
