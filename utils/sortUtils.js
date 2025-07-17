function isSortedAscending(arr, key) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1][key] > arr[i][key]) {
      return false;
    }
  }
  return true;
}

module.exports = { isSortedAscending }; 