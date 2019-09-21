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
  // Container state for form values
  // Should probably be using something like Redux but I would need more time..
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
  // [Handle Change] ------------------------------------------------------
  // Dynamically handle key changes.
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
    // Grab a timestamp for the event.
    let created = new Date().toString()
    // Assignt it to the state and call the validation function.
    this.setState({
      formData: {
        ...this.state.formData,
         timestamp: created
      }
    // Validate form and call request
    }, ((this.validateForm()) ? this.sendRequest : null))
  }
  //[VALIDATE FORM] --------------------------------------------------
  // This is an extremely barebones validation. It merely checks to see if there is something there.
  // A full fledged form validation would go beyond just that and would do some regEx on these values
  // to make sure they conform to the expected data structures. I have other examples of regEx on my github.
  validateForm = () => {
    let formData = this.state.formData
    let error = null
    // Check that everything is filled
    for (var key in formData) {
      var data = formData[key]
      if (!data) {
        error = true
      }
    }
    // If error.. handle it..
    if (error) {
      window.alertify.error('Please make sure you have filled the whole form.')
      return false
    }
    // No error.. go ahead and submit
    else {
      return true
    }
  }
  // [AXIOS REQUEST] ---------------------------------------------------
  sendRequest = () => {
    //Submit data to API
    Axios.post('https://forgetful-elephant.herokuapp.com/events', this.state.formData)
    .then(res => {
      // Suceess..
      window.alertify.success('Your event was successfully created!')
      // Load created event into details view
      this.props.loadEvents(true)
    })
    .catch(err => {
      // handle error
      window.alertify.error('We\'r sorry, something went wrong with that request.')
      console.log(err)
    })
  }
  // [RENDER FUNCTION] --------------------------------------------------------
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
                defaultValue={'DEFAULT'}
                onChange={(e)=>this.handleChange(e, 'icon')}
                aria-label="Select Service Type">
                <option value="DEFAULT" disabled>Select Service Type</option>
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
