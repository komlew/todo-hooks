// @flow
import type { Copy, KeyCodes } from '../types';

const today: string = new Date().toLocaleDateString();

const copy: Copy = {
  add: 'Add ToDo...',
  done: 'Done',
  doneIcon: '✔',
};

const keyCodes: KeyCodes = {
  enter: 13,
};

const timers: KeyCodes = {
  debounceSave: 500,
};

export { today, copy, keyCodes, timers };
