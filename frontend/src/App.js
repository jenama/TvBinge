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

    this.state = {
      users: [],
      shows:[],
      loggedUser: {
        id: 1,
        username: 'Jon Snow',
        avatar_url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kit-harington-hair-jon-snow-1569167827.jpg?crop=0.439xw:0.878xh;0.0221xw,0.0306xh&resize=480:*'
      },
       genres: [
        {
         id:1,
         genre_name: 'Adventure'
       },
       {
         id:2,
         genre_name: 'Drama'
       },
       {
         id: 3,
         genre_name: 'Comedy'
       },
       {
        id: 4,
        genre_name:'Fantasy'
       }
       ]
    }
  } 

  
         
  render() {
      
     return (
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route path="/users" render={() => <Users users={this.state.users} />}/>
            <Route path="/user/:id" component={UserProfile}/>
            <Route path="/add-show" render={(props) => <AddShow loggedUser={this.state.loggedUser} genres={this.state.genres} {...props}/>}/>
            <Route path="/shows/:id" render={(props) => <ShowProfile loggedUser = {this.state.loggedUser} {...props} />}/>
            <Route path="/shows" render={() =><Shows
              
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
