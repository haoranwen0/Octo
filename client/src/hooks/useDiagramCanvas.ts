import {
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction
} from 'react'

import { useSelector } from 'react-redux'
import {
  useNodesState,
  useEdgesState,
  addEdge,
  type ReactFlowInstance,
  type OnConnect,
  type Connection,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type ReactFlowJsonObject
} from 'reactflow'
import { useDebounce, useLocalStorage } from 'usehooks-ts'

import { initialNodes } from '../data/mock-nodes'
import type { NodeData, Nodes } from '../interfaces'
import type { IRootState } from '../redux/store'

interface IUseDiagramCanvasParams {
  canvasRef: ReactFlowInstance | null
}

interface IUseDiagramCanvasResult {
  nodes: Nodes
  setNodes: Dispatch<SetStateAction<Nodes>>
  onNodesChange: (changes: NodeChange[]) => void

  edges: Edge[]
  setEdges: Dispatch<SetStateAction<Edge[]>>
  onEdgesChange: (changes: EdgeChange[]) => void

  onConnect: OnConnect
}

export default function useDiagramCanvas(
  params: IUseDiagramCanvasParams
): IUseDiagramCanvasResult {
  const canvas2 = useSelector((store: IRootState) => store.canvas.value)

  const [canvas, setCanvas] = useLocalStorage<string>('canvas', '')
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>(
    canvas !== undefined && canvas !== ''
      ? ((JSON.parse(canvas) as ReactFlowJsonObject).nodes as Nodes)
      : initialNodes
  )
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    canvas !== undefined && canvas !== ''
      ? (JSON.parse(canvas).edges as Edge[])
      : []
  )

  const debouncedCanvas = useDebounce(
    JSON.stringify(params.canvasRef?.toObject()),
    1_000
  )

  useEffect(() => {
    if (canvas2 !== null) {
      setNodes(canvas2.nodes)
      setEdges(canvas2.edges)
    }
  }, [canvas2])

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

    onConnect
  }
}
