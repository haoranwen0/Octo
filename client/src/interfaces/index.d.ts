export interface GenericService {
  label: string
  icon: string
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}
