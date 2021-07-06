import React from "react";
import LassoBrushing from "../LassoBrushing/LassoBrushing";
import RangeBrushing from "../RangeBrushing/RangeBrushing";
import "./Layout.scss";

const Layout = (props) => {
  return (
    <div className="wrapper">
      <h1>picasso.js: Interactions with charts</h1>
      <div className="exampleWrapper">
        <h2>Range brushing</h2>
        <p>
          Click on the scales to select a range of data. To reset the selection,
          click on the chart while pressing "Alt"/"option" key.
        </p>
        <RangeBrushing />
      </div>
      <div className="exampleWrapper">
        <h2>Lasso brushing</h2>
        <p>
          Click on the chart and draw your selection with the mouse. To reset
          the selection, click on the chart while pressing "Alt"/"option" key.
        </p>
        <LassoBrushing />
      </div>
    </div>
  );
};

export default Layout;
