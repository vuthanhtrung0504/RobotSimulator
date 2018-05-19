import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput } from 'react-native';

const mapStateToProps = state => ({
  data: state.home
});

const mapDispatchToProps = dispatch => ({});

class Table extends PureComponent {
  constructor(props) {
    super(props);
  }

  renderTable() {
    const { x, y, left, right, bottom, top } = this.props.data;
    const table = Array.from(new Array(5), (_, row) => {
      const square = Array.from(new Array(5), (_, col) => {
        return (
          <View
            key={col}
            style={[
              {
                height: 50,
                width: 50,
                borderColor: 'black',
                borderWidth: 1
              },
              row === x &&
                col === y && {
                  backgroundColor: 'gray',
                  borderLeftColor: left ? 'red' : 'black',
                  borderRightColor: right ? 'red' : 'black',
                  borderBottomColor: bottom ? 'red' : 'black',
                  borderTopColor: top ? 'red' : 'black'
                }
            ]}
          />
        );
      });
      return (
        <View
          key={row}
          style={{
            flexDirection: 'row'
          }}
        >
          {square}
        </View>
      );
    }).reverse();

    return <View>{table}</View>;
  }

  render() {
    return this.renderTable();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
