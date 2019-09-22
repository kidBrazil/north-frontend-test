import React, {Component} from 'react';
import PropTypes from 'prop-types';
// [ EVENT LIST COMPONENT ] -------------------------------------
// The event list component takes in an array of objects from the API and displays
// them in a simple list. Each component will correspond to an ID and when clicked
// should render the details of that entry into the main content area.

// NOTES:
// It would have been better to have the filtering be dynamically generated as well.
// Because we are dealing with a fake application without a truly set schema it is easier
// to do it by hand.
// In an ideal world we would query the DB for the types of categories available for filtering

class EventList extends Component {
  render () {
    return (
      <div className="blk-event-container">
        <div className="blk-event-filter flex flex-nowrap flex-vert-center flex-hor-between">
          <div
            onClick={()=>this.props.loadEvents()}
            className="blk-event-select ">
            <i className="fad fa-globe-americas"></i>
            <span className="u-screenreader">Load All</span>
          </div>
          <div
            onClick={()=>this.props.filter('XHR0001')}
            className="blk-event-select ">
            <i className="fad fa-user-headset"></i>
            <span className="u-screenreader">Phone Support</span>
          </div>
          <div
            onClick={()=>this.props.filter('XHR0002')}
            className="blk-event-select">
            <i className="fas fa-tools"></i>
            <span className="u-screenreader">Machine Maintenance</span>
          </div>
          <div
            onClick={()=>this.props.filter('XHR0003')}
            className="blk-event-select">
            <i className="fas fa-car-building"></i>
            <span className="u-screenreader">Phone Support</span>
          </div>
          <div
            onClick={()=>this.props.filter('XHR0004')}
            className="blk-event-select">
            <i className="fas fa-signal-slash"></i>
            <span className="u-screenreader">Phone Support</span>
          </div>
        </div>
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
      </div>
    );
  }
}
// PropTypes...
EventList.propTypes = {
  events: PropTypes.array.isRequired
}

export default EventList;
