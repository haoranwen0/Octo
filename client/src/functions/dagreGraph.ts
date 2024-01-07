import dagre from "dagre";
import { type Node, type Edge } from "reactflow";

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: string
): { nodes: Node[]; edges: Edge[] } => {
  const g = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, { ...node, width: 300, height: 100 })
  );

  dagre.layout(g);

  console.log(g);
  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

export default getLayoutedElements;
