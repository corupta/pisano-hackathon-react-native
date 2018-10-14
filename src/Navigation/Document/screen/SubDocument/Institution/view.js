import React from 'react';
import PropTypes from 'prop-types';

import { Colors } from '../../../../../Utils';

import Collapsible from 'react-native-collapsible';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

class InstitutionView extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    showDetails: PropTypes.bool.isRequired,
    onToggleShowDetails: PropTypes.func.isRequired
  };


  renderContent() {
    const { showDetails, description } = this.props;
    return (
      <Collapsible
        collapsed={ !showDetails }
      >
        <View style={ styles.content }>
          <Text style={ styles.description }>
            { description }
          </Text>
        </View>
      </Collapsible>
    );
  }

  renderLeftIcon = () => {
    return (
      <Icon
        type={ 'material-community' }
        name={ 'bank-transfer' }
        color={ Colors.institutionIcon }
        style={ styles.leftIcon  }
      />
    );
  };

  renderRightIcon = () => {
    const { showDetails } = this.props;
    if (showDetails) {
      return (
        <Icon
          type={ 'entypo' }
          name={ 'chevron-up' }
          color={ Colors.chevron }
          size={ constants.chevronSize }
        />
      );
    }
    return (
      <Icon
        type={ 'entypo' }
        name={ 'chevron-down' }
        color={ Colors.chevron }
        size={ constants.chevronSize }
      />
    );
  };

  renderHeader() {
    const { name, onToggleShowDetails } = this.props;
    return (
      <TouchableOpacity
        style={ styles.header }
        onPress={ onToggleShowDetails }
      >
        { this.renderLeftIcon() }
        <Text style={ styles.title }>
          { name }
        </Text>
        { this.renderRightIcon() }
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View
        style={ styles.container }
      >
        { this.renderHeader() }
        { this.renderContent() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 24
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  leftIcon: {
    marginTop: 2
  },
  title: {
    flex: 1,
    textAlign: 'center'
  },
  content: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#888',
    marginTop: 8,
    paddingVertical: 6,
    flexDirection: 'row'
  },
  description: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    color: '#444'
  }
});

const constants = {
  chevronSize: 20
};

export default InstitutionView;
