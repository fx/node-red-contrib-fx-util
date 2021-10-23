const lodash = require("lodash");
const { sum } = lodash;

module.exports = function (RED) {
  function AverageNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    const context = node.context();

    node.status({
      fill: "grey",
      shape: "dot",
      text: "?",
    });

    node.on("input", async (msg) => {
      const { topic, payload } = msg;
      if (!topic || topic == "") return;

      const values = {
        [topic]: payload,
        ...context.get("values"),
      };
      context.set("values", values);

      const average = sum(Object.values(values)) / Object.keys(values).length;

      node.status({
        fill: "grey",
        shape: "dot",
        text: `⌀ ${average}`,
      });
      node.send({ payload: average });
    });
  }

  RED.nodes.registerType("average", AverageNode);
};
