import React from 'react';
import PropTypes from 'prop-types';

import { List, Card, FormLabel, FormInput, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

import Hint from './Hint/index';

const strings = {
  comments: 'Yorumlar',
  addCommentTitle: 'Yorum Ekle',
  addCommentPlaceholder: 'Lütfen yorumunuzu girin.',
  addComment: 'Ekle'
};

class HintsView extends React.PureComponent {
  static propTypes = {
    hints: PropTypes.array.isRequired,
    addCommentLoading: PropTypes.bool.isRequired,
    addCommentValue: PropTypes.string.isRequired,
    buttonDisabled: PropTypes.bool.isRequired,
    onAddCommentValueChange: PropTypes.func.isRequired,
    onAddComment: PropTypes.func.isRequired
  };

  // todo add view for adding new hint

  renderHint = (hint) => {
    return (
      <Hint
        key={ hint }
        name={ hint }
      />
    );
  };

  render() {
    const { hints, addCommentLoading, addCommentValue, onAddCommentValueChange, buttonDisabled, onAddComment }
      = this.props;
    return (
      <View>
        <Card title={ strings.comments }>
          <List
            containerStyle={ styles.list }
          >
            { hints.map(this.renderHint) }
          </List>
        </Card>
        <Card title={ strings.addCommentTitle }>
          <FormInput
            placeholder={ strings.addCommentPlaceholder }
            containerStyle={ styles.input }
            onChange={ onAddCommentValueChange }
            value={ addCommentValue }
          />
          <Button
            title={ strings.addComment }
            onPress={ onAddComment }
            disabled={ buttonDisabled }
            loading={ addCommentLoading }
            buttonStyle={ styles.button }
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  input: {
  },
  button: {
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: '#04f'
  }
});

export default HintsView;
