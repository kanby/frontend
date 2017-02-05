import color from 'color';

export const darken = (col: string, amount: number) =>
  color(col).darken(amount);

export const lighten = (col: string, amount: number) =>
  color(col).lighten(amount);
