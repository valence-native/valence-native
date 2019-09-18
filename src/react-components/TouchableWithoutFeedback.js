import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TouchableWithoutFeedback extends Component {
  pressedDown = false;
  startedTime = 0;
  static defaultProps = {
    onPress: () => {},
    onLongPress: () => {},
  };
  static propTypes = {
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
  };
  onDown() {
    this.pressedDown = true;
    this.startedTime = new Date().getTime();
  }
  onUp() {
    if (this.pressedDown) {
      const diff = new Date().getTime() - this.startedTime;
      if (diff > 500) {
        this.props.onLongPress
          ? this.props.onLongPress()
          : this.props.onPress();
      } else {
        this.props.onPress();
      }
      this.pressedDown = false;
    }
  }
  render() {
    const child = React.Children.only(this.props.children);
    let children = child.props.children;
    return React.cloneElement(child, {
      onResponderGrant: () => this.onDown(),
      onResponderRelease: () => this.onUp(),
      children,
    });
  }
}