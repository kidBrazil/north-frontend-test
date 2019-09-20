import React, {Component} from 'react';
import PropTypes from 'prop-types';

class EventList extends Component {
  render () {
    return (
      <div>
        {this.props.events.map((event, index) => {
          return (
            <div key={index} className="blk-event flex flex-hor-between flex-vert-center flex-hor-start">
              <i className={event.icon}></i>
              <div className="blk-event-content">
                <span className="blk-event-type">
                  {event.type}
                </span>
                <span className="blk-event-title">
                  {event.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

// PropTypes...
EventList.propTypes = {
  events: PropTypes.array.isRequired
}

export default EventList;
