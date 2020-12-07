import { readText } from "../helpers/readText.ts";

const PASSPORT_FIELDS = [
  {
    key: "byr",
    required: true,
  },
  {
    key: "iyr",
    required: true,
  },
  {
    key: "eyr",
    required: true,
  },
  {
    key: "hgt",
    required: true,
  },
  {
    key: "hcl",
    required: true,
  },
  {
    key: "ecl",
    required: true,
  },
  {
    key: "pid",
    required: true,
  },
  {
    key: "cid",
    required: false,
  },
];

type Passport = Record<string, string>;

const derivePassportsFromLines = (lines: string[]): Passport[] => {
  return lines.reduce((accumulator, currentValue) => {
    if (!currentValue) {
      accumulator.push({});
    } else {
      const entries = currentValue.split(' ');
      entries.forEach((entry) => {
        const values = entry.split(':');

        accumulator[accumulator.length -1][values[0]] = values[1];
      });
    }
    return accumulator;
  }, [{} as Passport]);
};

const validatePassport = (passport: Passport): boolean => {
  return PASSPORT_FIELDS.every((field) => {
    if (!field.required) return true;

    return Object.keys(passport).includes(field.key);
  });
};

const run = async () => {
  const items = await readText("src/day4/data.txt");

  const passports = derivePassportsFromLines(items);

  return passports.reduce((total, passport) => {
    if (validatePassport(passport)) {
      return total + 1;
    }
    return total;
  }, 0);
};

export default run;
