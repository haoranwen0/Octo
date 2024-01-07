import type { Node, Edge } from 'reactflow'

import { Shape } from '../types'

export interface NodeData {
  label: string
  icon?: string
  shape?: Shape
}

export interface Message {
  role: 'user' | 'assistant' | 'octo'
  content: string
}

export interface Canvas {
  nodes: Node[]
  edges: Edge[]
}

export interface Component {
  name: string
  children: string[]
}

export interface GPTJSON {
  components: Component[]
}

export interface Nodes extends Array<Node<NodeData, string | undefined>> {}
