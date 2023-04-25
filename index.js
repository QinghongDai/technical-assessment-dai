import calculator from './calculator';
import input from './input.json';
import createJsonFile from './createJsonFile';

const output = calculator(input);
console.log(output);

createJsonFile(output)