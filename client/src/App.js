import {BrowserRouter as Router,Switch,Route } from 'react-router-dom'
//Routing
import PrivateRoute from './routing/privateRoute/PrivateRoute'
// Pages
import {PostDetails,RegisterScreen,ForgotPasswordScreen,ResetPasswordScreen,IndexPage,HomePage,LoginScreen2,Message,Discover,Notify,Profile,PorfolioHome,MessageDetails} from './pages'
//component
import {Alert,CallModal} from './components'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {refreshToken} from './redux/actions/authAction'
import bg from './images/boxed-bg.jpg'
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
      <div className={`App ${(status || modal) && 'social2__mode'}`} style={{backgroundImage:`url(${bg})`,backgroundAttachment:'fixed',backgroundPosition:'center',minHeight:'100vh'}}>
      <Alert />
            {auth.token && <SocketClient />}
            {call && <CallModal/>}
        <Switch>
            <Route exact path="/porfolio/home" component={PorfolioHome} />
            <Route exact path="/login" component={LoginScreen2} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
            <Route exact path="/resetpassword" component={ResetPasswordScreen} />
            <Route exact path="/" component={auth.token? IndexPage : LoginScreen2} />

            <PrivateRoute exact path="/social_home" component={auth.token? HomePage : LoginScreen2}/>
            <PrivateRoute exact path="/message" component={auth.token? Message : LoginScreen2}/>
            <PrivateRoute exact path="/message/:id" component={auth.token? MessageDetails : LoginScreen2}/>
            <PrivateRoute exact path="/discover" component={auth.token? Discover : LoginScreen2}/>
            <PrivateRoute exact path="/notify" component={auth.token? Notify : LoginScreen2}/>
            <PrivateRoute exact path="/profile/:id" component={auth.token? Profile : LoginScreen2}/>
            <PrivateRoute exact path="/post/:id" component={auth.token? PostDetails : LoginScreen2}/>


        </Switch>
      </div>
    </Router>
  );
}

export default App;
