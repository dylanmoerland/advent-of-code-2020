import { readText } from '../helpers/readText.ts';

interface Bag {
  color: string;
  bags?: Bag[];
}

const derriveBagFromLine = (line: string): Bag => {
  const [noun, color] = line.split(" ");
  const fullColor = noun + " " + color;

  const bags = line.slice(line.indexOf("contain") + 8).split(",").map((l) => {
    const [_, noun, color] = l.trim().split(" ");

    return {
      color: noun + " " + color,
    };
  });

  return {
    color: fullColor,
    bags,
  }
};

const hasGoldBag = (color: string, allBags: Bag[]): boolean => {
  const bag = allBags.find((b) => b.color === color);

  if (bag?.bags?.find((b: Bag) => b.color === 'shiny gold')) {
    return true;
  } else {
    return !!bag?.bags?.some((b: Bag) => hasGoldBag(b.color, allBags));
  }
};

const run = async () => {
  const items = await readText("src/day7/data.txt");

  const bags = items.reduce((acc, crr) => {
    return [...acc, derriveBagFromLine(crr)];
  }, [] as Bag[]);

  const answer = bags.reduce((total, currentBag) => {
    if (hasGoldBag(currentBag.color, bags)) {
      return total + 1;
    }
    return total;
  }, 0);

  return answer;
};

export default run;