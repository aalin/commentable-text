const r = require.context("./", true, /^.+?\/index\.js$/);

const entities = r.keys().reduce((obj, file) => {
  const match = file.match(/^.\/(.*?)\//);

  if (match) {
    return { ...obj, [match[1]]: r(file) };
  }

  return obj;
}, {});

export default entities;
