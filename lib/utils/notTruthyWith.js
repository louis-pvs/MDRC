function notTruthyWith(against, props, propName, componentName) {
  const { length } = Object.keys(props).filter(key => against.includes(key) && props[key] === true);

  if (props[propName] && length) {
    return new Error(`props '${propName}' can't be truhty along with '${against}' in ${componentName}`);
  }
  return false;
}

export default notTruthyWith;
