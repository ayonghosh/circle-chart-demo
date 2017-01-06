import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import CircularMeter from './CircularMeter';

let el = document.getElementById('app');

const App = React.createClass({

  render() {
    return (
      <div>
        <CircularMeter val={ this.props.revenue }
          title="Revenue Estimated vs Actual"
          color="#c0392b"/>
        <CircularMeter val={ this.props.hours }
          title="Hours Estimated vs Actual"
          color="#3498db"/>
        <CircularMeter val={ this.props.jobs }
          title="Jobs Estimated vs Actual"
          color="#27ae60"/>
      </div>
    );
  }

});

ReactDOM.render(<App revenue={ 23 } hours={ 54 } jobs={ 38 } />, el);

// Keep randomly changing meter values to demonstrate animations work even
// after first mount
setInterval( () => {
  const revenue = Math.round(Math.random() * 100);
  const hours = Math.round(Math.random() * 100);
  const jobs = Math.round(Math.random() * 100);
  ReactDOM.render(<App
    revenue={ revenue }
    hours={ hours }
    jobs={ jobs } />, el);
}, 5000);
