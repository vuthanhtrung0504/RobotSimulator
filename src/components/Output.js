import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput } from 'react-native';

const mapStateToProps = state => ({
  output: state.home.output
});

const mapDispatchToProps = dispatch => ({});

class Output extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderReport() {
    return (
      <View
        style={{
          height: 300,
          width: '100%',
          backgroundColor: 'gray',
          marginTop: 20,
          padding: 10
        }}
      >
        <Text style={{ color: 'white' }}>{this.props.output}</Text>
      </View>
    );
  }

  render() {
    return this.renderReport();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Output);
