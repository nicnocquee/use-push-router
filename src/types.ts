export type ArgAdd = { [key: string]: string | string[] };
export type ArgRemove = { [key: string]: string | string[] | undefined };
export type ArgSet = { [key: string]: string | string[] };
type UpdateSearchParamsAdd = Record<'add', ArgAdd>;
type UpdateSearchParamsRemove = Record<'remove', ArgRemove>;
type UpdateSearchParamsSet = Record<'set', ArgSet>;
export type UpdateSearchParamsArgs =
  | UpdateSearchParamsSet
  | UpdateSearchParamsRemove
  | UpdateSearchParamsAdd;
