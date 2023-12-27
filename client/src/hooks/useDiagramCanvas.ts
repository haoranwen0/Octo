// Package imports
import { useNodesState, useEdgesState, useEdges, Edge } from 'reactflow'

// Project imports
import { initialNodes } from '../data/mock-nodes'

export default function useDiagramCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([])
}
