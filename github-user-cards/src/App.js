import React from "react";
import UserCards from "./UserCards";
import "./App.css";
import axios from "axios";
import logo from "./img/githublogo.png";
import MainCard from "./MainCard";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "kkslider2130",
      usercard: [],
      friendsInfo: []
    };
  }
  componentDidMount() {
    axios
      .get(`https://api.github.com/users/${this.state.user}`)
      .then(res => this.setState({ usercard: res.data }));

    axios
      .get(`https://api.github.com/users/${this.state.user}/followers`, {
        headers: {
          Authorization: "token bc363b209b1e8d49a4ea03a24b1a915cd9170d4a"
        }
      })

      .then(res =>
        res.data.map(a => {
          /* this.setState({ friends: [...this.state.friends, a.url] }) */
          return a.url;
        })
      )
      .then(res =>
        res.map(a => {
          return axios
            .get(a, {
              headers: {
                Authorization: "token bc363b209b1e8d49a4ea03a24b1a915cd9170d4a"
              }
            })
            .then(res =>
              this.setState({
                friendsInfo: [...this.state.friendsInfo, res.data]
              })
            );
        })
      )
      .catch(err => console.log(err));
  }
  handleChange = event => {
    this.setState({ user: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ friendsInfo: [] });

    axios

      .get(`https://api.github.com/users/${this.state.user}`)
      .then(res => this.setState({ usercard: res.data }));
    axios
      .get(`https://api.github.com/users/${this.state.user}/followers`, {
        headers: {
          Authorization: "token bc363b209b1e8d49a4ea03a24b1a915cd9170d4a"
        }
      })
      .then(res =>
        res.data.map(a => {
          /* this.setState({ friends: [...this.state.friends, a.url] }) */
          return a.url;
        })
      )
      .then(res =>
        res.map(a => {
          return axios
            .get(a, {
              headers: {
                Authorization: "token bc363b209b1e8d49a4ea03a24b1a915cd9170d4a"
              }
            })
            .then(res =>
              this.setState({
                friendsInfo: [...this.state.friendsInfo, res.data]
              })
            );
        })
      )
      .catch(err => alert(err));
  };

  render() {
    console.log(this.state.friendsInfo);
    console.log(this.state.usercard);

    return (
      <div className="app-container">
        <div className="header">
          <h1>My Github Friends</h1>

          <img src={logo} alt="GitHub Logo" />
          <MainCard
            avatar_url={this.state.usercard.avatar_url}
            name={this.state.usercard.name}
            login={this.state.usercard.login}
            location={this.state.usercard.location}
            html_url={this.state.usercard.html_url}
            followers={this.state.usercard.followers}
            following={this.state.usercard.following}
            bio={this.state.usercard.bio}
          />
        </div>

        <div className="inputs">
          <input
            type="text"
            onChange={this.handleChange}
            placeholder="enter github username"
          />
          <button onClick={this.handleSubmit}>Show your friends</button>
        </div>
        <div className="cards">
          {this.state.friendsInfo.map(a => (
            <UserCards
              avatar_url={a.avatar_url}
              name={a.name}
              login={a.login}
              location={a.location}
              html_url={a.html_url}
              followers={a.followers}
              following={a.following}
              bio={a.bio}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;
