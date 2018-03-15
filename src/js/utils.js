// @flow

type PassedClassNames = {
  [className: string]: boolean
}

const classNames = function classNames(classObj: PassedClassNames): string {
  let resultString: string[] = [];

  Object.keys(classObj).forEach((key: string) => {
    if (classObj[key] === true) {
      resultString = resultString.concat(key);
    }
  });
  return resultString.join(' ');
};

export default classNames;
