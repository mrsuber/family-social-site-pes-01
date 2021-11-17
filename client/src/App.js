import {BrowserRouter as Router,Switch,Route } from 'react-router-dom'
//Routing
import PrivateRoute from './routing/privateRoute/PrivateRoute'
// Pages
import {RegisterScreen,ForgotPasswordScreen,ResetPasswordScreen,IndexPage,HomePage,LoginScreen2,Message,Discover,Notify,Profile,PorfolioHome} from './pages'
//component
import {Alert} from './components'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect} from 'react'
import {refreshToken} from './redux/actions/authAction'

const App=()=> {

  const {auth} = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(refreshToken())
  },[dispatch])

  return (
    <Router>
      <div className='App'>
      <Alert />

        <Switch>
            <Route exact path="/porfolio/home" component={PorfolioHome} />
            <Route exact path="/login" component={LoginScreen2} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
            <Route exact path="/resetpassword" component={ResetPasswordScreen} />
            <Route exact path="/" component={auth.token? IndexPage : LoginScreen2} />
            <PrivateRoute exact path="/social_home" component={auth.token? HomePage : LoginScreen2}/>
            <PrivateRoute exact path="/message" component={auth.token? Message : LoginScreen2}/>
            <PrivateRoute exact path="/discover" component={auth.token? Discover : LoginScreen2}/>
            <PrivateRoute exact path="/notify" component={auth.token? Notify : LoginScreen2}/>
            <PrivateRoute exact path="/profile/:id" component={auth.token? Profile : LoginScreen2}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
