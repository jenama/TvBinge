import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Shows extends Component {
  constructor(props) {
    super(props);
    console.log("shows prop", this.props);
    this.state = {
      shows: this.props.shows,
    };
  }

  async componentDidMount() {
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
  }

  addShow = () => {
    this.props.addShow();
  };

  handleButton = () => {
    console.log('click')
  }

  render() {
    const { shows } = this.state;
    console.log("showssss", shows);

    return (
      <div className="shows">
       
            <Link onClick={this.handleButton} to={`/add-show`}><button>Add Show</button></Link>
        
        <h1>All Currently Watch Shows</h1>

        <div>
          {shows.map(show => {
            {/* console.log('show me', show) */}
            return (
              <div className="show">
                <h2>{show.title}</h2>
                <img
                  className="show-image"
                  src={show.img_url}
                  alt=""
                  width="450px"
                  height="450px"
                />
                <div>Genre: {show.genre_name} </div>
                  Being Watched By:
                  {show.username.map((user, i) => {
                    console.log('show me', user)
                  return (
                    <div>
                      <Link to={`/user/${user}`}>{user}</Link>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Shows;
