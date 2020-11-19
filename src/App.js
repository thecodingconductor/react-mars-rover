import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Auth from './components/pages/Auth';
import Favorites from './components/pages/Favorites';
import NavState from './context/nav/NavState';
import AuthState from './context/auth/AuthState';
import FavoritesState from './context/favorites/FavoritesState';


const App = () => {
  return (
    <AuthState>
      <Router>
        <div className="App">
          <h1>Mars Rover</h1>
          <Switch>
            <Route exact path="/" component={Home}></Route>
          </Switch>
        </div>
      </Router>
    </AuthState>

  );
}

export default App;
