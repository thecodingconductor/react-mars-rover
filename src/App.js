import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import PrivateRoute from './components/routing/PrivateRoute';
import Favorites from './components/pages/Favorites';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import NavBar from './components/layout/NavBar';
import Stars from './components/layout/Stars';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import ImageState from './context/image/ImageState';
import Alerts from './components/layout/Alerts';

const App = () => {
  return (
    <AuthState>
      <ImageState>
        <AlertState>
          <Router>
            <div className="App">
              <Stars />
              <NavBar />
              <Alerts />
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path="/login" component={Login}></Route>
                <PrivateRoute exact path="/favorites" component={Favorites}></PrivateRoute>
                <PrivateRoute exact path="/about" component={About}></PrivateRoute>
              </Switch>
            </div>
          </Router>
        </AlertState >
      </ImageState>
    </AuthState>


  );
}

export default App;
