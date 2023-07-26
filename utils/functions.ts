export const calculateMaxRouteValue = (triangle: number[][]) => {
  // Clone the triangle array so we don't mutate the original
  let paths = JSON.parse(JSON.stringify(triangle));

  // Do a bottom up approach to calculate the values easier rather than top down
  for (let rowIndex = paths.length - 2; rowIndex >= 0; rowIndex--) {
    for (let columnIndex = 0; columnIndex <= rowIndex; columnIndex++) {
      // Update the current node's value to be the current value plus
      // the maximum of the two possible paths to this node
      paths[rowIndex][columnIndex] += Math.max(
        paths[rowIndex + 1][columnIndex],
        paths[rowIndex + 1][columnIndex + 1],
      );
    }
  }

  // The maximum path's value will now be at the top of the triangle
  let maxTotal = paths[0][0];

  // Trace the path to find the maximum path
  let columnIndex = 0;
  let values = [triangle[0][0]];
  let path = [0];
  for (let rowIndex = 1; rowIndex < triangle.length; rowIndex++) {
    // Choose the path that leads to the maximum total
    if (triangle[rowIndex][columnIndex] < triangle[rowIndex][columnIndex + 1]) {
      columnIndex++;
    }
    path.push(columnIndex);
    values.push(triangle[rowIndex][columnIndex]);
  }

  // Return the maximum total and the path
  return { maxTotal, values, path };
};

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
