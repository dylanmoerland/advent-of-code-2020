import { readText } from "../helpers/readText.ts";

const run = async () => {
  const items = await readText("src/day10/data.txt");

  const numbers = items
    .map((item) => parseInt(item, 10))
    .sort((a, b) => b - a);

  const options = numbers.reduce(
    (acc, crr) => {
      if (crr === Math.max(...numbers)) return acc;

      return {
        ...acc,
        [crr]: [crr + 1, crr + 2, crr + 3].reduce((a, c) => {
          if (acc[c]) return a + acc[c];
          return a;
        }, 0),
      };
    },
    { [Math.max(...numbers)]: 1 }
  );

  return options[1] + options[2] + options[3];
};

export default run;
