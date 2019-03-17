// @flow
import * as React from 'react';

type Ref = { current: React.ElementRef<any> | null };

type Copy = {
  [string]: string,
};

type KeyCodes = {
  [string]: number,
};

type TodoStored = {|
  id: string,
  done: boolean,
  value: string,
|};

type Todo = {|
  id: string,
  done: boolean,
  ref: Ref,
  reserved?: true,
  value: string,
|};

export type { Copy, KeyCodes, TodoStored, Todo };
