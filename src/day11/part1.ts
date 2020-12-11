import { readText } from "../helpers/readText.ts";

type GridItem = '.' | 'L' | '#';

type Grid = GridItem[][];

const countAdjacent = (x: number, y: number, item: GridItem, grid: Grid) => {
  const coords = [
    {
      x: x - 1,
      y: y - 1,
    },
    {
      x,
      y: y - 1,
    },
    {
      x: x + 1,
      y: y - 1,
    },
    {
      x: x - 1,
      y,
    },
    {
      x: x + 1,
      y,
    },
    {
      x: x - 1,
      y: y + 1,
    },
    {
      x,
      y: y + 1,
    },
    {
      x: x + 1,
      y: y + 1
    }
  ];
  return coords.reduce((acc, coordinate) => {
    if (coordinate.x < 0 || coordinate.y < 0 || coordinate.y >= grid.length || coordinate.x >= grid[0].length) return acc;

    if (grid[coordinate.y][coordinate.x] === item) return acc + 1;

    return acc;
  }, 0);
};

const updateGrid = (grid: Grid): Grid => {
  return grid.map((row, y) => {
    return row.map((gridItem, x) => {
      if (gridItem === 'L' && countAdjacent(x, y, '#', grid) === 0) return '#';
      if (gridItem === '#' && countAdjacent(x, y, '#', grid)  >= 4) return 'L';
      return gridItem;
    });
  })
};

const isSame = (a: Grid, b: Grid) => {
  return a.every((row, y) => {
    return row.every((item, x) => item === b[y][x]);
  })
};

const run = async () => {
  const items = await readText("src/day11/data.txt");

  let grid: Grid = items.map((item) => item.split("") as GridItem[]);

  while(!isSame(updateGrid(grid), grid)) {
    grid = updateGrid(grid);
  };

  return grid.reduce((acc, crr) => {
    return acc + crr.reduce((a, c) => {
      if (c === '#') return a + 1;
      return a;
    }, 0);
  }, 0);
};

export default run;
