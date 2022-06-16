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
      className="track"
    >
      <div className="track_info">{props.name}</div>
      <div className="track_info">{props.title}</div>
    </div>
  );
};
export default Track;
