import { Node } from 'reactflow'

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    type: 'CustomNode',
    data: {
      label: 'AWS DynamoDB',
      icon: 'https://static-00.iconduck.com/assets.00/aws-dynamodb-icon-454x512-53ebjxww.png',
    },
  },
  {
    id: '2',
    position: { x: 0, y: 100 },
    type: 'CustomNode',
    data: {
      label: 'AWS S3',
      icon: 'https://static-00.iconduck.com/assets.00/aws-s3-simple-storage-service-icon-423x512-sofvbo3x.png',
    },
  },
  {
    id: '3',
    position: { x: 0, y: 10 },
    type: 'TextNode',
    data: {
      label: '',
    },
  },
  {
    id: '4',
    position: { x: 0, y: 10 },
    type: 'ShapeNode',
    data: {
      label: '',
      shape: 'square',
    },
  },
]

export { initialNodes }
