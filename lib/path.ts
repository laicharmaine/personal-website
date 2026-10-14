export type Path = (string | number)[];

export function getIn(obj: unknown, path: Path): unknown {
  let cur: unknown = obj;
  for (const key of path) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string | number, unknown>)[key];
  }
  return cur;
}

export function setIn<T>(obj: T, path: Path, value: unknown): T {
  if (path.length === 0) return value as T;
  const [key, ...rest] = path;
  const base = (obj ?? (typeof key === "number" ? [] : {})) as Record<
    string | number,
    unknown
  >;
  const copy = (Array.isArray(base) ? [...base] : { ...base }) as Record<
    string | number,
    unknown
  >;
  copy[key] = setIn(base[key], rest, value);
  return copy as T;
}

export function updateList<T>(
  obj: T,
  path: Path,
  fn: (list: unknown[]) => unknown[],
): T {
  const cur = getIn(obj, path);
  return setIn(obj, path, fn(Array.isArray(cur) ? cur : []));
}
