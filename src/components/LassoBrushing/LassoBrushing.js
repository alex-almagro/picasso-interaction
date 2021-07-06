import React, { useEffect, useState } from "react";
import picasso from "picasso.js";
import { interactions, scales, components } from "./settings";

const LassoBrushing = (props) => {
  // we save the chart in the state to avoid re-rendering
  const [chart, setChart] = useState(null);

  const getData = () => {
    const arr = [["Product", "Sales", "Cost", "Margin"]];
    for (let i = 0; i < 50; i++) {
      arr.push([
        i, // Product
        Math.random() * 1000, // Sales
        Math.random() * 1000, // Cost
        Math.random(), // Margin
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
    interactions,
  };

  // adding a style is optional
  const style = {
    "$font-size": "14px",
    "$font-size--l": "18px",
    "$font-family": "Noto Sans JP",
  };

  const renderChart = () => {
    const picassoChart = picasso({ style, renderer: { prio: ["canvas"] } }).chart({
      element: document.querySelector("#lassoBrushing"),
      data: getData(),
      settings,
    });
    setChart(picassoChart);
  };

  const resetSelection = () => {
    chart.brush("lasso-example").end();
  };

  useEffect(renderChart, []);

  return (
    <>
      <div id="lassoBrushing"></div>
      <button onClick={resetSelection}>Reset selection</button>
    </>
  );
};

export default LassoBrushing;
