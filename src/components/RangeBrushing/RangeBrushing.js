import React, { useEffect, useState } from "react";
import picasso from "picasso.js";
import { getInteractions, scales, components } from "./settings";
// import './RangeBrushing.scss';

const RangeBrushing = (props) => {
  // we save the chart in the state to avoid re-rendering
  const [chart, setChart] = useState(null);

  const getData = () => {
    const arr = [["Product", "Sales"]];
    const [min, max] = [100, 800];
    for (let i = 0; i < 26; i++) {
      arr.push([
        String.fromCharCode(i + 65), // Product
        Math.random() * max + min, // Sales
      ]);
    }
    return [
      {
        type: "matrix",
        data: arr,
      },
    ];
  };

  // the settings are quite verbose, so we moved them to the "settings" file for readability
  const settings = {
    scales,
    components,
    interactions: getInteractions(),
  };

  const renderChart = () => {
    const picassoChart = picasso({ renderer: { prio: ["canvas"] } }).chart({
      element: document.querySelector("#rangeBrushing"),
      data: getData(),
      settings,
    });
    setChart(picassoChart);
  };

  const resetSelection = () => {
    chart.brush("range-example").end();
    chart.component("rangeY").emit("rangeClear");
    chart.component("rangeX").emit("rangeClear");
  };

  useEffect(renderChart, []);

  return (
    <>
      <div id="rangeBrushing"></div>
      <button onClick={resetSelection}>Reset selection</button>
    </>
  );
};

export default RangeBrushing;
