import React from 'react';
import PropTypes from 'prop-types';

class ScrollThumb extends React.Component {

    static propTypes = {
        translateThumbY: PropTypes.number,
        scrollThumbHeight: PropTypes.number,
        scrollThumbClassName: PropTypes.string,
        setUserSelectPermission: PropTypes.func,
        setContentScrollTop: PropTypes.func
    }

    constructor() {
        super();

        this.state = {
            lastPoint: 0
        }
    }

    onTouchStartHandle = (e) => {
        e.stopPropagation();
        this.setState({
            startPoint: e.touches[0].pageY,
            lastPoint: this.props.translateThumbY
        })

        document.addEventListener('touchmove', this.onTouchMoveHandle);
        document.addEventListener('touchend', this.onTouchEndHandle);
    };

    onTouchMoveHandle = (e) => {
        const { startPoint, lastPoint } = this.state;
        const { setContentScrollTop } = this.props;

        setContentScrollTop(e.touches[0].pageY - startPoint + lastPoint);
    };

    onTouchEndHandle = () => {
        const { translateThumbY, setUserSelectPermission } = this.props;

        this.setState({ lastPoint: translateThumbY})

        setUserSelectPermission(true);

        document.removeEventListener('touchmove', this.onTouchMoveHandle);
        document.removeEventListener('touchend', this.onTouchEndHandle);
    };

    mouseDownHandle = (e) => {
        e.stopPropagation();
        const {translateThumbY, setUserSelectPermission } = this.props;

        this.setState({
            startPoint: e.pageY,
            lastPoint: translateThumbY
        })

        setUserSelectPermission(false);

        document.addEventListener('mousemove', this.moveHandle);
        document.addEventListener('mouseup', this.mouseUpHandle);
    };

    moveHandle = (e) => {
        const { startPoint, lastPoint } = this.state;
        const { setContentScrollTop } = this.props;

        setContentScrollTop(e.pageY - startPoint + lastPoint);
    };

    mouseUpHandle = () => {
        const { translateThumbY, setUserSelectPermission } = this.props;

        this.setState({ lastPoint: translateThumbY})

        setUserSelectPermission(true);

        document.removeEventListener('mousemove', this.moveHandle);
        document.removeEventListener('mouseup', this.mouseUpHandle);
    };

    render() {
        const { translateThumbY, scrollThumbHeight, scrollThumbClassName } = this.props;
        return(
            <div
                className={scrollThumbClassName}
                ref={div => this.scrollThumb = div}
                onMouseDown={this.mouseDownHandle}
                onTouchStart={this.onTouchStartHandle}
                style={{
                    transform: `translateY(${translateThumbY}px)`,
                    height: `${scrollThumbHeight}px`
                }}
            />
        )
    }
}

export default ScrollThumb;
