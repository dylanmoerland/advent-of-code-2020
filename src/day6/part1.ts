import { readText } from "../helpers/readText.ts";

const createGroups = (items: string[]) => {
  const groups = items.reduce((accumulator, item) => {
    if (item === '') {
      accumulator.push([]);
    } else {
      accumulator[accumulator.length - 1] = Array.from(
        new Set([...accumulator[accumulator.length - 1], ...item.split('')])
      );
    }

    return accumulator;
  }, [[]] as string[][]);

  return groups;
};

const run = async () => {
  const items = await readText("src/day6/data.txt");

  const groups = createGroups(items);

  const answer = groups.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.length;
  }, 0);

  console.log("answer: ", answer);
};

export default run;
