import React from "react";
import RangeBrushing from "../RangeBrushing/RangeBrushing";
import "./Layout.scss";

const Layout = (props) => {
  return (
    <div>
      <h1>Range brushing</h1>
      <p>
        Click on the scales to select a range of data. To reset the selection,
        click on the chart while pressing "Alt"/"option" key.
      </p>
      <RangeBrushing />
    </div>
  );
};

export default Layout;
