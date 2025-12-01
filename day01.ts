interface Rotation {
  direction: "L" | "R";
  steps: number;
}

function parseInput(input: string): Rotation[] {
  const lines = input.split("\n");
  const regex = /(L|R)(\d+)/;
  return lines.map((line) => {
    const match = line.match(regex);
    if (!match) {
      throw new Error(`Invalid line: ${line}`);
    }
    return {
      direction: match[1] as Rotation["direction"],
      steps: parseInt(match[2]),
    } as Rotation;
  });
}

function part1(input: Rotation[]): number {
  let countOfZeros = 0;
  let currentStep = 50;
  for (const rotation of input) {
    if (rotation.direction === "L") {
      currentStep = currentStep - rotation.steps;
      currentStep = ((currentStep % 100) + 100) % 100;
    } else {
      currentStep = (currentStep + rotation.steps) % 100;
    }

    if (currentStep === 0) {
      countOfZeros++;
    }
  }
  return countOfZeros;
}

function part2(input: Rotation[]): number {
  let countOfZeros = 0;
  let currentStep = 50;
  for (const rotation of input) {
    const tempCurrentStep = currentStep;
    if (rotation.direction === "L") {
      currentStep = currentStep - rotation.steps;
      const end = currentStep;
      currentStep = ((currentStep % 100) + 100) % 100;
      countOfZeros += Math.ceil(tempCurrentStep / 100) - Math.ceil(end / 100);
    } else {
      currentStep = (currentStep + rotation.steps) % 100;
      const nonModdedCurrentStep = tempCurrentStep + rotation.steps;
      const countOfTimesPassedZero = Math.trunc(nonModdedCurrentStep / 100);
      if (countOfTimesPassedZero > 0) {
        countOfZeros += countOfTimesPassedZero;
      }
    }
  }
  return countOfZeros;
}

const input = parseInput(Deno.readTextFileSync("day01.txt"));
console.log(part1(input));
console.log(part2(input));
