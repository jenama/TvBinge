import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Users from './Components/Users';
import UserProfile from './Components/UserProfile';
import Shows from "./Components/Shows";
import About from "./Components/About";
import ShowProfile from "./Components/ShowProfile";
import AddShow from './Components/AddShow';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props)
   
    const { shows } = this.props
    this.state = {
      users: [],
      shows:[],
      loggedUser: {}
       
    }
  }
         
 


  getProps = (shows) => {
    this.setState({
      allShows: shows
    })
  }

  render() {
     return (
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route path="/users" render={() => <Users users={this.state.users} />}/>
            <Route path="/user/:id" component={UserProfile}/>
            <Route path="/add-show" render={() => 
                <AddShow allShows={this.state.allShows}/>}
                          getProps={this.getProps}
                />
            <Route path="/shows/:id" component={ShowProfile}/>
            <Route path="/shows" render={() => 
              <Shows
                // getProps={this.getProps}
                shows={this.state.shows}
              />}
            />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      );
  }
 
}

export default App;
