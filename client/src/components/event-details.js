import React, {Component} from 'react';
import PropTypes from 'prop-types';
// [ EVENT DETAILS COMPONENT ] -------------------------------------
// The event details component is responsible for displaying the data
// returned from the API in full. It takes in a object as a prop that follows
// the same schema as the DB.

class EventDetail extends Component {
  render () {
    // Has something loaded..
    if ( this.props.details ) {
      return (
        <div>
          <div className="blk-panel-heading u-uppercase u-bold h6">
            Event Details
          </div>
          <div className="blk-event-details">
            <div className="blk-event-header blk-panel flex flex-vert-center flex-hor-between flex-wrap">
              <i className={this.props.details.icon}></i>
              <div className="blk-event-content">
                <span className="blk-event-row">
                  <span className="blk-details-header">Service Type:</span>
                  {this.props.details.type}
                </span>
                <span className="blk-event-row">
                  <span className="blk-details-header">Service Title:</span>
                  {this.props.details.title}
                </span>
                <span className="blk-event-row">
                  <span className="blk-details-header">Service Code:</span>
                  {this.props.details.serviceId}
                </span>
                <span className="blk-event-row">
                  <span className="blk-details-header">Time Stamp:</span>
                  {this.props.details.timestamp}
                </span>
              </div>
            </div>
            <div className="blk-event-data blk-panel">
            <span className="blk-event-row">
              <span className="blk-details-header">Event Data:</span>
                {this.props.details.data}
              </span>
            </div>
            <button className="blk-base-btn blk-delete-btn">
              Delete Event
            </button>
          </div>
        </div>
      );
    }

    else {
      return (
        <div className="blk-no-content blk-panel">
          <div className="--center">
            <i className="fad fa-inbox-in"></i>
            <div className="h6 u-bold">
              There are currently no events loaded.
            </div>
          </div>
        </div>
      );
    }
  }
}

// PropTypes...
EventDetail.propTypes = {
  details: PropTypes.object.isRequired
}

export default EventDetail;
