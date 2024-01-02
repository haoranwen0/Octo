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
