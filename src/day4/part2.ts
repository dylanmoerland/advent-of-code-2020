import { readText } from "../helpers/readText.ts";

const PASSPORT_FIELDS = [
  {
    key: "byr",
    validate: (value: string) => {
      if (value.length !== 4) return false;

      const number = parseInt(value, 10);

      return number >= 1920 && number <= 2002;
    },
    required: true,
  },
  {
    key: "iyr",
    validate: (value: string) => {
      if (value.length !== 4) return false;

      const number = parseInt(value, 10);

      return number >= 2010 && number <= 2020;
    },
    required: true,
  },
  {
    key: "eyr",
    validate: (value: string) => {
      if (value.length !== 4) return false;

      const number = parseInt(value, 10);

      return number >= 2020 && number <= 2030;
    },
    required: true,
  },
  {
    key: "hgt",
    validate: (value: string) => {

      if (!/(.*[0-9])(cm|in)/g.test(value)) return false;

      if (value.split("cm").length > 1) {
        const size = parseInt(value.split("cm")[0], 10);

        return size >= 150 && size <= 193;
      }
      if (value.split("in").length > 1) {
        const size = parseInt(value.split("in")[0], 10);

        return size >= 59 && size <= 76;
      }
    },
    required: true,
  },
  {
    key: "hcl",
    validate: (value: string) => {
      return /#([a-f0-9]{6})$/g.test(value);
    },
    required: true,
  },
  {
    key: "ecl",
    validate: (value: string) => {
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some(
        (color) => color === value
      );
    },
    required: true,
  },
  {
    key: "pid",
    validate: (value: string) => {
      if (!/^[0-9]*$/g.test(value)) return false;

      return value.length === 9;
    },
    required: true,
  },
];

type Passport = Record<string, string>;

const derivePassportsFromLines = (lines: string[]): Passport[] => {
  return lines.reduce(
    (accumulator, currentValue) => {
      if (!currentValue) {
        accumulator.push({});
      } else {
        const entries = currentValue.split(" ");
        entries.forEach((entry) => {
          const values = entry.split(":");

          accumulator[accumulator.length - 1][values[0]] = values[1];
        });
      }
      return accumulator;
    },
    [{} as Passport]
  );
};

const validatePassport = (passport: Passport): boolean => {
  return PASSPORT_FIELDS.every((field) => {
    if (!field.required) return true;

    if (!Object.keys(passport).includes(field.key)) return false;

    return field.validate(passport[field.key]);
  });
};

const run = async () => {
  const items = await readText("src/day4/data.txt");

  const passports = derivePassportsFromLines(items);

  const answer = passports.reduce((total, passport) => {
    if (validatePassport(passport)) {
      return total + 1;
    }
    return total;
  }, 0);

  console.log("answer: ", answer);
};

export default run;
