import { readText } from '../helpers/readText.ts';

interface Policy {
  min: number;
  max: number;
  letter: string;
}

const derivePolicyFromString = (policyString: string) => {
  const split = policyString.split(' ');
  const numbers = split[0].split('-');

  return {
    min: parseInt(numbers[0], 10),
    max: parseInt(numbers[1], 10),
    letter: split[1],
  };
};

const validateEntry = (policy: Policy, password: string) => {
  const count = password.split('').reduce((acc, crr) => {
    if (crr === policy.letter) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return count >= policy.min && count <= policy.max;
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