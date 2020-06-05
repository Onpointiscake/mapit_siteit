import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TheNavbar from './Components/Global/TheNavbar'
import News from './Components/User/News'
import UserGallery from './Components/User/UserGallery'
import EditGallery from './Components/User/EditGallery'
import AddSite from './Components/User/AddSite'
import Login from './Components/User/Login'
import Home from './Components/NotUser/Home'
import AboutLanding from './Components/NotUser/AboutLanding'
import Register from './Components/NotUser/Register'
import Contact from './Components/Global/Contact'

class App extends React.Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }
  setAuthStatus = (authenticated) => {
    this.setState({
      isAuthenticated: authenticated
    })
  }
  setUser = (user) => {
    this.setState({
      user: user
    })
  }
  async componentDidMount(){
    
    this.setState({isAuthenticating:false})
  }
  render(){
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }
    return (
      <div className="App">
        <Router>
        <Route path="/" render={(props) => <TheNavbar authentication={authProps} {...props} />} />
          <Switch>
            <News exact path="/news" />
            <AddSite exact path="/addsite" authentication={authProps} />
            <UserGallery exact path="/usergallery" />
            <Route path="/usergallery/:gallery_name" render={(props) => <EditGallery {...props} />} />
            <Home exact path="/" authentication={authProps} />
            <AboutLanding exact path="/about" />
            <Route path={process.env.PUBLIC_URL + "/login"} render={(props) => <Login authentication={authProps} {...props} />} />
            <Register exact path="/register" />
            <Contact exact path="/contact" />
          </Switch>
        </Router>
        
      </div>
    );
  } 
}

export default App;
