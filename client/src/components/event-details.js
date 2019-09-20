import React, {Component} from 'react';

class EventDetail extends Component {
  render () {
    console.log(this.props.details);
    return (
      <div>
        <div className="blk-panel-heading u-uppercase u-bold h6">
          Event Details
        </div>
        <div className="blk-event-details">
          <div className="blk-event-header flex flex-vert-center flex-hor-between flex-wrap">
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
          <div className="blk-event-data">
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
}

export default EventDetail;
