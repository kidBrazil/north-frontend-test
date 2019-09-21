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
    // Temporary data model..
    events: [],
    eventDetail: {
        id: 4,
        type: 'Network Maintenance',
        serviceId: 'XRZ004',
        icon: 'fas fa-signal-slash',
        timestamp: new Date().toString(),
        title: 'Users on the 4th floor ca\'t get access to the WiFi hotspots.',
        data: 'User complains that the new appliance is too difficult to setup. The last time he came close to the appliance it tried to bite him. Support technicial told him this was absolute nonesense but the user now refuses to go anywhere near it until the technician calls.'
    }
  }

  // Component Mount Get Data
  componentDidMount() {
    Axios.get('https://forgetful-elephant.herokuapp.com/events').then(res => {
      this.setState({events: res.data})
    })
  }

  // Show Form
  toggleForm = (e) => {
    e.preventDefault();
    this.setState({createView: !this.state.createView})
  }

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
            <EventList events={this.state.events}/>
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
            <EventDetail details={this.state.eventDetail}/>
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
