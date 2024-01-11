import type { Node, Edge } from 'reactflow'

export type Component =
  | 'aws-database'
  | 'server'
  | 'user'
  | 'load-balancer'
  | 'frontend'
  | 'database'
  | 'aws-lambda'
  | 'aws-api-gateway'
  | 'stripe-payment-api'
  | 'default'

export type Shape = 'rectangle' | 'circle' | 'square'

export type Font = 'times-new-roman' | 'arial'

export type NodeData = {
  label: string
  icon?: string
  shape?: Shape
}

export type Message = {
  role: 'user' | 'assistant' | 'octo'
  content: string
}

export type Canvas = {
  nodes: Node[]
  edges: Edge[]
}

export type JSONComponent = {
  name: string
  children: string[]
}

export type GPTJSON = {
  components: JSONComponent[]
}

export interface Nodes extends Array<Node<NodeData, string | undefined>> {}
