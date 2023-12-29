export {};
/*
nodes are list of json: 
  {
    id: str, 
    height: int, 
    type: str, 
    position: {x: int, y: int}, 
    width: int, 
    data: {label: str, icon: str} 
  }

  edges are list of json: 
  {
    id: str, 
    markerEnd: {type: str, color: str}, 
    source: str, 
    sourceHandle: null, 
    style: {strokeWidth: int, stroke: str}, 
    target: str, 
    targetHandle: null, 
    type: str 
  }
*/