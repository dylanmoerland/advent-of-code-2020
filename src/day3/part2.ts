import { readText } from "../helpers/readText.ts";

const calculate = (...args: number[]) => {
  return args.reduce(
    (accumulator, currentValue) => accumulator * currentValue,
    1
  );
};

interface Step {
  step: -1 | 1;
  direction: "x" | "y";
  amount: number;
}

const createMap = (lines: string[], size: number) => {
  return lines.map((line) => {
    const arr = new Array(size).fill(line);

    return arr.join('').replaceAll(",", "").split("");
  });
};

const countTreesAlongTheWay = (map: string[][], steps: Step[]) => {
  const pos = { x: 0, y: 0 };
  let amountOfTrees = 0;

  const move = () => {
    steps.forEach((step) => {
      if (step.direction === "x") {
        pos.x = pos.x + step.amount * step.step;
      }
      if (step.direction === "y") {
        pos.y = pos.y + step.amount * step.step;
      }
    });
  };

  while (pos.y < map.length - 1) {
    move();

    if (map[pos.y][pos.x] === "#") {
      amountOfTrees++;
    }
  }

  return amountOfTrees;
};

const trail1: Step[] = [
  {
    step: 1,
    direction: "x",
    amount: 1,
  },
  {
    step: 1,
    direction: "y",
    amount: 1,
  },
];

const trail2: Step[] = [
  {
    step: 1,
    direction: "x",
    amount: 3,
  },
  {
    step: 1,
    direction: "y",
    amount: 1,
  },
];

const trail3: Step[] = [
  {
    step: 1,
    direction: "x",
    amount: 5,
  },
  {
    step: 1,
    direction: "y",
    amount: 1,
  },
];

const trail4: Step[] = [
  {
    step: 1,
    direction: "x",
    amount: 7,
  },
  {
    step: 1,
    direction: "y",
    amount: 1,
  },
];

const trail5: Step[] = [
  {
    step: 1,
    direction: "x",
    amount: 1,
  },
  {
    step: 1,
    direction: "y",
    amount: 2,
  },
];

const run = async () => {
  const items = await readText("src/day3/data.txt");

  const map = createMap(items, 8000);

  const treesTrail1 = countTreesAlongTheWay(map, trail1);
  const treesTrail2 = countTreesAlongTheWay(map, trail2);
  const treesTrail3 = countTreesAlongTheWay(map, trail3);
  const treesTrail4 = countTreesAlongTheWay(map, trail4);
  const treesTrail5 = countTreesAlongTheWay(map, trail5);

  return calculate(
    treesTrail1,
    treesTrail2,
    treesTrail3,
    treesTrail4,
    treesTrail5
  );
};

export default run;
