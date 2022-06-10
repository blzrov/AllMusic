import React from "react";
const Track = (props) => {
  return (
    <div
      onClick={() => props.clickTrack(props.name)}
      onMouseEnter={() => (document.querySelector("audio").src = props.src)}
      onMouseLeave={() => (document.querySelector("audio").src = "")}
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "url('" + props.image + "')",
      }}
      className="item"
    >
      <div>{props.name}</div>
      <div>{props.title}</div>
    </div>
  );
};
export default Track;
