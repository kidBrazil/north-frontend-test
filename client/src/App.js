import React, {Component} from 'react';
import EventList from './components/event-list'
import EventDetail from './components/event-details'
import EventCreate from './components/event-create'
import Axios from 'axios';
// Import Global SCSS Stylesheer

class App extends Component {
  state = {
    // Swap flag to view Create View
    createView: false,
    eventLoaded: false,
    events: [],
    filter: false,
    eventDetail: {}
  }
  // [Mount Livecycle Hook ] -----------------------
  componentDidMount() {
    // Load events on Mount
    this.getEvents()
  }
  // [Filter Events] ------------------------------
  // Fetches only the events from the DB that match the serviceId
  filterEvents = (serviceId) => {
    Axios.get('https://forgetful-elephant.herokuapp.com/events')
    .then(res => {
      console.log((res.data.length > 0));
      // Filter results before update
      let filteredEvents = res.data.filter(item => item.serviceId === serviceId )
      this.setState({
        events: filteredEvents,
        // Inline if-else decides if it loads first or last
        eventDetail: filteredEvents[0],
        eventLoaded: (res.data.length > 0) ? true : false,
        createView: false
      })
    })
    .catch(err => {
      // handle error
      window.alertify.error('We\'r sorry, something went wrong while loading the events.')
      console.log(err)
    })
  }
  // [GET EVENTS] ---------------------------------
  // When the component mounts, fetch the data and load the first events
  getEvents = (loadLatest) => {
    Axios.get('https://forgetful-elephant.herokuapp.com/events')
    .then(res => {
      console.log((res.data.length > 0));
      // Pull Data and assign it to variables
      // Automatically load the first one.
      this.setState({
        events: res.data,
        // Inline if-else decides if it loads first or last
        eventDetail: loadLatest ? res.data[res.data.length - 1] : res.data[0],
        eventLoaded: (res.data.length > 0) ? true : false,
        createView: false
      })
    })
    .catch(err => {
      // handle error
      window.alertify.error('We\'r sorry, something went wrong while loading the events.')
      console.log(err)
    })
  }
  // [SELECT EVENT] -------------------------------
  // When user selects an item from the list, load it into the view
  selectEvent = (desiredIndex) => {
    this.setState({
      eventDetail: this.state.events[desiredIndex],
      createView: false
    })
  }
  // [DELETE EVENT] -------------------------------
  // When user hits delete, delete that event!
  deleteEvent = (eventId) => {
    window.alertify.confirm('Delete Event?', 'Are you sure you want to permanently delete this event?',
      () => {
        Axios.delete('https://forgetful-elephant.herokuapp.com/events/' + eventId)
        .then(res => {
          // Reload events after delete
          window.alertify.success('Event successfully deleted.')
          this.getEvents()
        })
        .catch(err => {
          // handle error
          window.alertify.error('We\'r sorry, something went wrong while deleting that event.')
          console.log(err)
        })
      },
      () => { window.alertify.warning('Canceled Deletion of event.')});
  }
  // [TOGGLE FORM] --------------------------------
  // Simple flag toggle for form UI
  toggleForm = (e) => {
    e.preventDefault();
    // Store the original view..
    let scrollBottom = !this.state.createView
    this.setState({createView: !this.state.createView})
    // Scroll to bottom if form is being show.
    if (scrollBottom) {
      window.scrollTo(0, document.body.scrollHeight);
    }
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
            <EventList
              events={this.state.events}
              loadEvents={this.getEvents}
              selectEvent={this.selectEvent}
              filter={this.filterEvents}/>
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
            <EventDetail
              details={this.state.eventDetail}
              deleteEvent={this.deleteEvent}
              showEvent={this.eventLoaded}/>
          }
          {this.state.createView &&
            <EventCreate toggleForm={this.toggleForm} loadEvents={this.getEvents}/>
          }
        </div>
      </div>
    );
  }
}

export default App;
