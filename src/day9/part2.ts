import { readText } from "../helpers/readText.ts";

const invalidNumber = 776203571;

const isValidSet = (set: number[]) => {
  return set.reduce((acc, crr) => {
    return acc + crr;
  }, 0) === invalidNumber;
}

const isToBig = (set: number[]) => {
  return set.reduce((acc, crr) => {
    return acc + crr;
  }, 0) > invalidNumber;
}

const findSet = (number: number, numbers: number[]): number[] | undefined => {
  const startIndex = numbers.indexOf(number) + 1;
  const set = [number];

  for(let i = startIndex; i < numbers.length - 1; i++) {
    set.push(numbers[i]);

    if (isToBig(set)) break;

    if (isValidSet(set)) {
      return set;
    }
  }
  return;
}

const run = async () => {
  const items = await readText("src/day9/data.txt");

  const numbers = items.map((item: string) => parseInt(item, 10));

  let answer;

  numbers.forEach((x) => {
    const set = findSet(x, numbers);

    if (set) {
      set.sort((a, b) => a - b);

      answer = set[0] + set[set.length - 1];
    }
  });

  return answer;
};

export default run;
