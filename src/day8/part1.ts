import { readText } from '../helpers/readText.ts';

interface Instruction {
  type: 'nop' | 'acc' | 'jmp',
  amount: number;
}

const derriveInstructionFromLine = (line: string): Instruction => {
  const [type, amount] = line.split(" ");

  return {
    type: type as 'nop' | 'acc' | 'jmp',
    amount: parseInt(amount, 10),
  };
};

const handleInstruction = (index: number, instructions: Instruction[], answer: number, processedIndexes: number[]): number => {
  if (processedIndexes.includes(index)) return answer;

  const instruction = instructions[index];

  switch (instruction.type) {
    case 'acc':
      return handleInstruction(index + 1, instructions, answer + instruction.amount, [...processedIndexes, index]);
    case 'jmp':
      return handleInstruction(
        index + instruction.amount,
        instructions,
        answer,
        [...processedIndexes, index]
      );
    case 'nop':
      return handleInstruction(index + 1, instructions, answer, [
        ...processedIndexes,
        index,
      ]);
    default:
      return answer;
  }
};

const run = async () => {
  const items = await readText("src/day8/data.txt");

  const instructions = items.map(derriveInstructionFromLine);
  
  return handleInstruction(0, instructions, 0, []);
};

export default run;