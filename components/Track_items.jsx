import React from "react";
import Track from "./Track";
const TrackIitems = (props) => {
  if (props.data)
    return (
      <div className="track_items">
        {props.data.map((track) => (
          <Track
            clickTrack={props.clickTrack}
            key={track.id}
            src={track.preview}
            image={track.album.cover_medium}
            name={track.artist.name}
            title={track.title}
          />
        ))}
      </div>
    );
};
export default TrackIitems;
