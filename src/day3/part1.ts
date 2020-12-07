import { readText } from "../helpers/readText.ts";

interface Step {
  step: -1 | 1;
  direction: 'x' | 'y';
  amount: number;
}

const steps: Step[] = [
 {
   step: 1,
   direction: 'x',
   amount: 3,
 },
 {
   step: 1,
   direction: 'y',
   amount: 1,
 }
];

const createMap = (lines: string[], size: number) => {
  return lines.map((line) => {
    const arr = new Array(size).fill(line);

    return arr.join().replaceAll(',', '').split('');
  });
};

const countTreesAlongTheWay = (map: string[][]) => {
  const pos = { x: 0, y: 0 };
  let amountOfTrees = 0;

  const move = () => {
    steps.forEach((step) => {
      if (step.direction === 'x') {
        pos.x = pos.x + (step.amount * step.step);
      }
      if (step.direction === "y") {
        pos.y = pos.y + (step.amount * step.step);
      }
    })
  };

  while (pos.y < map.length - 1) {
    move();

    if (map[pos.y][pos.x] === '#') {
      amountOfTrees++;
    }
  }

  return amountOfTrees;
};

const run = async () => {
  const items = await readText("src/day3/data.txt");

  const map = createMap(items, 8000);
  
  return countTreesAlongTheWay(map);
};

export default run;
