import { Node, Edge, MarkerType } from 'reactflow'

interface Component {
  name: string
  children: string[]
}

interface ParsedGraph {
  nodes: Node[]
  edges: Edge[]
}

function parseJSONToGraph(
  json: Component[],
  initialNodes: Node[],
  initialEdges: Edge[]
): { nodes: Node[]; edges: Edge[] } {
  let nodes = initialNodes.slice()
  let edges = initialEdges.slice()

  json.forEach((component, index) => {
    const nodeId = `node-${index}`
    const node: Node = {
      id: nodeId,
      type: 'CustomNode',
      position: { x: index * 150, y: index * 100 },
      data: { label: component.name, icon: 'default-icon' }
    }

    nodes.push(node)
  })

  let i = 0
  json.forEach((component, index) => {
    const nodeId = `node-${index}`
    component.children.forEach((child) => {
      const childNode = nodes.find((n) => n.data.label === child)
      if (childNode) {
        const edgeId = `edge-${i}-${childNode.id}`
        i++
        const edge: Edge = {
          id: edgeId,
          markerEnd: { type: MarkerType.ArrowClosed, color: 'black' },
          source: nodeId,
          sourceHandle: null,
          style: { strokeWidth: 3, stroke: 'black' },
          target: childNode.id,
          targetHandle: null,
          type: 'default'
        }
        edges.push(edge)
      }
    })
  })

  return { nodes, edges }
}

export default parseJSONToGraph
/*
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
