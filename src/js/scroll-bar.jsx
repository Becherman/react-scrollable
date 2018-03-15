// @flow

import * as React from 'react';

type Props = {
  scrollBarClassName: string,
  children: React.Node
}

const ScrollBar = ({ scrollBarClassName, children }: Props) => (
  <div className={scrollBarClassName}>{children}</div>
);

export default ScrollBar;
