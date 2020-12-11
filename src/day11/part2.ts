import { readText } from "../helpers/readText.ts";

type GridItem = "." | "L" | "#";

type Grid = GridItem[][];

type Coord = {
  x: number;
  y: number;
}

type Modifier = 1 | -1 | 0;

const checkForSeat = (coord: Coord, xModifier: Modifier, yModifier: Modifier, grid: Grid): boolean => {
  if (coord.x < 0 || coord.x > grid[0].length - 1 || coord.y < 0 || coord.y > grid.length - 1) return false;
  
  if (grid[coord.y][coord.x] === "L") return false;
    if (grid[coord.y][coord.x] === "#") return true;

  return checkForSeat({ x: coord.x + xModifier, y: coord.y + yModifier }, xModifier, yModifier, grid);
};

const countAdjacent = (x: number, y: number, grid: Grid) => {
  return ([[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]] as Modifier[][]).reduce((acc, modifiers) => {
    if (checkForSeat({ x: x + modifiers[0], y: y + modifiers[1] }, modifiers[0], modifiers[1], grid)) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

const updateGrid = (grid: Grid): Grid => {
  return grid.map((row, y) => {
    return row.map((gridItem, x) => {
      const adjacentSeats = countAdjacent(x, y, grid);
      if (gridItem === "L" && adjacentSeats === 0) return "#";
      if (gridItem === "#" && adjacentSeats >= 5) return "L";
      return gridItem;
    });
  });
};

const isSame = (a: Grid, b: Grid) => {
  return a.every((row, y) => {
    return row.every((item, x) => item === b[y][x]);
  });
};

const run = async () => {
  const items = await readText("src/day11/data.txt");

  let grid: Grid = items.map((item) => item.split("") as GridItem[]);

  while (!isSame(updateGrid(grid), grid)) {
    grid = updateGrid(grid);
  }

  return grid.reduce((acc, crr) => {
    return (
      acc +
      crr.reduce((a, c) => {
        if (c === "#") return a + 1;
        return a;
      }, 0)
    );
  }, 0);
};

export default run;
