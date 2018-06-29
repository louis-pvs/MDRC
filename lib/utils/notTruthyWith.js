function notTruthyWith(against, props, propName, componentName) {
  const { length } = Object.keys(props).filter((key) => {
    const { [key]: propsKey } = props;
    return against.includes(key) && propsKey === true;
  });

  if (props[propName] && length) {
    return new Error(
      `props '${propName}' can't be truhty along with '${against}' in ${componentName}`,
    );
  }
  return false;
}

export default notTruthyWith;
