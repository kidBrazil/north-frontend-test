import React, {Component} from 'react';
import EventList from './components/event-list'
import EventDetail from './components/event-details'
import EventCreate from './components/event-create'
import Axios from 'axios';
// Import Global SCSS Stylesheer
import './assets/styles/global-main.scss';

class App extends Component {
  state = {
    // Swap flag to view Create View
    createView: false,
    events: [],
    eventDetail: {},
    firstEvent: null
  }
  // [Mount Livecycle Hook ] -----------------------
  componentDidMount() {
    // Load events on Mount
    this.getEvent()
  }

  // [GET EVENTS] ---------------------------------
  // When the component mounts, fetch the data and load the first events
  getEvent = () => {
    Axios.get('https://forgetful-elephant.herokuapp.com/events').then(res => {
      // Pull Data and assign it to variables
      // Automatically load the first one.
      this.setState({
        events: res.data,
        eventDetail: res.data[0]
      })
    })
  }

  // [SELECT EVENT] -------------------------------
  // When user selects an item from the list, load it into the view
  selectEvent = (desiredIndex) => {
    this.setState({
      eventDetail: this.state.events[desiredIndex]
    })
  }
  // [DELETE EVENT] -------------------------------
  // When user hits delete, delete that event!
  deleteEvent = (eventId) => {
    Axios.delete('https://forgetful-elephant.herokuapp.com/events/' + eventId)
    .then(res => {
      // Reload events after delete
      this.getEvent()
    })
  }

  // [TOGGLE FORM] --------------------------------
  // Simple flag toggle for form UI
  toggleForm = (e) => {
    e.preventDefault();
    this.setState({createView: !this.state.createView})
  }

  // [RENDER View] ----------------------------------
  render () {
    // Return View
    return (
      <div className="flex flex-vert-stretch flex-wrap">
        {/* Application Sidebar */}
        <div className="blk-events-sidebar">
          <div className="blk-panel-heading u-uppercase u-bold h6">
            Events List
          </div>
          {/* Quickly checks lenght of event to determine what to show */}
          {this.state.events.length > 0 ? (
            <EventList events={this.state.events} selectEvent={this.selectEvent}/>
          ):(
            <div className="blk-no-events">
              There are currently no events to view...
            </div>
          )}
          {/* Button for Creating New Event */}
          <button className="blk-base-btn blk-primary-btn" onClick={this.toggleForm}>
            Create New
          </button>
        </div>
        <div className="blk-events-content">
          {/* Conditional view switch between create and view event fired by button */}
          {!this.state.createView &&
            <EventDetail details={this.state.eventDetail} deleteEvent={this.deleteEvent}/>
          }
          {this.state.createView &&
            <EventCreate toggleForm={this.toggleForm}/>
          }
        </div>
      </div>
    );
  }
}

export default App;
