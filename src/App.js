import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Auth from './components/pages/Auth';
import PrivateRoute from './components/routing/PrivateRoute';
import Favorites from './components/pages/Favorites';
import NavState from './context/nav/NavState';
import AuthState from './context/auth/AuthState';
import ImageState from './context/image/ImageState';
import FavoritesState from './context/favorites/FavoritesState';


const App = () => {
  return (
    <ImageState>
      <AuthState>
        <Router>
          <div className="App">
            <h1>Mars Rover</h1>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <PrivateRoute exact path="/favorites" component={Favorites}></PrivateRoute>
            </Switch>
          </div>
        </Router>
      </AuthState>
    </ImageState>


  );
}

export default App;
