export const isEmptyObject = (
  obj: { [s: string]: unknown } | ArrayLike<unknown>
) => {
  return Object.values(obj).every((value) => value === '');
};
