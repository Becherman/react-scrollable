import React from 'react';
import PropTypes from 'prop-types';
import classNames from './utils';
import ScrollBar from './scroll-bar';
import ScrollThumb from './scroll-thumb';
import '../css/react-scrollable.css';

class ReactScrollable extends React.Component {

    static propTypes = {
        width: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        height: PropTypes.number.isRequired,
        scrollBarClassName: PropTypes.string,
        scrollThumbClassName: PropTypes.string,
        scrollContainerClassName: PropTypes.string,
        appearOnHover: PropTypes.bool,
        scrollBarVisible: PropTypes.bool,
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.element
        ]),
        onTopPosition: PropTypes.func,
        onBottomPosition: PropTypes.func,
        onScroll: PropTypes.func
    }

    static defaultProps = {
        appearOnHover: false,
        scrollBarVisible: true,
        scrollBarClassName: 'react-scrollable__bar',
        scrollThumbClassName: 'react-scrollable__thumb',
        scrollContainerClassName: 'react-scrollable__wrapper'
    }

    constructor(props) {
        super(props);

        this.state = {
            scrollThumbHeight: 0,
            translateThumbY: 0,
            userSelectPermission: true,
            contentScrollTop: 0,
            contentHeight: 0,
            marginRight: 0,
            maxScrollTop: 0,
            isHover: false,
            scrollTimestamp: 0
        }
    }

    mouseOverHandler = () => {
        this.setState({ isHover: true });
    };

    mouseOutHandler = () => {
        this.setState({ isHover: false });

    };

    onScrollHandler = () => {
        const { content, props } = this;

        this.setState({
            contentScrollTop: content.scrollTop,
            maxScrollTop: content.scrollHeight - props.height,
            scrollTimestamp: Date.now()
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

    callOnScrollCallback(timestamp) {
        const { scrollTimestamp } = this.state,
            { onScroll } = this.props;

        if (timestamp - scrollTimestamp >= 200) {
            onScroll();
            this.setState({ scrollTimestamp: Date.now() })
        }

    }

    callOnTopCallback(value) {
        const { onTopPosition } = this.props;

        if(value === 0) onTopPosition();
    }

    callOnBottomCallback(value) {
        const { maxScrollTop } = this.state;

        if(value === maxScrollTop) this.props.onBottomPosition();
    }

    setUserSelectPermission = (value) => {
        this.setState({ userSelectPermission: value })
    };

    calculateScrollThumbHeight(element) {
        const containerHeight = this.props.height,
            childHeight = element.clientHeight,
            viewableRatio = containerHeight / childHeight,
            scrollHeight = viewableRatio * containerHeight;
        return Number(scrollHeight.toFixed());
    }

    getNativeScrollWidth(element) {
        return element.clientWidth - element.offsetWidth;
    }

    setThumbTranslate() {
        const { maxScrollTop, contentScrollTop } = this.state,
            thumbTrackSpace = this.getThumbTrackSpace(),
            ratio = thumbTrackSpace / maxScrollTop;
        return ratio * contentScrollTop;
    }

    setContentScrollTop = (value) => {
        const { height } = this.props,
            maxScrollTop = this.content.scrollHeight - height,
            thumbTrackSpace = this.getThumbTrackSpace(),
            ratio = maxScrollTop / thumbTrackSpace;

        this.content.scrollTop = ratio * value
    };

    getThumbTrackSpace() {
        const { scrollThumbHeight } = this.state,
            { height } = this.props;

        return height - scrollThumbHeight;
    }

    getScrollableStyles() {
        const { marginRight } = this.state,
            { height } = this.props;

        return {
            height: height,
            marginRight: marginRight,
            overflowY: 'auto',
            overflowX: 'hidden'
        }
    }

    isContentBiggerThenContainer() {
        const { height } = this.props,
            { contentHeight } = this.state;

        return contentHeight > height;
    }

    isScrollBarVisible() {
        const { scrollBarVisible } = this.props;

        if (this.isContentBiggerThenContainer()) {
            return scrollBarVisible
        } else return false;
    }

    componentDidMount() {
        const marginRight = this.getNativeScrollWidth(this.content),
            scrollThumbHeight = this.calculateScrollThumbHeight(this.innerContainer),
            contentHeight = this.innerContainer.clientHeight,
            maxScrollTop = this.content.scrollHeight - this.props.height
        this.setState({ contentHeight, scrollThumbHeight, marginRight, maxScrollTop });
    }


    render() {
        const { userSelectPermission, scrollThumbHeight, isHover } = this.state;
        const {
            width,
            height,
            appearOnHover,
            scrollBarClassName,
            scrollThumbClassName,
            scrollContainerClassName
        } = this.props;
        const containerStyle = { width, height };

        const containerClassName = classNames({
            'react-scrollable': true,
            'react-scrollable--without-select': !userSelectPermission
        });

        const scrollBarClass = classNames({
            [scrollBarClassName]: true,
            'is-hide': !this.isScrollBarVisible(),
            'with-transform': !isHover && appearOnHover
        });

        return(
            <div
                className={scrollContainerClassName}
                style={{height}}
            >
                <div className={containerClassName}
                    style={containerStyle}
                    ref={div => this.container = div}
                    onWheel={this.onWheelHandler}
                    onMouseOver={this.mouseOverHandler}
                    onMouseOut={this.mouseOutHandler}
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
                        <div className="react-scrollable__outer-container">
                            <div
                                onScroll={this.onScrollHandler}
                                ref={div => this.content = div}
                                style={this.getScrollableStyles()}
                            >
                                <div ref={div => this.innerContainer = div}>
                                    {this.props.children}
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default ReactScrollable;
