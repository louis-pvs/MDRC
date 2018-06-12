import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BaseFab from './BaseFab';
import { Icon } from '../';

import omit from '../utils/omit';

class Fab extends PureComponent {
  static Base = props => <BaseFab {...omit(props, Object.keys(Fab.propTypes))} />;
  render() {
    return (
      <BaseFab {...omit(this.props, Object.keys(Fab.propTypes))}>
        <Icon className="mdc-fab__icon" iconName={this.props.iconName} />
      </BaseFab>
    );
  }
}

Fab.propTypes = {
  iconName: PropTypes.string.isRequired,
};

export default Fab;
