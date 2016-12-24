import { red, yellow, blue, gray, white } from 'chalk';
import fecha from 'fecha';

const timestamp = () => fecha.format(Date.now(), 'D/M/YYYY HH:mm:ss');

const withTimestamp = (msg) => {
  return `${gray(timestamp())} ${msg}`;
}

export const error = (msg) => {
  console.log(withTimestamp(red('[Error]') + ' ' + white(msg)));
}

export const log = (msg) => {
  console.log(withTimestamp(blue('[Info]') + ' ' + white(msg)));
}

export const warn = (msg) => {
  console.log(withTimestamp(yellow('[Warning]') + ' ' + white(msg)));
}
