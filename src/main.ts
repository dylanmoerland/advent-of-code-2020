import { log } from "./log.ts";
import day1part1 from './day1/part1.ts';
import day1part2 from './day1/part2.ts';
import day2part1 from './day2/part1.ts';
import day2part2 from './day2/part2.ts';
import day3part1 from './day3/part1.ts';
import day3part2 from './day3/part2.ts';
import day4part1 from './day4/part1.ts';
import day4part2 from './day4/part2.ts';
import day5part1 from './day5/part1.ts';
import day5part2 from './day5/part2.ts';
import day6part1 from './day6/part1.ts';
import day6part2 from './day6/part2.ts';
import day7part1 from './day7/part1.ts';
import day7part2 from './day7/part2.ts';
import day8part1 from './day8/part1.ts';
import day8part2 from './day8/part2.ts';

const main = async () => {
  const start = performance.now();

  log.info(`***********************************`);
  log.info("Starting your Deno App");
  log.info(`Answer: ${await day8part1()}`);
  log.info(`Execution time: ${performance.now() - start}ms`);
  log.info(`***********************************`);
};

export default main;
