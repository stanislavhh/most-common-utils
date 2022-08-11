/**
 * Validates is correct date or not
 */
export const isDate = (date: any): boolean =>
  date instanceof Date && !isNaN(date.valueOf());

export default isDate;
