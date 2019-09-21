import React, {Component} from 'react';
import PropTypes from 'prop-types';
// [ EVENT LIST COMPONENT ] -------------------------------------
// The event list component takes in an array of objects from the API and displays
// them in a simple list. Each component will correspond to an ID and when clicked
// should render the details of that entry into the main content area.

class EventList extends Component {
  render () {
    return (
      <div className="blk-event-list">
        {this.props.events.map((event, index) => {
          return (
            <div key={index}
              onClick={()=>this.props.selectEvent(index)}
              className="blk-event flex flex-hor-between flex-vert-center flex-hor-start">
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
