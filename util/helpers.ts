function deepMerge<T extends Record<string, any>, U extends Record<string, any>>(obj1: T, obj2: U): T & U {
  const mergedObj: any = {};

  Object.keys(obj1).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      // Check if both properties are objects and not null
      if (typeof obj1[key] === 'object' && obj1[key] !== null && typeof obj2[key] === 'object' && obj2[key] !== null) {

        // mergedObj[key] = deepMerge(obj1[key], obj2[key]);
      } else {
        // If they are not both objects, prefer obj2's value
        mergedObj[key] = obj2[key];
      }
    } else {
      mergedObj[key] = obj1[key];
    }
  });

  Object.keys(obj2).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(mergedObj, key)) {
      mergedObj[key] = obj2[key];
    }
  });

  return mergedObj as T & U;
}
