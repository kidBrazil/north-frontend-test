import React, {Component} from 'react';
import EventList from './components/event-list'
import EventDetail from './components/event-details'
import EventCreate from './components/event-create'
// Import Global SCSS Stylesheer
import './assets/styles/global-main.scss';

class App extends Component {
  state = {
    createView: false
  }

  render () {
    const createPanel = this.state.createView
    return (
      <div className="flex flex-vert-stretch">
        {/* Application Sidebar */}
        <div className="blk-events-sidebar">
          <EventList />
        </div>
        <div className="blk-events-detail">
          {/* Conditional view switch between create and view event */}
          {!createPanel &&
            <EventDetail />
          }
          {createPanel &&
            <EventCreate />
          }
        </div>
      </div>
    );
  }
}

export default App;
