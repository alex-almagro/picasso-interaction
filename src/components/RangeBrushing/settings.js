// defining scales
export const scales = {
  s: {
    data: {
      field: "Sales",
    },
    min: 0,
    max: 1000,
    invert: true,
  },
  p: {
    data: {
      extract: { field: "Product" },
    },
  },
};

// defining interactions
const mouseEventToRangeEvent = (e) => {
  return {
    center: { x: e.clientX, y: e.clientY },
    deltaX: e.movementX,
    deltaY: e.movementY,
  };
};

export const getInteractions = () => {
  let rangeRef = "rangeY";
  return [
    {
      type: "native",
      events: {
        mousedown: function (e) {
          // Use Alt-key + click to reset the brush
          if (e.altKey) {
            console.log(this.chart);
            this.chart.brush("range-example").end();
            this.chart.component("rangeY").emit("rangeClear");
            this.chart.component("rangeX").emit("rangeClear");
          }

          const overComp = this.chart.componentsFromPoint({
            x: e.clientX,
            y: e.clientY,
          })[0];
          rangeRef =
            overComp && overComp.key === "y-axis" ? "rangeY" : "rangeX";

          // Fetch the range component instance and trigger the start event
          this.chart
            .component(rangeRef)
            .emit("rangeStart", mouseEventToRangeEvent(e));
        },
        mousemove: function (e) {
          this.chart
            .component(rangeRef)
            .emit("rangeMove", mouseEventToRangeEvent(e));
        },
        mouseup: function (e) {
          this.chart
            .component(rangeRef)
            .emit("rangeEnd", mouseEventToRangeEvent(e));
        },
      },
    },
  ];
};

// defining components
const bar = {
  key: "b",
  type: "box",
  data: {
    extract: {
      field: "Product",
      props: {
        end: { field: "Sales", reduce: "max" },
        start: 0,
      },
    },
  },
  settings: {
    major: { scale: "p" },
    minor: { scale: "s" },
  },
  brush: {
    consume: [
      {
        context: "range-example", // We'll later use this reference in the brush-range defintion
        style: {
          inactive: {
            opacity: 0.3,
          },
        },
      },
    ],
  },
};

const brushRangeY = {
  key: "rangeY", // We'll use this reference when setting up our interaction events
  type: "brush-range",
  settings: {
    brush: "range-example",
    direction: "vertical",
    scale: "s",
    target: {
      component: "y-axis", // Use the y-axis as our target and interaction trigger
    },
    bubbles: {
      align: "end",
    },
  },
};

const brushRangeX = {
  key: "rangeX", // We'll use this reference when setting up our interaction events
  type: "brush-range",
  settings: {
    brush: "range-example",
    direction: "horizontal",
    scale: "p",
    target: {
      component: "x-axis", // Use the x-axis as our target and interaction trigger
    },
    bubbles: {
      align: "start",
    },
  },
};

export const components = [
  {
    key: "y-axis",
    type: "axis",
    scale: "s",
    dock: "left",
  },
  {
    key: "x-axis",
    type: "axis",
    scale: "p",
    dock: "bottom",
  },
  {
    type: "text",
    text: "Sales",
    dock: "left",
  },
  {
    type: "text",
    text: "Product",
    dock: "bottom",
  },
  bar,
  brushRangeY,
  brushRangeX,
];
