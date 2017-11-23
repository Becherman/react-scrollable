const classNames = function classNames(classObj) {
    let resultString = [];

    for(let key in classObj) {
        if (classObj[key] === true) {
            resultString = resultString.concat(key)
        }
    }

    return resultString.join(' ');
}

export default classNames;
