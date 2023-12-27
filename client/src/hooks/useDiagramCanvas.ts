// Package imports
import { useCallback } from 'react'
import {
  useNodesState,
  useEdgesState,
  Edge,
  OnConnect,
  Connection,
  addEdge,
} from 'reactflow'

// Project imports
import { initialNodes } from '../data/mock-nodes'

export default function useDiagramCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([])

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges]
  )

  return {
    nodes,
    setNodes,
    onNodesChange,

    edges,
    setEdges,
    onEdgesChange,

    onConnect,
  }
}
