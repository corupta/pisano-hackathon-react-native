import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HintsView from './view';

import * as CommentActions from '../../../../store/Comments/action';
import { selectCommentLoading, selectCommentPostError } from '../../../../store/Comments/reducer';

class Hints extends React.PureComponent {
  static propTypes = {
    documentId: PropTypes.string.isRequired,
    hints: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    addComment: PropTypes.func.isRequired
  };

  state = {
    addCommentValue: ''
  };

  componentDidUpdate(prevProps) {
    if (prevProps.loading === true && this.props.loading === false) {
      this.maybeClearInput();
    }
  }

  maybeClearInput = () => {
    const { error } = this.props;
    const { addCommentValue } = this.state;
    if (!error && addCommentValue) {
      this.setState({
        addCommentValue: ''
      });
    }
  };

  handleAddCommentValueChange = (addCommentValue) => {
    this.setState({
      addCommentValue
    });
  };

  handleAddComment = () => {
    const { addCommentValue } = this.state;
    const { documentId, addComment } = this.props;
    addComment({
      id: documentId,
      comment: addCommentValue
    });
  };

  render() {
    const { documentId, hints, loading, error } = this.props;
    const { addCommentValue } = this.state;
    return (
      <HintsView
        documentId={ documentId }
        hints={ hints }
        addCommentError={ error }
        addCommentLoading={ loading }
        addCommentValue={ addCommentValue }
        onAddCommentValueChange={ this.handleAddCommentValueChange }
        onAddComment={ this.handleAddComment }
        buttonDisabled={ !addCommentValue && !loading }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loading: selectCommentLoading(state),
  error: selectCommentPostError(state)
});

const mapDispatchToProps = {
  addComment: CommentActions.add
};

export default connect(mapStateToProps, mapDispatchToProps)(Hints);
