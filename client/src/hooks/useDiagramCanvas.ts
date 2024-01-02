// Package imports
import { useCallback, useEffect } from 'react'
import { useDebounce, useLocalStorage } from 'usehooks-ts'
import {
  useNodesState,
  useEdgesState,
  Edge,
  OnConnect,
  Connection,
  addEdge,
  ReactFlowInstance,
} from 'reactflow'

// Project imports
import { initialNodes } from '../data/mock-nodes'

type UseDiagramCanvas = {
  canvasRef: ReactFlowInstance | null
}

export default function useDiagramCanvas(params: UseDiagramCanvas) {
  const [canvas, setCanvas] = useLocalStorage<string>('canvas', '')
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(
    canvas ? JSON.parse(canvas).nodes : initialNodes
  )
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(
    canvas ? JSON.parse(canvas).edges : []
  )

  const debouncedCanvas = useDebounce(
    JSON.stringify(params.canvasRef?.toObject()),
    1_000
  )

  useEffect(() => {
    console.log('saving...')
    setCanvas(debouncedCanvas)
  }, [debouncedCanvas])

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      console.log(params)
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
