import React from "react";

function UserCards(props) {
  return (
    <div className="usercards">
      <img src={props.avatar_url} alt="avatar" />

      <div className="text">
        <h2>{props.name}</h2>
        <h3>{props.login}</h3>
        <p>{props.location}</p>
        <p>profile: {props.html_url}</p>
        <p>followers: {props.followers}</p>
        <p>following: {props.following}</p>
        <p>bio: {props.bio}</p>
        <img
          id="chart"
          src={`https://ghchart.rshah.org/${props.login}`}
          alt="Github chart"
        />
      </div>
    </div>
  );
}

export default UserCards;
