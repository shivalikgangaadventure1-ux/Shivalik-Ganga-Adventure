type ClassValue = string | number | null | undefined | false | ClassValue[];

function flatten(input: ClassValue[], output: string[]) {
  for (const value of input) {
    if (!value) continue;
    if (Array.isArray(value)) {
      flatten(value, output);
    } else {
      output.push(String(value));
    }
  }
}

export function cn(...inputs: ClassValue[]): string {
  const output: string[] = [];
  flatten(inputs, output);
  return output.join(" ");
}
