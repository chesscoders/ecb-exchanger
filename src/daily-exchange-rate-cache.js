const cache = new Map();

const get = (dateKey) => {
  return cache.get(dateKey);
}

const set = (dateKey, value) => {
  cache.set(dateKey, value);
}

const clear = () => {
  cache.clear();
}

const remove = (dateKey) => {
  cache.delete(dateKey);
}

module.exports = {
  get,
  set,
  clear,
  remove,
};
