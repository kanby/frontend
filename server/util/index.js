import { red, yellow, blue, gray, white } from 'chalk';
import fecha from 'fecha';

const join = (...args) => args.join(' ');

const timestamp = () => fecha.format(Date.now(), 'D/M/YYYY HH:mm:ss');

const withTimestamp = (msg) => join(gray(timestamp()), msg);

export const error = (msg) => console.log(withTimestamp(join(red('[Error]'), white(msg))));
export const log = (msg) => console.log(withTimestamp(join(blue('[Info]'), white(msg))));
export const warn = (msg) => console.log(withTimestamp(join(yellow('[Warning]'), white(msg))));
