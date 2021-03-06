import React, {Component} from 'react';
// [ EVENT DETAILS COMPONENT ] -------------------------------------
// The event details component is responsible for displaying the data
// returned from the API in full. It takes in a object as a prop that follows
// the same schema as the DB.
class EventDetail extends Component {
  render () {
    // Check that the object has something in it.
    if ( this.props.details ) {
      return (
        <div>
          <div className="blk-panel-heading u-uppercase u-bold h6 flex flex-hor-between flex-vert-center">
            Event Information
            <button aria-label="Delete Event"
              onClick={()=>this.props.deleteEvent(this.props.details.id)}
              className="blk-base-btn blk-delete-btn">
              Delete Event
            </button>
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
                <div className="flex flex-hor-between">
                  <span className="blk-event-row">
                    <span className="blk-details-header">Service Code:</span>
                    {this.props.details.serviceId}
                  </span>
                  <span className="blk-event-row">
                    <span className="blk-details-header">Event Id:</span>
                    {this.props.details.id}
                  </span>
                </div>
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
            <button aria-label="Delete Event"
              onClick={()=>this.props.deleteEvent(this.props.details.id)}
              className="blk-base-btn blk-delete-btn">
              Delete Event
              <i class="fad fa-trash-alt"></i>
            </button>
          </div>
        </div>
      );
    }
    // If the object is empty show waiting screen
    else {
      return (
        <div className="blk-no-content blk-panel">
          <div className="--center">
            <i className="fad fa-inbox-in"></i>
            <div className="h6 u-bold">
              There are currently no events to view.
            </div>
            <p>
              You can create new events by clicking on Create Event on the left sidebar.
            </p>
          </div>
        </div>
      );
    }
  }
}

export default EventDetail;
