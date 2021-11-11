import {BrowserRouter as Router,Switch,Route } from 'react-router-dom'
//Routing
import PrivateRoute from './routing/privateRoute/PrivateRoute'
// Pages
import {RegisterScreen,ForgotPasswordScreen,ResetPasswordScreen,IndexPage,HomePage,LoginScreen2,Message} from './pages'
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

            <Route exact path="/login" component={LoginScreen2} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
            <Route exact path="/resetpassword" component={ResetPasswordScreen} />
            <PrivateRoute exact path="/root" component={ HomePage }/>
            <Route exact path="/" component={auth.token? IndexPage : LoginScreen2} />
            <Route exact path="/social_home" component={auth.token? HomePage : LoginScreen2}/>
            <Route exact path="/message" component={auth.token? Message : LoginScreen2}/>


        </Switch>
      </div>
    </Router>
  );
}

export default App;
