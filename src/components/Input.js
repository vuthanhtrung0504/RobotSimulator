import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput } from 'react-native';

const mapStateToProps = state => ({
  data: state.home
});

const mapDispatchToProps = dispatch => ({
  setFace: payload => dispatch({ type: 'FACE', payload }),
  setPosition: payload => dispatch({ type: 'POSITION', payload }),
  setReport: payload => dispatch({ type: 'REPORT', payload })
});

class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      report: '',
      isPlace: false
    };
  }

  renderTextInput() {
    return (
      <TextInput
        placeholder="Input command"
        placeholderTextColor="white"
        clearTextOnFocus
        style={{
          width: '80%',
          height: 40,
          backgroundColor: 'gray',
          marginTop: 20,
          color: 'white',
          paddingLeft: 20
        }}
        onChangeText={report => this.setState({ report })}
        onSubmitEditing={() => this.onSubmit()}
        autoFocus
      />
    );
  }

  onSubmit() {
    const { x, y, right, left, bottom, top, facing } = this.props.data;
    const { report, isPlace } = this.state;
    const { setFace, setPosition, setReport } = this.props;
    if (report === 'MOVE') {
      if (!isPlace) {
        setReport({ output: 'Invalid command' });
        return;
      }
      setReport({ output: 'Robot move' });
      if (right && y + 1 <= 4) setPosition({ y: y + 1 });
      if (left && y - 1 >= 0) setPosition({ y: y - 1 });
      if (bottom && x - 1 >= 0) setPosition({ x: x - 1 });
      if (top && x + 1 <= 4) setPosition({ x: x + 1 });
      if (!right && !left && !bottom && !top && x + 1 <= 4) {
        setPosition({ x: x + 1 });
        setFace({
          left: false,
          right: false,
          bottom: false,
          top: true,
          facing: 'NORTH'
        });
      }
    } else if (report === 'LEFT') {
      if (!isPlace) {
        setReport({ output: 'Invalid command' });
        return;
      }
      setReport({ output: 'Robot turn left' });
      if (right)
        setFace({
          left: false,
          right: false,
          bottom: false,
          top: true,
          facing: 'NORTH'
        });
      if (bottom)
        setFace({
          left: false,
          right: true,
          bottom: false,
          top: false,
          facing: 'EAST'
        });
      if (left)
        setFace({
          left: false,
          right: false,
          bottom: true,
          top: false,
          facing: 'SOUTH'
        });
      if (top)
        setFace({
          left: true,
          right: false,
          bottom: false,
          top: false,
          facing: 'WEST'
        });
      if (!right && !bottom && !left && !top)
        setFace({
          left: true,
          right: false,
          bottom: false,
          top: false,
          facing: 'WEST'
        });
    } else if (report === 'RIGHT') {
      if (!isPlace) {
        setReport({ output: 'Invalid command' });
        return;
      }
      setReport({ output: 'Robot turn right' });
      if (right)
        setFace({
          left: false,
          right: false,
          bottom: true,
          top: false,
          facing: 'SOUTH'
        });
      if (bottom)
        setFace({
          left: true,
          right: false,
          bottom: false,
          top: false,
          facing: 'WEST'
        });
      if (left)
        setFace({
          left: false,
          right: false,
          bottom: false,
          top: true,
          facing: 'NORTH'
        });
      if (top)
        setFace({
          left: false,
          right: true,
          bottom: false,
          top: false,
          facing: 'EAST'
        });
      if (!right && !bottom && !left && !top)
        setFace({
          left: false,
          right: true,
          bottom: false,
          top: false,
          facing: 'EAST'
        });
    } else if (report === 'REPORT') {
      if (!isPlace) {
        setReport({ output: 'Invalid command' });
        return;
      }
      setReport({
        output: 'Postion x: ' + x + ' y: ' + y + ' facing: ' + facing
      });
    } else if (report.indexOf('PLACE') >= 0) {
      const _x = report.replace(/ /g, '').substring(5, 6);
      const _y = report.replace(/ /g, '').substring(7, 8);
      const _f = report
        .replace(/ /g, '')
        .substring(9, report.replace(/ /g, '').length);

      if (
        0 <= parseInt(_x) <= 4 &&
        0 <= parseInt(_y) <= 4 &&
        ['NORTH', 'SOUTH', 'WEST', 'EAST'].indexOf(_f) >= 0
      ) {
        if (_f === 'NORTH')
          setFace({
            left: false,
            right: false,
            bottom: false,
            top: true,
            facing: 'NORTH'
          });
        if (_f === 'SOUTH')
          setFace({
            left: false,
            right: false,
            bottom: true,
            top: false,
            facing: 'SOUTH'
          });
        if (_f === 'EAST')
          setFace({
            left: true,
            right: false,
            bottom: false,
            top: false,
            facing: 'EAST'
          });
        if (_f === 'WEST')
          setFace({
            left: true,
            right: false,
            bottom: false,
            top: false,
            facing: 'WEST'
          });
        this.setState({ isPlace: true });
        setPosition({ x: parseInt(_x), y: parseInt(_y) });
        setReport({
          output:
            'Robot is placed with position x: ' +
            parseInt(_x) +
            ' y: ' +
            parseInt(_y) +
            ' facing: ' +
            _f
        });
      } else setReport({ output: 'Invalid command' });
    } else {
      setReport({ output: 'Invalid command' });
    }
  }

  render() {
    return this.renderTextInput();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);
