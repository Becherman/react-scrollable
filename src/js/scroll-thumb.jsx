// @flow

import * as React from 'react';

type Props = {
  translateThumbY: number,
  scrollThumbHeight: number,
  scrollThumbClassName: string,
  setUserSelectPermission: (perm: boolean) => void,
  setContentScrollTop: (top: number) => void,
};

type State = {
  lastPoint: number,
  startPoint: ?number,
};

class ScrollThumb extends React.Component<Props, State> {
  static defaultProps = {
    scrollThumbClassName: '',
  };

  constructor() {
    super();

    this.state = {
      lastPoint: 0,
      startPoint: null,
    };
  }

  onTouchStartHandle = (event: SyntheticTouchEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.setState({
      startPoint: event.touches[0].pageY,
      lastPoint: this.props.translateThumbY,
    });

    document.addEventListener('touchmove', this.onTouchMoveHandle);
    document.addEventListener('touchend', this.onTouchEndHandle);
  };

  onTouchMoveHandle = (event: TouchEvent) => {
    const { startPoint, lastPoint } = this.state;
    const { setContentScrollTop } = this.props;

    if (startPoint != null) {
      setContentScrollTop(event.touches[0].pageY - startPoint + lastPoint);
    }
  };

  onTouchEndHandle = () => {
    const { translateThumbY, setUserSelectPermission } = this.props;

    this.setState({ lastPoint: translateThumbY });

    setUserSelectPermission(true);

    document.removeEventListener('touchmove', this.onTouchMoveHandle);
    document.removeEventListener('touchend', this.onTouchEndHandle);
  };

  mouseDownHandle = (event: SyntheticMouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    const { translateThumbY, setUserSelectPermission } = this.props;

    this.setState({
      startPoint: event.pageY,
      lastPoint: translateThumbY,
    });

    setUserSelectPermission(false);

    document.addEventListener('mousemove', this.moveHandle);
    document.addEventListener('mouseup', this.mouseUpHandle);
  };

  moveHandle = (event: MouseEvent) => {
    const { startPoint, lastPoint } = this.state;
    const { setContentScrollTop } = this.props;

    if (startPoint != null) {
      setContentScrollTop(event.pageY - startPoint + lastPoint);
    }
  };

  mouseUpHandle = () => {
    const { translateThumbY, setUserSelectPermission } = this.props;

    this.setState({ lastPoint: translateThumbY });

    setUserSelectPermission(true);

    document.removeEventListener('mousemove', this.moveHandle);
    document.removeEventListener('mouseup', this.mouseUpHandle);
  };

  render() {
    const {
      translateThumbY,
      scrollThumbHeight,
      scrollThumbClassName,
    } = this.props;
    return (
      <div
        className={scrollThumbClassName}
        onMouseDown={this.mouseDownHandle}
        onTouchStart={this.onTouchStartHandle}
        style={{
          transform: `translateY(${translateThumbY}px)`,
          height: `${scrollThumbHeight}px`,
        }}
      />
    );
  }
}

export default ScrollThumb;
