import React, {Component} from 'react';

// [ CREATE EVENT ] -------------------------------------
// The create event component is a simple form to interact with the forgetful-elephant.
//
// It allows users to create new event entries to be consumed by the frontend for the
// purposes of this demo. I figured it would be better to have an interface like this
// to populate the DB.

// [ASSUMPTIONS] --------------------------------------------
// I am assuming here that the icons pertain to the type of service,
// therefore it doesn't really make sense for the user to select them directly.
//
// Instead, when the user selects a type from the dropdown it will add the associated
// icon automatically as well as the service code.

class EventCreate extends Component {

  render () {
    return (
      <div>
        <div className="blk-panel-heading u-uppercase u-bold h6">
          Create New Event
        </div>
        <div className="blk-event-details">
          <div className="blk-panel">
            <div className="blk-event-row">
              <span className="blk-details-header">Service Type:</span>
              <select>
                <option value="fad fa-user-headset">Phone Support</option>
                <option value="fas fa-tools">Machine Maintenance</option>
                <option value="fas fa-car-building">Building Maintenance</option>
                <option value="fas fa-signal-slash">Network Maintenance</option>
              </select>
            </div>

            <div className="blk-event-row">
              <span className="blk-details-header">Title:</span>
              <input type="text" aria-label="Service Type" required/>
            </div>

            <div className="blk-event-row">
              <span className="blk-details-header">Data:</span>
              <textarea aria-label="Service Type" required/>
            </div>
          </div>
          <div className="flex flex-hor-between flex-vert-center">
            <button className="blk-base-btn blk-submit-btn">
              Submit Event
            </button>
            <button className="blk-base-btn blk-delete-btn" onClick={this.props.toggleForm}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EventCreate;
