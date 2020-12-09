import { readText } from '../helpers/readText.ts';

const preamble = 25;

const isValid = (index: number, numbers: number[]): boolean => {
  const value = numbers[index];

  return numbers.slice(index - preamble, index).some((x, outerIndex) => {
    return numbers.slice(index - preamble, index).some((y, innerIndex) => {
      return (outerIndex !== innerIndex && x + y  === value);
    })
  });
};

const findFirstInvalidNumber = (numbers: number[]) => {
  return numbers.slice(preamble, numbers.length).find((_, index) => !isValid(index + preamble, numbers));
};

const run = async () => {
  const items = await readText("src/day9/data.txt");

  const numbers = items.map((item: string) => parseInt(item, 10));
  
  return findFirstInvalidNumber(numbers);
};

export default run;