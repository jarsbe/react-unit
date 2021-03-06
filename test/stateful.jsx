// Note: you should use var createComponent = require('react-unit');
var createComponent = require('./react-unit');
var React = require('react/addons');

var Stateful = React.createClass({
  getInitialState: function() {
    return { value: this.props.value };
  },
  onChange: function(e) {
    this.setState({value: e.target.value});
  },
  render: function() {
    return <input value={this.state.value} onChange={this.onChange} />
  }
});

describe('stateful controls', () => {
  it('should handle input changes', () => {
    var component = createComponent(<Stateful value="original" />);
    var input = component.findByQuery('input')[0];

    input.onChange({target:{value: 'new!'}});

    // Render the component with the new state into a new component:
    var newComponent = component.renderNew();
    var newInput = newComponent.findByQuery('input')[0];

    // Note that each time we render we get a new component with new
    // elements:
    expect(input).not.toBe(newInput);

    // And the original component remains unchanged:
    expect(input.props.value).toBe('original');

    // But the new component did change:
    expect(newInput.props.value).toEqual('new!');
  });
});
