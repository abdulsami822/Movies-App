import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import SpecificMovie from './components/SpecificMovie'
import PopularMovies from './components/PopularMovies'
import Search from './components/Search'
import Account from './components/Account'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/movies/:id" component={SpecificMovie} />
    <ProtectedRoute exact path="/popular-movies" component={PopularMovies} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute component={NotFound} />
  </Switch>
)

export default App
