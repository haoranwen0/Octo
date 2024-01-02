import { type Node } from 'reactflow'

import { Shape } from '../types'

export interface NodeData {
  label: string
  icon?: string
  shape?: Shape
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface Nodes extends Array<Node<NodeData, string | undefined>> {}
