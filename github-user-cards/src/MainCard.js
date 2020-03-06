import React from "react";

function MainCard(props) {
  return (
    <div className="maincard">
      <img src={props.avatar_url} alt="avatar" />

      <div className="text">
        <h2>{props.name}</h2>
        <h3>{props.login}</h3>
      </div>
    </div>
  );
}

export default MainCard;
