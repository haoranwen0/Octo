import type { Node } from 'reactflow'

import type { NodeData } from '../types'

const initialNodes: Array<Node<NodeData>> = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    type: 'CustomNode',
    data: {
      label: 'AWS DynamoDB',
      icon: 'https://static-00.iconduck.com/assets.00/aws-dynamodb-icon-454x512-53ebjxww.png',
      typography: {
        font: 'arial',
        fontSize: 16
      }
    }
  },
  {
    id: '2',
    position: { x: 0, y: 100 },
    type: 'CustomNode',
    data: {
      label: 'AWS S3',
      icon: 'https://static-00.iconduck.com/assets.00/aws-s3-simple-storage-service-icon-423x512-sofvbo3x.png',
      typography: {
        font: 'arial',
        fontSize: 16
      }
    }
  },
  {
    id: '3',
    position: { x: 0, y: 10 },
    type: 'TextNode',
    data: {
      label: '',
      typography: {
        font: 'arial',
        fontSize: 16
      }
    }
  },
  {
    id: '4',
    position: { x: 0, y: 10 },
    type: 'ShapeNode',
    data: {
      label: '',
      shape: 'square',
      typography: {
        font: 'arial',
        fontSize: 16
      }
    }
  }
]

export { initialNodes }
