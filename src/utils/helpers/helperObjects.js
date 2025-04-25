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

  // Handle arrays element-wise
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    const diffs = [];

    for (let i = 0; i < obj2.length; i++) {
      const val1 = obj1[i];
      const val2 = obj2[i];

      const currentPath = [...path, i];

      // Smart override for project.attachments
      if (isAttachmentsPath(currentPath)) {
        diffs[i] = { attachments: val2.attachments };
        continue;
      }

      const diff = deepDiff(val1, val2, currentPath);
      if (diff !== undefined) {
        diffs[i] = diff;
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
    const currentPath = [...path, key];

    if (!obj2.hasOwnProperty(key)) {
      diff[key] = undefined;
    } else {
      // Special-case for individual project attachments
      if (isAttachmentsPath(currentPath)) {
        diff[key] = value2; // override attachments
      } else {
        const difference = deepDiff(value1, value2, currentPath);
        if (difference !== undefined) {
          diff[key] = difference;
        }
      }
    }
  }

  return Object.keys(diff).length > 0 ? diff : undefined;
}

// Determines if the current path is like ["projects", 0, "attachments"]
const isAttachmentsPath = (path) => {
  return path.length === 3 && path[0] === 'projects' && typeof path[1] === 'number' && path[2] === 'attachments';
}

export default {
  deepDiff,
  deepDiffRoles
}