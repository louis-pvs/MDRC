import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf } from 'prop-types';
import classnames from 'classnames';

import omit from '../utils/omit';

class ListGroup extends PureComponent {
  static propTypes = {
    children: oneOfType([node, string, arrayOf(node, string)]),
    className: string,
  };
  static defaultProps = {
    children: null,
    className: null,
  };

  render() {
    const className = classnames('mdc-list-group', this.props.className);
    return (
      <div className={className} {...omit(this.props, Object.keys(ListGroup.propTypes))}>
        {this.props.children}
      </div>
    );
  }
}

export default ListGroup;
