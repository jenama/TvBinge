import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profilePage: {},
            watchShows: []
        }
    }

    async componentDidMount() {
        const userId = this.props.match.params.id;
          
       console.log('user ID', userId)
        try {
            const url = `http://localhost:4100/users/${userId}`
            const { data } = await axios.get(url);
            console.log(' profile', data)
            this.setState({
                profilePage: data.payload,
            })
        } catch (error) {
            console.log('error', error)
        }
        this.getUserShows(userId)
    }

    getUserShows = async(params) => {
       
        try {
           const url = `http://localhost:4100/shows/user/${params}` 
           const { data } = await axios.get(url)
           console.log('user', data)
           this.setState({
                watchShows: data.payload
           })
        } catch (error) {
          console.log('error', error)  
        }
    }

    render() {
        const { watchShows, profilePage } = this.state
        return(
            <div className='user-profile'>
                 <h1>Welcome {profilePage.username}</h1>
                <img className='avatar' src={profilePage.avatar_url} alt='' width='400px' height='400px'/>
                <div>
                      {watchShows.map((profile, i)=> {
                    return(
                        <div className='user-shows' key={i}>
                            <h3>{profile.title}</h3>
                            <Link to= {`/shows/${profile.id}`}>
                                <img className='img' src={profile.img_url} alt='' width='400px' height='400px'/>
                            </Link>
                            <div>Genre: {profile.genre_name} </div>
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }
}

export default UserProfile;