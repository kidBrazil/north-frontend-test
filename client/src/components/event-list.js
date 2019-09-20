import React, {Component} from 'react';

class EventList extends Component {
  render () {
    return (
      <div>
        <div className="blk-panel-heading u-uppercase u-bold h6">
          Events List
        </div>

        {this.props.payload.map((event, index) => {
          return (
            <div className="blk-event flex flex-vert-center flex-hor-start">
              <i className={event.icon}></i>
              <div class="blk-event-content">
                <span className="blk-event-type">
                  {event.type}
                </span>
                <span className="blk-event-title">
                  {event.title}
                </span>
              </div>
            </div>
          );
        })}

      </div>
    );
  }
}

export default EventList;
