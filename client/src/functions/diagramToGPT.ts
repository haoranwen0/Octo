import type { Node, Edge } from 'reactflow'

interface Component {
  name: string
  children: string[]
}

function parseGraphToJSON(nodes: Node[], edges: Edge[]): Component[] {
  const json: Component[] = []
  nodes.forEach((node, index) => {
    const filteredEdges: Edge[] = edges.filter(
      (edge) => edge.source === node.id
    )
    const children: string[] = nodes
      .filter((node) =>
        filteredEdges.some((filteredEdge) => filteredEdge.target === node.id)
      )
      .map((node) => node.data.label)
    json.push({ name: node.data.label, children: children })
  })
  return json
}

export default parseGraphToJSON
