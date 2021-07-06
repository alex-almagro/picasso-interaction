// defining scales
export const scales = {
  s: {
    data: {
      field: "Sales",
    },
    expand: 0.1,
    invert: true,
  },
  m: {
    data: {
      field: "Margin",
    },
  },
  c: {
    data: {
      field: "Cost",
    },
    expand: 0.1,
  },
};

// defining interactions
export const interactions = [
  {
    type: "native",
    events: {
      mousedown: function (e) {
        // Use Alt-key + click to reset the brush
        if (e.altKey) {
          this.chart.brush("lasso-example").end();
        }

        // Fetch the lasso component instance and trigger the lassoStart event
        this.chart
          .component("lasso")
          .emit("lassoStart", { center: { x: e.clientX, y: e.clientY } });
      },
      mousemove: function (e) {
        this.chart
          .component("lasso")
          .emit("lassoMove", { center: { x: e.clientX, y: e.clientY } });
      },
      mouseup: function (e) {
        this.chart
          .component("lasso")
          .emit("lassoEnd", { center: { x: e.clientX, y: e.clientY } });
      },
    },
  },
];

// defining components
const point = {
  key: "p",
  type: "point",
  data: {
    extract: {
      field: "Product",
      props: {
        y: { field: "Sales" },
        x: { field: "Cost" },
        size: { field: "Margin" },
      },
    },
  },
  settings: {
    x: { scale: "c" },
    y: { scale: "s" },
    shape: "circle",
    size: { scale: "m", ref: "size" },
    strokeWidth: 2,
    stroke: "#fff",
  },
  brush: {
    consume: [
      {
        context: "lasso-example", // We'll later use this reference in the lasso-brush defintion
        style: {
          inactive: {
            opacity: 0.3,
          },
        },
      },
    ],
  },
};

const lasso = {
  key: "lasso", // We'll use this reference when setting up our interaction events
  type: "brush-lasso",
  settings: {
    brush: {
      // Note how the brush property is defined inside the settings objects. This is because for brush in this case is a component specific setting.
      components: [
        {
          key: "p", // We want to brush shapes from the point component
          contexts: ["lasso-example"],
        },
      ],
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
    scale: "c",
    dock: "bottom",
  },
  {
    type: "text",
    text: "Sales",
    dock: "left",
  },
  {
    type: "text",
    text: "Cost",
    dock: "bottom",
  },
  point,
  lasso,
];
