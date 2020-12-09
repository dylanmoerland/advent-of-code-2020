import { readText } from "../helpers/readText.ts";

interface Instruction {
  type: "nop" | "acc" | "jmp";
  amount: number;
}

const derriveInstructionFromLine = (line: string): Instruction => {
  const [type, amount] = line.split(" ");

  return {
    type: type as "nop" | "acc" | "jmp",
    amount: parseInt(amount, 10),
  };
};

let answer = 0;
let done = false;
let processedIndexes = [] as number[];

const handleInstruction = (index: number, instructions: Instruction[]) => {
  if (processedIndexes.includes(index)) return;

  try {
    processedIndexes.push(index);
  
    const instruction = instructions[index];
  
    switch (instruction.type) {
      case "acc":
        answer += instruction.amount;
        handleInstruction(index + 1, instructions);
        break;
      case "jmp":
        handleInstruction(index + instruction.amount, instructions);
        break;
      case "nop":
        handleInstruction(index + 1, instructions);
        break;
      default:
        break;
    }
  } catch {
    done = true;
  }
};

const attempt = (instructions: Instruction[]) => {
  answer = 0;
  processedIndexes = [] as number[];

  handleInstruction(0, instructions);

  return processedIndexes.includes(instructions.length - 1);
};

const repair = (instructions: Instruction[]) => {
  const indexesOfNopsAndJmps = instructions.reduce((acc, crr, index) => {
    if (crr.type !== 'acc') return [...acc, index];
    return acc;
  }, [] as number[]);

  indexesOfNopsAndJmps.reduce((acc, crr) => {
    if (done) return acc; // not really proud of this...
  
    const instruction = instructions[crr];

    const newInstructions = [...instructions];

    newInstructions[crr] = instruction.type === 'jmp'
      ? { type: 'nop', amount: instruction.amount }
      : { type: 'jmp', amount: instruction.amount }

    if (attempt(newInstructions)) {
      return answer;
    }
    return acc;
  }, 0)
};

const run = async () => {
  const items = await readText("src/day8/data.txt");

  const instructions = items.map(derriveInstructionFromLine);

  repair(instructions);

  return answer;
};

export default run;
