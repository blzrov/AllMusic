import React from "react";
import TrackIitems from "./Track_items";
import ArtistItems from "./Artist_items";
const Items = (props) => {
  console.log(props.data);
  return (
    <div className="items">
      <TrackIitems />
      <ArtistItems />
    </div>
  );
};
export default Items;
