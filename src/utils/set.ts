type Indexed<T = unknown> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  // eslint-disable-next-line no-restricted-syntax
  for (const p in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(p)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    try {
      if ((rhs[p] as any).constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path должен быть строкой');
  }

  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const keys = path.split('.');
  const obj = keys.reduceRight((acc, current) => ({ [current]: acc }), value);
  return merge(object as Indexed, obj as Indexed);
}

export default set;
