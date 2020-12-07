import { readText } from "../helpers/readText.ts";

interface Bag {
  color: string;
  bags?: Bag[];
}

const createBags = (line: string): Bag[] => {
  const bags = [];
  const amount = parseInt(line.trim().charAt(0), 10);

  for (let i = 0; i < amount; i++) {
    const [_, noun, color] = line.trim().split(" ");
    bags.push({
      color: noun + " " + color,
    });
  }

  return bags;
};

const derriveBagFromLine = (line: string): Bag => {
  const [noun, color] = line.split(" ");
  const fullColor = noun + " " + color;

  const contentsText = line.slice(line.indexOf("contain") + 8);

  const bags = contentsText.split(",").reduce((acc, crr) => {
    return [...acc, ...createBags(crr)];
  }, [] as Bag[]);

  return {
    color: fullColor,
    bags,
  };
};

const countContents = (b: Bag, allBags: Bag[]): number => {
  const bag = allBags.find((x: Bag) => x.color === b.color);

  return 1 + (bag?.bags?.reduce((total, crr) => {
    return total + countContents(crr, allBags);
  }, 0) || 0);
};

const run = async () => {
  const items = await readText("src/day7/data.txt");

  const bags = items.reduce((acc, crr) => {
    return [...acc, derriveBagFromLine(crr)];
  }, [] as Bag[]);

  const goldBag = bags.find((b: Bag) => b.color === 'shiny gold');

  const answer = goldBag?.bags?.reduce((total, bag) => {
    return total + countContents(bag, bags);
  }, 0);

  console.log("answer: ", answer);
};

export default run;
