import React, { Component } from 'react';
import axios from 'axios';

class ShowProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showProfile: {},
            comments: [],
           comment_body: '',
           username: '', 
        //    user_id: 0
        }
    }

    async componentDidMount () {
        const params = this.props.match.params.id
        console.log('try props', this.props)
        try {
          const url = `http://localhost:4100/shows/${params}` 
          const { data } = await axios.get(url)
          console.log('data', data.payload)
          this.setState({
              showProfile: data.payload
          })
        } catch (error) {
            console.log()
        }
        this.getComments(params)
    }

    getComments = async(params) => {
        try {
           console.log("params", params);
           const url = `http://localhost:4100/comments/show/${params}`;
           const { data } = await axios.get(url);
            console.log("commments", data);
            this.setState({
                comments: data.payload
            }); 
        } catch (error) {
           console.log('error', error) 
        }
    
    }

    handleInput = (e) => {
        console.log(e.target.value)
         this.setState({
            username:e.target.value,
           
         })
    }

    handleText = (e) => {
        console.log(e.target.value)
        this.setState({
           comment_body: e.target.value,
           
        })
    }

    handleSubmit = async(e) => {
        console.log('show id', this.props.match.params.id)
        console.log('some props', this.props)
        e.preventDefault()
        
        try {
            // const showId = this.props.match.params.id
            const { comment_body, user_id, username} = this.state
         
            const url = `http://localhost:4100/comments`;
            const data= {
                comment_body: comment_body,
                user_id: 1,
                show_id: this.props.match.params.id
            }
            console.log('user_id', user_id)
            await axios.post(url, data);
            console.log('new comment', data)
            this.setState({
                comment_body: comment_body,
                user_id: user_id ,
                show_id: this.props.match.params.id
            });
        } catch (error) {
            console.log('ERROR', error)
        }
    }

    render() {
        const { showProfile, comment_body, comments, username } = this.state
        return(
            <div>
                <h2>Welcome to {showProfile.title}'s Page </h2>
                <img src={showProfile.img_url} alt='' width='300px' height='300px'/>
                <div> Genre: {showProfile.genre_name} </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input type='text' onChange={this.handleInput} value={username} />
                        <br></br>
                        <textarea onChange={this.handleText} value={comment_body}/>
                        <br></br>
                        <input type='submit' value='Add'/>
                    </form>
                    <h3>{username}</h3>
                    <div>{comment_body}</div>
                    <div>
                        {comments.map((comment, i)=> {
                            return(
                                <div>
                                    <ol>
                                        <h3>{comment.username}</h3>
                                        <li>{comment.comment_body}</li>    
                                    </ol>
                                
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowProfile;