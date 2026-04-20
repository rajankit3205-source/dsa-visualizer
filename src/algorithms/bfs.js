export function bfs(grid, startNode, endNode) {
  const visitedNodes = [];
  const queue = [];

  startNode.isVisited = true;
  queue.push(startNode);

  while (queue.length) {
    const current = queue.shift();
    visitedNodes.push(current);

    if (current === endNode) return visitedNodes;

    const neighbors = getNeighbors(current, grid);

    for (let neighbor of neighbors) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.isVisited = true;
        neighbor.previousNode = current;
        queue.push(neighbor);
      }
    }
  }

  return visitedNodes;
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);     
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); 
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); 
  if (col > 0) neighbors.push(grid[row][col - 1]);     

  return neighbors;
}