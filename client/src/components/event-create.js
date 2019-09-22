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
    },
    // I guess I need REDUX to make this work.. I can't seem to update these in batches.
    formError: {
      type: false,
      serviceId: false,
      icon: false,
      timestamp: false,
      title: false,
      data: false
    }
  }
  // [ERROR DISPLAY] ------------------------------------------------------

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
    // Assignt it to the state and call
    this.setState({
      formData: {
        ...this.state.formData,
         timestamp: created
      }
    }, this.validateForm)
  }
  //[VALIDATE FORM] --------------------------------------------------
  // This is an extremely barebones validation. It merely checks to see if there is something there.
  // A full fledged form validation would go beyond just that and would do some regEx on these values
  // to make sure they conform to the expected data structures. I have other examples of regEx on my github.
  validateForm = () => {
    // Capture form data
    let formData = this.state.formData
    let error = null
    // Create Payload Object to update setState later
    let payloadObj = {}
    // Payload Array to be converted to object later
    let errorPayload = []
    // Check that each key in the form has content
    for (var key in formData) {
      var data = formData[key]
      // You might want some RegEx here in a real world application.
      // If the data is empty for that given form field...
      if (!data) {
        // Push that key to the payload for alertify
        errorPayload.push(key)
        // Flag the error for the next operation
        error = true
      }
    }
    // If error.. handle it..There are more elegant ways to do this but there is not a lot of time..
    // Ideally we want to add some error classes to the elements.. looking into that.
    if (error) {
      window.alertify.error('Please make sure you have filled the whole form.')
      if(errorPayload.includes('type')) {
        // Give it a little time before firing to make it visually pleasant.
        setTimeout(()=> {
          window.alertify.warning('Please select a event type.')
        },100)
      }
      if (errorPayload.includes('title')) {
        setTimeout(()=> {
          window.alertify.warning('Please enter a descriptive title.')
        },120)
      }
      if (errorPayload.includes('data')) {
        setTimeout(()=> {
          window.alertify.warning('Please enter a description of the event in the Data field.')
        },130)
      }

      // Convert array to Object to update state with errors
      for (let i = 0; i < errorPayload.length; i++) {
        payloadObj[errorPayload[i]] = true;
      }
      // Set state and update
      this.setState({
        formError: {
          ...this.state.formError,
           ...Object(payloadObj)
        },
      });
      return false
    }
    // No error - Send Request
    else {
      this.sendRequest()
    }
  }
  // [AXIOS REQUEST] ---------------------------------------------------
  sendRequest = () => {
    //Submit data to API
    Axios.post('https://forgetful-elephant.herokuapp.com/events', this.state.formData)
    .then(res => {
      // Load currently created event
      window.alertify.success('Your event was successfully created!')
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
                className={this.state.formError.type ? 'blk-error' : ''}
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
                className={this.state.formError.title ? 'blk-error' : ''}
                onChange={(e)=>this.handleChange(e, 'title')}
                type="text" aria-label="Event Title" required/>
            </div>

            <div className="blk-event-row">
              <span className="blk-details-header">Data:</span>
              <textarea
                className={this.state.formError.data ? 'blk-error' : ''}
                onChange={(e)=>this.handleChange(e, 'data')}
                aria-label="Service Type" required/>
            </div>
          </div>
          <div className="flex flex-hor-start flex-vert-center">
            <button className="blk-base-btn blk-submit-btn" onClick={this.submitForm}>
              Create Event
              <i class="fad fa-file-plus"></i>
            </button>
            <button className="blk-base-btn blk-cancel-btn" onClick={this.props.toggleForm}>
              Cancel
              <i class="fad fa-undo-alt"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EventCreate;
