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

const deepDiffRoles = (obj1, obj2, path = []) => {
  if (_isEqual(obj1, obj2)) return undefined;

  if (!_isObject(obj1) || !_isObject(obj2)) return obj2;

  // Handle arrays element-wise (for 'projects')
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    const diffs = [];

    for (let i = 0; i < obj2.length; i++) {
      const val1 = obj1[i];
      const val2 = obj2[i];

      const currentPath = [...path, i];

      // 💡 Overwrite project[n].attachments entirely
      if (isAttachmentsPath(currentPath)) {
        const diff = deepDiffRoles(val1, val2, currentPath);
        diffs[i] = {
          ...diff,
          attachments: val2.attachments
        };
        continue;
      }

      const diff = deepDiffRoles(val1, val2, currentPath);
      if (diff !== undefined) {
        diffs[i] = diff;
      }
    }

    return diffs.length > 0 ? diffs : undefined;
  }

  // Handle objects
  const result = {};
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of keys) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    const diff = deepDiffRoles(val1, val2, [...path, key]);
    if (diff !== undefined) {
      result[key] = diff;
    }
  }

  return Object.keys(result).length ? result : undefined;
};

const isAttachmentsBodyPath = (pathArray) => {
  return (
    pathArray.length === 3 &&
    typeof pathArray[0] === 'number' &&
    pathArray[1] === 'attachments' &&
    pathArray[2] === 'body'
  );
};

// Determines if the current path is like ["projects", 0, "attachments"]
const isAttachmentsPath = (pathArray) => {
  return (
    pathArray.length === 2 && // e.g., [0, 'attachments']
    typeof pathArray[0] === 'number' &&
    pathArray[1] === 'attachments'
  )
}

export default {
  deepDiff,
  deepDiffRoles
}