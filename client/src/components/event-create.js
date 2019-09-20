import React, {Component} from 'react';

class EventCreate extends Component {
  // ASSUMPTIONS --------------------------------------------
  // I am assuming here that the icons pertain to the type of service,
  // therefore it doesn't really make sense for the user to select them directly.
  //
  // Instead, when the user selects a type from the dropdown it will add the associated
  // icon automatically as well as the service code.
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
              <input type="text" aria-label="Service Type" required/>
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
          <button className="blk-base-btn blk-submit-btn">
            Submit Event
          </button>
        </div>
      </div>
    );
  }
}

export default EventCreate;
