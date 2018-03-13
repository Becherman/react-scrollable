import React from 'react';
import {
  number,
  string,
  bool,
  func,
  element,
  node,
  oneOfType,
} from 'prop-types';
import classNames from './utils';
import ScrollBar from './scroll-bar';
import ScrollThumb from './scroll-thumb';
import '../css/react-scrollx.css';

class ReactScrollx extends React.Component {
  static defaultProps = {
    onTopPosition: undefined,
    onBottomPosition: undefined,
    onScroll: undefined,
  };

  static propTypes = {
    width: oneOfType([string, number]).isRequired,
    height: number.isRequired,
    scrollBarClassName: string,
    scrollThumbClassName: string,
    scrollContainerClassName: string,
    appearOnHover: bool,
    scrollBarVisible: bool,
    children: oneOfType([node, element]).isRequired,
    onTopPosition: func,
    onBottomPosition: func,
    onScroll: func,
  };

  static defaultProps = {
    appearOnHover: false,
    scrollBarVisible: true,
    scrollBarClassName: 'react-scrollx__bar',
    scrollThumbClassName: 'react-scrollx__thumb',
    scrollContainerClassName: 'react-scrollx__wrapper',
  };

  static getNativeScrollWidth(elem) {
    return elem.clientWidth - elem.offsetWidth;
  }

  static setDefaultState(cb) {
    cb();
  }

  constructor(props) {
    super(props);

    this.state = {
      scrollThumbHeight: 0,
      userSelectPermission: true,
      contentScrollTop: 0,
      contentHeight: 0,
      marginRight: 0,
      maxScrollTop: 0,
      isHover: false,
      scrollTimestamp: 0,
    };
  }

  componentDidMount() {
    const marginRight = this.getNativeScrollWidth(this.content);
    const scrollThumbHeight = this.calculateScrollThumbHeight(
      this.innerContainer,
    );
    const contentHeight = this.innerContainer.clientHeight;
    const maxScrollTop = this.content.scrollHeight - this.props.height;

    this.setDefaultState(() => {
      this.setState({
        contentHeight,
        scrollThumbHeight,
        marginRight,
        maxScrollTop,
      });
    });
  }

  onScrollHandler = () => {
    const { content, props } = this;

    this.setState({
      contentScrollTop: content.scrollTop,
      maxScrollTop: content.scrollHeight - props.height,
      scrollTimestamp: Date.now(),
    });

    if (props.onScroll !== undefined) {
      this.callOnScrollCallback(Date.now());
    }

    if (props.onTopPosition !== undefined) {
      this.callOnTopCallback(content.scrollTop);
    }

    if (props.onBottomPosition !== undefined) {
      this.callOnBottomCallback(content.scrollTop);
    }
  };

  setUserSelectPermission = value => {
    this.setState({ userSelectPermission: value });
  };

  setThumbTranslate() {
    const { maxScrollTop, contentScrollTop } = this.state;
    const thumbTrackSpace = this.getThumbTrackSpace();
    const ratio = thumbTrackSpace / maxScrollTop;

    return ratio * contentScrollTop;
  }

  setContentScrollTop = value => {
    const { height } = this.props;
    const maxScrollTop = this.content.scrollHeight - height;
    const thumbTrackSpace = this.getThumbTrackSpace();
    const ratio = maxScrollTop / thumbTrackSpace;

    this.content.scrollTop = ratio * value;
  };

  getThumbTrackSpace() {
    const { scrollThumbHeight } = this.state;
    const { height } = this.props;

    return height - scrollThumbHeight;
  }

  getScrollableStyles() {
    const { marginRight } = this.state;
    const { height } = this.props;

    return {
      height,
      marginRight,
      overflowY: 'auto',
      overflowX: 'hidden',
    };
  }

  calculateScrollThumbHeight(elem) {
    const containerHeight = this.props.height;
    const childHeight = elem.clientHeight;
    const viewableRatio = containerHeight / childHeight;
    const scrollHeight = viewableRatio * containerHeight;
    return Number(scrollHeight.toFixed());
  }

  callOnBottomCallback(value) {
    const { maxScrollTop } = this.state;

    if (value === maxScrollTop) this.props.onBottomPosition();
  }

  callOnTopCallback(value) {
    const { onTopPosition } = this.props;

    if (value === 0) onTopPosition();
  }

  callOnScrollCallback(timestamp) {
    const { scrollTimestamp } = this.state;
    const { onScroll } = this.props;

    if (timestamp - scrollTimestamp >= 200) {
      onScroll();
      this.setState({ scrollTimestamp: Date.now() });
    }
  }

  mouseOutHandler = () => {
    this.setState({ isHover: false });
  };

  isContentBiggerThenContainer() {
    const { height } = this.props;
    const { contentHeight } = this.state;

    return contentHeight > height;
  }

  isScrollBarVisible() {
    const { scrollBarVisible } = this.props;

    if (this.isContentBiggerThenContainer()) {
      return scrollBarVisible;
    }
    return false;
  }

  render() {
    const { userSelectPermission, scrollThumbHeight, isHover } = this.state;
    const {
      width,
      height,
      appearOnHover,
      scrollBarClassName,
      scrollThumbClassName,
      scrollContainerClassName,
    } = this.props;
    const containerStyle = { width, height };

    const containerClassName = classNames({
      'react-scrollx': true,
      'react-scrollx--without-select': !userSelectPermission,
    });

    const scrollBarClass = classNames({
      [scrollBarClassName]: true,
      'is-hide': !this.isScrollBarVisible(),
      'with-transform': !isHover && appearOnHover,
    });

    return (
      <div className={scrollContainerClassName} style={{ height }}>
        <div
          className={containerClassName}
          style={containerStyle}
          onWheel={this.onWheelHandler}
          onMouseOver={this.mouseOverHandler}
          onFocus={this.mouseOverHandler}
          onMouseOut={this.mouseOutHandler}
          onBlur={this.mouseOutHandler}
        >
          <ScrollBar scrollBarClassName={scrollBarClass}>
            <ScrollThumb
              scrollThumbHeight={scrollThumbHeight}
              scrollThumbClassName={scrollThumbClassName}
              translateThumbY={this.setThumbTranslate()}
              setContentScrollTop={this.setContentScrollTop}
              setUserSelectPermission={this.setUserSelectPermission}
            />
          </ScrollBar>
          <div className="react-scrollx__outer-container">
            <div
              onScroll={this.onScrollHandler}
              ref={div => {
                this.content = div;
              }}
              style={this.getScrollableStyles()}
            >
              <div
                ref={div => {
                  this.innerContainer = div;
                }}
              >
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReactScrollx;
