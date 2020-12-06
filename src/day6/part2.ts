import { readText } from "../helpers/readText.ts";

interface Group {
  items: string[];
  groupSize: number;
}

const createGroups = (items: string[]) => {
  const groups = items.reduce(
    (accumulator, item) => {
      if (item === "") {
        accumulator.push({
          items: [],
          groupSize: 0,
        });
      } else {
        const group = accumulator[accumulator.length - 1];
        accumulator[accumulator.length - 1] = {
          items: [...group.items, ...(item.split(""))],
          groupSize: group.groupSize + 1,
        };
      }

      return accumulator;
    },
    [{ items: [], groupSize: 0 }] as Group[]
  );

  return groups;
};

const run = async () => {
  const items = await readText("src/day6/data.txt");

  const answer = createGroups(items).reduce(
    (accumulator, currentValue): number => {
      const groupedAnswers = currentValue.items.reduce((accumulator, currentValue) => {
        (accumulator[currentValue] = accumulator[currentValue] || []).push(
          currentValue
        );
        return accumulator;
      }, {} as Record<string, string[]>);

      return (
        accumulator +
        Object.entries(groupedAnswers).reduce((a, [_, answerGroup]) => {
          if (answerGroup.length === currentValue.groupSize) {
            return a + 1;
          }
          return a;
        }, 0)
      );;
    },
    0
  );

  console.log("answer: ", answer);
};

export default run;
