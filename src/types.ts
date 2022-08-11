export type AnyObject = {
  [key: string | number]: any;
};

export type Primitive =
  | string
  | boolean
  | number
  | BigInt
  | null
  | undefined
  | symbol;
