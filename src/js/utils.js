// @flow

const classNames = function classNames(classObj) {
  let resultString = [];

  Object.keys(classObj).forEach(key => {
    if (classObj[key] === true) {
      resultString = resultString.concat(key);
    }
  });
  return resultString.join(' ');
};

export default classNames;
