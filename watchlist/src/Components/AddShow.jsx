import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class AddShow extends Component {
    constructor(props) {
        super(props)
        console.log('props////', this.props.genres)
        
        this.state = {
            shows: [],
            choice: '',
            title: '',
            img_url: '',
            genres: this.props.genres,
            user_id: this.props.loggedUser.id,
            // genre_name: this.props.genres,
            genre_id: 0
            

        }
    }

    async componentDidMount(){
        try {
            const url = `http://localhost:4100/shows`;
            const { data } = await axios.get(url);
            console.log("shows", data);
       
            this.setState({
                shows: data.payload,
                
            });
        } catch (error) {
            console.log("error", error);
        }
        // this.getAllGenres()
     }

  

     handleSelect = (e) => {
        console.log('select', e.target.value)
        this.setState({
            choice: e.target.value,
           
        })
    }

    handleChange = (e) => {
         console.log('select', e.target.value)
        this.setState({
             genre_id: e.target.value,
             user_id: this.state.user_id
        })
    }

    handleInput = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        })
        console.log('input', value)
    }
    
    handleForm = async(e) => {
         e.preventDefault()
    }

    handleForm2 = async(e) => {
         e.preventDefault()
        const { title, img_url, genre_id, genres, user_id} = this.state;
        console.log('check user_id', user_id)

    try {
      const url = `http://localhost:4100/shows`;
     
      const data = {
        title:title,
        img_url:img_url,
        genre_id: genre_id,
        user_id:this.props.loggedUser.id,
      };
      
      let newShow = await axios.post(url, data);
     
      console.log("response", newShow);
     
    //   this.setState({

    //     title: data.title,
    //     img_url: data.img_url,
    //     genre_id: data.genre_id,
    //     user_id: data.user_id
    //   });
    } catch (error) {
      console.log("error", error);
    }
    }

    render() {
        // const showId = this.props.match.params.id
        const { genres, shows, genre_id } = this.state
        
        return(
            <div>
                <h1>Add Show</h1>
                <form onSubmit={this.handleForm}>
                    <h2>Start Watching Show</h2>
                    <select onChange={this.handleSelect} value={this.state.choice}>
                        <option>---ALL Shows---</option>
                        {shows.map((show, i) =>{
                            return (
                                <>
                                  <option key={i}>{show.title}</option>
                                     
                                </>
                               
                            )
                        })}
                    </select>
                    <br></br> 
                    <input type='submit' value='start watching'/>
                    {/* <Link to={`/shows/${show.id}`}></Link> */}
                </form>
                <form onSubmit={this.handleForm2} >
                    <h2>Or Add A New Show</h2>
                    <label>
                        Title
                        <input 
                            type="text"
                            name="title"
                            onChange={this.handleInput}
                            value={this.state.title}
                            placeholder='Title...'
                        />
                    </label>
                    <br></br>
                    <label>
                        Img URL
                        <input
                            type="text"
                            name="img_url"
                            onChange={this.handleInput}
                            value={this.state.img_url}
                            placeholder='url...' 
                        />
                    </label>
                    <br></br>
                    <label>
                        Genre
                        <select onChange= {this.handleChange} value={this.state.genre_id} type='text'>
                            <option>---Select A Genre---</option>
                            {genres.map((genre, i) =>{
                                return (
                                    <option key={i}> {genre.id} </option>
                                )
                            })}
                        </select>
                    </label>
                    <br></br>
                    <input type='submit' value='send'/>
                </form>
                <div>
                    <h2>{this.state.title}</h2>
                    <img src={this.state.img_url} alt=''/>
                    <div>{this.state.genre_name}</div>

                </div>
            </div>
        )
    }
}

export default AddShow;