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
    });
  },
  render: function() {
    var eventLoaded;
    if (this.state.data.results[0]) {
      eventLoaded = <Event data={this.state.data.results[0]} />;
    } else {
      eventLoaded = "";
    }
    return (
      <div className="meetupEvents">
        <h1>Events</h1>
        {eventLoaded}
      </div>
    );
  }
});

var Event = React.createClass({
  render: function(){
    return (
      <div>
        {this.props.data.status}
        {this.props.data.venue.name}
      </div>
    );
  }
})
