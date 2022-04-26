function LRUCache(strArr) {
  // code goes here
  let cache = [];
  for (let i of strArr) {
    if (cache.includes(i)) {
      let index = cache.indexOf(i);
      cache.splice(index, 1);
      cache.push(i);
      if (cache.length > 5) {
        cache.splice(0, 1);
      }
    } else {
      cache.push(i);
      if (cache.length > 5) {
        cache.splice(0, 1);
      }
    }
  }
  return cache.join('-').toString();
}

// keep this function call here
console.log(LRUCache(readline()));
