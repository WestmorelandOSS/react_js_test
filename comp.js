/** @jsx React.DOM */
var Meetup = React.createClass({
  getInitialState: function() {
    return {data: {'results': []}};
  },
  componentDidMount: function() {
    this.props.url = "http://api.meetup.com/2/events?text_format=simplehtml&format=json&page=4&group_id=13038502&sign=true&key=6330357c7f54114c744c5f33cd122f&callback=jQuery110206630528541281819_1411917377097&_=1411917377098";
    $.ajax({
      url: this.props.url,
      dataType: 'jsonp',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    }).done(meetupRender());
  },
  render: function() {
    return (
      <div className="meetupEvents">
        <h1>Events</h1>
        <Event data={this.state.data.results} />
      </div>
    );
  }
});

var Event = React.createClass({
  render: function(){
    var events = this.props.data.map(function(event){
      var date = new Date(event.time+event.utc_offset).toUTCString()
      console.log(event)
      return (
        <article className='event'>
          <h2 className='name'><a href={event.event_url}>{event.name}</a></h2>
          <p>
            <span className='venue'>Location: {event.venue.name}</span>
            <span className='time'>{date}</span>
          </p>
        </article>
      )
    });
    return <section id='events'>{events}</section>;
  }
});

var meetupRender = function(){
  React.renderComponent(
    <Meetup />,
    document.getElementById('content')
  );
}