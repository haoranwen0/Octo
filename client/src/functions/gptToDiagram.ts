import { type Node, type Edge, MarkerType } from "reactflow";

import { componentImageLink } from "../data/component-images";
import type { Component, Canvas } from "../interfaces";
import { type Component as C } from "../types";

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
    const nodeId = `node-${component.name}`;
    const modifiedComponentName = component.name
      .toLowerCase()
      .replace(/\s+/g, "-");
    const node: Node = {
      id: nodeId,
      type: "CustomNode",
      position: { x: 0, y: 0 },
      data: {
        label: component.name,
        icon:
          (modifiedComponentName as C) in componentImageLink
            ? componentImageLink[modifiedComponentName as C]
            : componentImageLink.default,
      },
    };

    nodes.push(node);

    if (component.children.length > 0) {
      component.children.forEach((child) => {
        const childNodeId = `node-${child}`;

        // Check if the nodes list already has a node with the same id
        const isChildNodeExists = nodes.some(
          (existingNode) => existingNode.id === childNodeId
        );

        // If the child node doesn't exist, add it to the nodes list
        if (!isChildNodeExists) {
          const childNode: Node = {
            id: childNodeId,
            type: "CustomNode",
            position: { x: 0, y: 0 }, // You may adjust the position accordingly
            data: { label: child, icon: "default-icon" },
          };

          nodes.push(childNode);
        }
      });
    }
  });

  let i = 0;
  json.forEach((component, index) => {
    const nodeId = `node-${component.name}`;
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
          type: "smoothstep",
        };
        edges.push(edge);
      }
    });
  });

  return { nodes, edges };
}

export default parseJSONToGraph;
