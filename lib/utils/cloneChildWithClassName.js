import { isValidElement, cloneElement } from 'react';
import classnames from 'classnames';

function cloneChild(child, classNames, key) {
  if (isValidElement(child)) {
    if (!child.props) return cloneElement(child, { key });

    const className = classnames(classNames, child.props);
    return cloneElement(child, { className, key });
  }
  return null;
}

function cloneChildWithClassName(children, className) {
  if (Array.isArray(children)) {
    return children.map((child, key) => cloneChild(child, className, key));
  }
  return cloneChild(children, className);
}

export default cloneChildWithClassName;
