/*
  React component to render an animated circular meter.
  Simply pass in the value, title and CSS color code to the component, e.g.,

  CircularMeter val={ 58 } title={ "Progress" } color={ '#000' }

  Tested on Chrome. Implemented using SVG with CSS transition:
  https://www.smashingmagazine.com/2015/07/designing-simple-pie-charts-with-css

  Text animation uses JavaScript.
*/

import React from 'react';
import styles from './css/chart.less';

const FPS = 60; // requestAnimationFrame frames per second

const CircularMeter = React.createClass({

  initialState() {
    return {
      textProgress: 0,  // The current animated text value
      tick: 0,          // The current tick of the animation clock
      val: 0            // The value of the meter
    }
  },

  getInitialState() {
    return this.initialState();
  },

  animate() {
    const textPercentProgress =
      Math.min(Math.round(this.textAnimSpeedFactor * this.state.tick),
        this.props.val);

    this.setState({
      textProgress: textPercentProgress,
      tick: this.state.tick + 1,
      val: this.props.val
    });
    this.startAnim();
  },

  startAnim() {
    this.ticker = requestAnimationFrame(this.animate);
  },

  stopAnim() {
    cancelAnimationFrame(this.ticker);

    this.setState({
      textProgress: this.props.val
    });
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.val !== this.props.val) {
      this.setState(this.initialState());
      this.startAnim();
    }
  },

  componentDidMount() {
    this.textAnimSpeedFactor = this.props.val / FPS;
    this.startAnim();
  },

  render () {
    return (
      <div class="circular-chart">
        <svg viewBox="0 0 32 32">
          <circle r="16" cx="16" cy="16" class="pie"
            strokeDasharray={ this.state.val + ' 100' }
            stroke={ this.props.color }
            onTransitionEnd={ this.stopAnim }/>
          <circle r="12" cx="16" cy="16" class="inset" />
        </svg>
        <div class="counter">{ Math.round(this.state.textProgress) + '%'}</div>
        <div class="title">{ this.props.title }</div>
      </div>
    )
  }

});

CircularMeter.propTypes = {
  val: React.PropTypes.number,
  title: React.PropTypes.string,
  color: React.PropTypes.string
};

CircularMeter.defaultProps = {
  val: 0,
  title: '',
  color: 'blue'
};

export default CircularMeter;
