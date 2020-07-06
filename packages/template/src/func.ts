import camelcase from 'camelcase';

/**
 * @see https://www.npmjs.com/package/camelcase
 * @param input
 * @param firstUppercase
 */
const camel = (input: string | ReadonlyArray<string>, firstUppercase: boolean = false) =>
  camelcase(input, { pascalCase: firstUppercase });

const underline = (word: string, upper: boolean = false) => {
  let result = word.replace(/([A-Z])/g, '_$1');
  result = result.startsWith('_') ? result.substring(1) : result;
  return upper ? result.toUpperCase() : result.toLowerCase();
};

const upper = (word: string) => word.toLocaleUpperCase();

const lower = (word: string) => word.toLocaleLowerCase();

const style = camelStyle => camelStyle.replace(/([A-Z])/g, '-$1').toLowerCase();

const func: Record<string, Function> = {
  camel,
  underline,
  upper,
  lower,
};

export default func;
