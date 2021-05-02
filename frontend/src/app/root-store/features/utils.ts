export const createConstants = <T>(
    constants: readonly any[],
    constantType: string,
  ): T =>
    constants.reduce((acc, constant: string) => {
      const prefix = constantType ? `${constantType}/` : '';
      acc[constant] = `${prefix}${constant}`;
      return acc;
    }, {});