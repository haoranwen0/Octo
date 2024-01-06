import { type Node, type Edge, MarkerType } from "reactflow";

import type { Component, Canvas } from "../interfaces";

/**
nodes are list of json:
  {
    id: str,
    height: int,
    type: str,
    position: {x: int, y: int},
    width: int,
    data: {label: str, icon: str}
  }

  edges are list of json:
  {
    id: str,
    markerEnd: {type: str, color: str},
    source: str,
    sourceHandle: null,
    style: {strokeWidth: int, stroke: str},
    target: str,
    targetHandle: null,
    type: str
  }
*/

function parseJSONToGraph(
  json: Component[],
  initialNodes: Node[],
  initialEdges: Edge[]
): Canvas {
  const nodes = initialNodes.slice();
  const edges = initialEdges.slice();

  json.forEach((component, index) => {
    const nodeId = `node-${index}`;
    const node: Node = {
      id: nodeId,
      type: "CustomNode",
      position: { x: 0, y: 0 },
      data: { label: component.name, icon: "default-icon" },
    };

    nodes.push(node);
  });

  let i = 0;
  json.forEach((component, index) => {
    const nodeId = `node-${index}`;
    component.children.forEach((child) => {
      const childNode = nodes.find((n) => n.data.label === child);
      if (childNode !== undefined) {
        const edgeId = `edge-${i}-${childNode.id}`;
        i++;
        const edge: Edge = {
          id: edgeId,
          markerEnd: { type: MarkerType.ArrowClosed, color: "black" },
          source: nodeId,
          sourceHandle: null,
          style: { strokeWidth: 3, stroke: "black" },
          target: childNode.id,
          targetHandle: null,
          type: "default",
        };
        edges.push(edge);
      }
    });
  });

  return { nodes, edges };
}

export default parseJSONToGraph;
