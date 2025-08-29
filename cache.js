const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 });

async function cachedResolve(key, resolver) {
  if (cache.has(key)) return cache.get(key);
  const result = await resolver();
  cache.set(key, result);
  return result;
}

module.exports = cachedResolve;
