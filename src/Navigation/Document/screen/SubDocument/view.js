import React from 'react';
import PropTypes from 'prop-types';

import { Types, Colors } from '../../../../Utils';

import Collapsible from 'react-native-collapsible';
import { Card, Icon } from 'react-native-elements';

import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';

import Institution from './Institution';

class SubDocumentView extends React.PureComponent {
  static propTypes = {
    prefix: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired,
    institution: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    showDetails: PropTypes.bool.isRequired,
    onToggleShowDetails: PropTypes.func.isRequired,
    onNavigateToDocument: PropTypes.func.isRequired
  };
  // file-tree from material community icons for header
  renderLeftIcon = () => {
    const { nodeType } = this.props;
    switch (nodeType) {
      case Types.NODE.ACTION:
        return (
          <Icon
            type={ 'feather' }
            name={ 'activity' }
            color={ '#847' }
          />
        );
      case Types.NODE.DOCUMENT:
        return (
          <Icon
            type={ 'font-awesome' }
            name={ 'newspaper-o' }
            color={ '#487' }
          />
        );
      default:
        return (
          <Icon
            type={ 'feather' }
            name={ 'paperclip' }
          />
        );
    }
  };
  renderHeader = () => {
    const { prefix, name, onToggleShowDetails, onNavigateToDocument } = this.props;
    return (
      <TouchableOpacity
        onPress={ onToggleShowDetails }
        style={ styles.header }
      >
        { this.renderLeftIcon() }
        <Text style={ styles.title }>
          { prefix }
          { name }
        </Text>
        <Icon
          type={ 'entypo' }
          name={ 'chevron-right' }
          color={ Colors.chevron }
          onPress={ onNavigateToDocument }
        />
      </TouchableOpacity>
    );
  };

  renderInstitution = () => {
    const { institution } = this.props;
    if (!institution) {
      return null;
    }
    return (
      <Institution
        institution={ institution }
      />
    );
  };

  renderContent = () => {
    const { description } = this.props;
    return (
      <View
        style={ styles.content }
      >
        { this.renderInstitution() }
        <Text style={ styles.description }>
          { description }
        </Text>
      </View>
    );
  };

  renderCollapsible = () => {
    const { showDetails } = this.props;
    return (
      <Collapsible
        collapsed={ !showDetails }
      >
        { this.renderContent() }
      </Collapsible>
    );
  };

  render() {
    return (
      <Card
        containerStyle={{ padding: 0 }}
        wrapperStyle={{ padding: 0, margin: 0 }}
      >
        { this.renderHeader() }
        { this.renderCollapsible() }
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif'
      }
    }),
    textAlign: 'center'
  },
  content: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#888',
    marginHorizontal: 16,
    paddingVertical: 12
  },
  description: {
    paddingTop: 8,
    paddingBottom: 4,
    fontSize: 12,
    textAlign: 'center'
  }
});

export default SubDocumentView;
