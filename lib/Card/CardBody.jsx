import React, { PureComponent } from 'react';
import { oneOfType, node, string, arrayOf, bool } from 'prop-types';
import classnames from 'classnames';

import './card.scss';
import omit from '../utils/omit';

class CardBody extends PureComponent {
  static propTypes = {
    children: oneOfType([node, string, arrayOf(node, string)]),
    className: string,
    outlined: bool,
  };
  static defaultProps = {
    children: null,
    className: null,
    outlined: false,
  };

  render() {
    const className = classnames(
      'mdc-card',
      {
        'mdc-card--outlined': this.props.outlined,
      },
      this.props.className,
    );
    return (
      <div className={className} {...omit(this.props, Object.keys(CardBody.propTypes))}>
        {this.props.children}
      </div>
    );
  }
}

export default CardBody;
