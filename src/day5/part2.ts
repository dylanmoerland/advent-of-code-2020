import { readText } from "../helpers/readText.ts";

const getUpperHalf = (min: number, max: number) => {
  return [Math.ceil(min + (max - min) / 2), max];
};

const getLowerHalf = (min: number, max: number) => {
  return [min, Math.floor(max - (max - min) / 2)];
};

const getSeatID = (items: ("B" | "F" | "R" | "L")[]): number => {
  const [rowItems, columnItems] = items.reduce(
    (items, value) => {
      if (value === "B" || value === "F") {
        return [[...items[0], value], items[1]];
      } else {
        return [items[0], [...items[1], value]];
      }
    },
    [[], []] as ("B" | "F" | "R" | "L")[][]
  );

  const [row] = rowItems.reduce(
    (row, item) => {
      if (item === "B") return getUpperHalf(row[0], row[1]);
      if (item === "F") return getLowerHalf(row[0], row[1]);
      return row;
    },
    [0, 127] as number[]
  );

  const [column] = columnItems.reduce(
    (col, item) => {
      if (item === "R") return getUpperHalf(col[0], col[1]);
      if (item === "L") return getLowerHalf(col[0], col[1]);
      return col;
    },
    [0, 7] as number[]
  );

  return row * 8 + column;
};

const run = async () => {
  const items = await readText("src/day5/data.txt");

  const allSeats = new Array(894).fill(0).map((_, index) => index + 1);

  const allGivenSeats = items.map((item) =>
    getSeatID(item.split("") as ("B" | "F" | "R" | "L")[])
  );
  
  const filteredSeats = allSeats.filter((id) => !allGivenSeats.includes(id));

  console.log("answer: ", filteredSeats.find((id) => id > 10));
};

export default run;
