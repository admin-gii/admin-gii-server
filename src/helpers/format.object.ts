export function formatObject(object: any): any {
  const returnObject = {};
  for (const key in object) {
    const splitedKey = key.split('__');
    if (splitedKey.length > 1) {
      if (!returnObject[splitedKey[0]]) {
        returnObject[splitedKey[0]] = {};
      }
      returnObject[splitedKey[0]][splitedKey[1]] = object[key];
    } else {
      returnObject[key] = object[key];
    }
  }

  return returnObject;
}

export function formatArrayObject(array: any): any {
  const returnArray = [];
  for (const object of array) {
    returnArray.push(formatObject(object));
  }

  return returnArray;
}
