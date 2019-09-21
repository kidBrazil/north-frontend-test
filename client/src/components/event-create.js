import React, {Component} from 'react';
import Axios from 'axios';

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
  state = {
    formData: {
      type: '',
      serviceId: '',
      icon: '',
      timestamp: '',
      title: '',
      data: ''
    }
  }

  // [Handle Change] ------------------
  // Dynamically handle key changes
  handleChange(e,key) {
    // If Select Field changes...
    if (e.target.options) {
      // Grab custom attribute serviceid for the Service ID
      // Grab icon from the value
      // Grab type from the option text
      this.setState({
        formData: {
          ...this.state.formData,
           [key]: e.target.value,
           type: e.target.options[e.target.selectedIndex].text,
           serviceId: e.target.options[e.target.selectedIndex].getAttribute('serviceid')
        },
      });
    }
    // All other fields...
    else {
      this.setState({
        formData: {
          ...this.state.formData,
           [key]: e.target.value,
        },
      });
    }
  }
  // [SUBMIT FORM] ----------------------------------------------------
  submitForm = () => {
    let created = new Date().toString()
    // Capture create time
    this.setState({
      formData: {
        ...this.state.formData,
         timestamp: created
      },
    }, this.sendRequest());
  }
  // Send Request after submission passes
  sendRequest = () => {
    //Submit data to API
    Axios.post('https://forgetful-elephant.herokuapp.com/events', this.state.formData)
    .then(res => {
      this.props.loadEvents()
    })
  }

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
              <select
                onChange={(e)=>this.handleChange(e, 'icon')}
                aria-label="Select Service Type">
                <option serviceid="XHR0001" value="fad fa-user-headset">Phone Support</option>
                <option serviceid="XHR0002" value="fas fa-tools">Machine Maintenance</option>
                <option serviceid="XHR0003" value="fas fa-car-building">Building Maintenance</option>
                <option serviceid="XHR0004" value="fas fa-signal-slash">Network Maintenance</option>
              </select>
            </div>

            <div className="blk-event-row">
              <span className="blk-details-header">Title:</span>
              <input
                onChange={(e)=>this.handleChange(e, 'title')}
                type="text" aria-label="Event Title" required/>
            </div>

            <div className="blk-event-row">
              <span className="blk-details-header">Data:</span>
              <textarea
                onChange={(e)=>this.handleChange(e, 'data')}
                aria-label="Service Type" required/>
            </div>
          </div>
          <div className="flex flex-hor-between flex-vert-center">
            <button className="blk-base-btn blk-submit-btn" onClick={this.submitForm}>
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
