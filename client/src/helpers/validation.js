import validator from 'validator';

export const isValidSum = num => validator.isDecimal(String(num)); // # what about negative numbers and numbers beginning with 0