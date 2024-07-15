export type Prettify<Type> = {
  [K in keyof Type]: Type[K];
} & {};
