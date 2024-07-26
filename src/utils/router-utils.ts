export function removeSearchParam(keyToRemove) {
  return (prev) => {
    const prevParams = Array.from(prev.entries());
    const newParams = {};
    prevParams.forEach((param) => {
      const key = param[0];
      const value = param[1];
      if (key !== keyToRemove) {
        newParams[key] = value;
      }
    });
    return newParams;
  };
}

export function addSearchParam(key, value) {
  return (prev) => {
    const prevParams = Array.from(prev.entries());
    const newParams = {};
    prevParams.forEach((param) => {
      const prevKey = param[0];
      const prevValue = param[1];
      newParams[prevKey] = prevValue;
    });
    newParams[key] = value;
    return newParams;
  };
}
