// @flow
import * as React from 'react';

type Ref = { current: React.ElementRef<any> | null };

type Copy = {
  [string]: string,
};

type KeyCodes = {
  [string]: number,
};

type Todo = {|
  id: string,
  done: boolean,
  ref: Ref,
  reserved?: true,
  value: string,
|};

export type { Copy, KeyCodes, Todo };
