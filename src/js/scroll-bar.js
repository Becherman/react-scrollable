import React from 'react';
import PropTypes from 'prop-types';

const ScrollBar = ({ scrollBarClassName, children }) => (
    <div className={scrollBarClassName}>
        {children}
    </div>
)

ScrollBar.propTypes = {
    scrollBarClassName: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element,
    ])
}

export default ScrollBar;
