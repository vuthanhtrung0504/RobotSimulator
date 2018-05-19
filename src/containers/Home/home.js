import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput } from 'react-native';
import Input from '../../components/Input';
import Output from '../../components/Output';
import Table from '../../components/Table';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

class Home extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderTable() {
    return <Table />;
  }

  renderTextInput() {
    return <Input />;
  }

  renderReport() {
    return <Output />;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: 22
        }}
      >
        {this.renderTable()}
        {this.renderTextInput()}
        {this.renderReport()}
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
