import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor(props) {
        
        super(props)
        console.log('users!!!', this.props.users )
        this.state = {
            users: this.props.users,
            loggedUser: this.props.loggedUser
        };
    }

    async componentDidMount(){
        try {
           const url = `http://localhost:4100/users` 
           const { data } = await axios.get(url)
           console.log('users', data.payload)
            this.setState({
                users: data.payload,
                loggedUser:data.payload[0].username
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    render() {
        const { users, loggedUser } = this.state
        return(
            <div className='users'>
                <h1>All TV-Watchlist Users</h1>
                <div>
                    <p>Logged In:{loggedUser}</p>
                    {users.map((user, i) => {
                        return (
                            <div className='user' key={i}>
                                <Link to={`/user/${user.id}`}>
                                    <h2>{user.username}</h2>
                                </Link>
                                <img src={user.avatar_url} alt='' width='200px'/>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Users;