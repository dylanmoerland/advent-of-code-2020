import { readText } from "../helpers/readText.ts";

const findAdapater = (
  jolts: number,
  usedAdapters: number[],
  allAdapters: number[]
): number => {
  return (
    allAdapters
      .filter((a) => !usedAdapters.includes(a))
      .find((x) => {
        return x === jolts + 1 || x === jolts + 2 || x === jolts + 3;
      }) || -1
  );
};

const run = async () => {
  const items = await readText("src/day10/data.txt");

  const numbers = items.map((i) => parseInt(i, 10)).sort((a, b) => a - b);

  const triedAdapters = [0] as number[];

  while (triedAdapters.length <= numbers.length) {
    triedAdapters.push(
      findAdapater(
        triedAdapters[triedAdapters.length - 1],
        triedAdapters,
        numbers
      )
    );
  }

  const usedAdapters = [
    ...triedAdapters,
    triedAdapters[triedAdapters.length - 1] + 3,
  ];

  const jolt1 = usedAdapters.reduce((acc, crr, index) => {
    if (index === 0) return acc;
    if (crr === usedAdapters[index - 1] + 1) return acc + 1;
    return acc;
  }, 0);

  const jolt3 = usedAdapters.reduce((acc, crr, index) => {
    if (index === 0) return acc;
    if (crr === usedAdapters[index - 1] + 3) return acc + 1;
    return acc;
  }, 0);

  return jolt1 * jolt3;
};

export default run;
