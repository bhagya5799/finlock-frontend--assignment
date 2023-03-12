import { Switch, Route } from 'react-router-dom'

// import ProtectRoute from './Components/ProtectRoute'
import Login from './Components/Login'
import Home from './Components/Home'
import Signup from './Components/Signup'
import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
    </Switch>
  </>
)

export default App