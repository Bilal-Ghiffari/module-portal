import _ from 'lodash';

// Utility untuk Membersihkan Payload
// export function cleanPayload(payload) {
//   return Object.entries(payload).reduce((acc, [key, value]) => {
//     // Hapus string kosong, null, undefined
//     if (value !== '' && value !== null && value !== undefined) {
//       acc[key] = value;
//     }
//     return acc;
//   }, {});
// }

export function cleanPayloadLodash(payload) {
  return _.omitBy(
    payload,
    (value) => value === '' || value === null || value === undefined
  );
}

export function cleanPayload(payload) {
  return Object.fromEntries(
    Object.entries(payload).filter(
      ([_, value]) => value !== '' && value !== null && value !== undefined
    )
  );
}

// Versi dengan Opsi Kustom
export function cleanPayloadAdvanced(payload, options = {}) {
  const {
    removeEmptyStrings = true,
    removeNull = true,
    removeUndefined = true,
    removeEmptyArrays = true,
    removeEmptyObjects = true,
  } = options;

  return Object.entries(payload).reduce((acc, [key, value]) => {
    let shouldRemove = false;

    if (removeEmptyStrings && value === '') shouldRemove = true;
    if (removeNull && value === null) shouldRemove = true;
    if (removeUndefined && value === undefined) shouldRemove = true;

    if (removeEmptyArrays && Array.isArray(value) && value.length === 0)
      shouldRemove = true;

    if (
      removeEmptyObjects &&
      typeof value === 'object' &&
      value !== null &&
      Object.keys(value).length === 0
    )
      shouldRemove = true;

    if (!shouldRemove) {
      acc[key] = value;
    }

    return acc;
  }, {});
}
