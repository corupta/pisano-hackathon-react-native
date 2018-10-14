import React from 'react';
import PropTypes from 'prop-types';

import { List, Card, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

import Hint from './Hint/index';

const strings = {
  comments: 'Yorumlar',
  addCommentTitle: 'Yorum Ekle',
  addCommentPlaceholder: 'Lütfen yorumunuzu girin.',
  addComment: 'Ekle',
  addCommentError: 'Yorum gönderilemedi, lütfen tekrar deneyiniz.'
};

class HintsView extends React.PureComponent {
  static propTypes = {
    documentId: PropTypes.string.isRequired,
    hints: PropTypes.array.isRequired,
    addCommentError: PropTypes.string,
    addCommentLoading: PropTypes.bool.isRequired,
    buttonDisabled: PropTypes.bool.isRequired,
    addCommentValue: PropTypes.string.isRequired,
    onAddCommentValueChange: PropTypes.func.isRequired,
    onAddComment: PropTypes.func.isRequired
  };

  renderHint = (hint, index) => {
    if (!hint) {
      return null;
    }
    const { documentId } = this.props;
    return (
      <Hint
        key={ `hint-${documentId}-${index}` }
        name={ hint }
      />
    );
  };

  renderErrorMessage = () => {
    const { addCommentError } = this.props;
    if (!addCommentError) {
      return null;
    }
    return (
      <FormValidationMessage
        labelStyle={ styles.errorText }
      >
        { strings.addCommentError }
      </FormValidationMessage>
    );
  };

  render() {
    const {
      hints,
      addCommentError,
      addCommentLoading,
      addCommentValue,
      onAddCommentValueChange,
      buttonDisabled,
      onAddComment
    } = this.props;
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
            onChangeText={ onAddCommentValueChange }
            value={ addCommentValue }
            shake={ addCommentError }
          />
          { this.renderErrorMessage() }
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
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#04f'
  },
  errorText: {
    fontSize: 12
  }
});

export default HintsView;
