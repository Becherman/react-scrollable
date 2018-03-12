import React from 'react';
import { string, oneOfType, node, element } from 'prop-types';

const ScrollBar = ({ scrollBarClassName, children }) => (
  <div className={scrollBarClassName}>{children}</div>
);

ScrollBar.defaultProps = {
  scrollBarClassName: '',
};

ScrollBar.propTypes = {
  scrollBarClassName: string,
  children: oneOfType([node, element]).isRequired,
};

export default ScrollBar;
