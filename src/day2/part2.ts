import { readText } from '../helpers/readText.ts';

interface Policy {
  min: number;
  max: number;
  letter: string;
}

const derivePolicyFromString = (policyString: string): Policy => {
  const split = policyString.split(' ');
  const numbers = split[0].split('-');

  return {
    min: parseInt(numbers[0], 10),
    max: parseInt(numbers[1], 10),
    letter: split[1],
  };
};

const validateEntry = (policy: Policy, password: string) => {
  const letters = password.split('');

  const validA = letters[policy.min] === policy.letter;
  const validB = letters[policy.max] === policy.letter;

  return (validA || validB) && !(validA && validB);
}

const run = async () => {
  const items = await readText("src/day2/data.txt");
  
  const answer = items.reduce((accumulator, currrentValue) => {
    const args = currrentValue.split(':');
    if (validateEntry(derivePolicyFromString(args[0]), args[1])) {
      return accumulator + 1;
    }
    return accumulator;
  }, 0);

  console.log('answer: ', answer);
};

export default run;