import _isEqual from 'lodash/isEqual'
import _isObject from 'lodash/isObject'

// =====================================
/* OBJECT HELPERS */
// =====================================

const deepDiff = (obj1, obj2) => {
  if (_isEqual(obj1, obj2)) return undefined;

  if (!_isObject(obj1) || !_isObject(obj2)) return obj2;

  // Handle arrays element-wise
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    const diffs = [];

    for (let i = 0; i < obj2.length; i++) {
      const val2 = obj2[i];
      const val1 = obj1[i];

      const diff = deepDiff(val1, val2);
      if (diff !== undefined) {
        diffs.push(diff);
      }
    }

    return diffs.length > 0 ? diffs : undefined;
  }

  // Handle objects
  const diff = {};
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of allKeys) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!obj2.hasOwnProperty(key)) {
      diff[key] = undefined;
    } else {
      const difference = deepDiff(value1, value2);
      if (difference !== undefined) {
        diff[key] = difference;
      }
    }
  }

  return Object.keys(diff).length > 0 ? diff : undefined;
}

/* function _isObject(val) {
  return val !== null && typeof val === 'object';
} */

/* const deepDiff = (obj1, obj2) =>{
  if (_isEqual(obj1, obj2)) return undefined;

  if (!_isObject(obj1) || !_isObject(obj2)) return obj2;

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length || !obj1.every((val, i) => _isEqual(val, obj2[i]))) {
      return obj2; // replace the array if it’s different
    }
    return undefined;
  }

  const diff = {};
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of allKeys) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!obj2.hasOwnProperty(key)) {
      diff[key] = undefined; // key was removed
    } else {
      const difference = deepDiff(value1, value2);
      if (difference !== undefined) {
        diff[key] = difference;
      }
    }
  }

  return Object.keys(diff).length > 0 ? diff : undefined;
} */

export default {
  deepDiff
}