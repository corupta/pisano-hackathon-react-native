import React from 'react';
import PropTypes from 'prop-types';

import HintsView from './view';

import { delay } from '../../../../Utils';

class Hints extends React.PureComponent {
  static propTypes = {
    hints: PropTypes.array.isRequired
  };

  state = {
    addCommentLoading: false,
    addCommentValue: ''
  };

  handleAddCommentValueChange = (addCommentValue) => {
    this.setState({
      addCommentValue
    });
  };

  handleAddCommentRequest = async() => {
    // todo add action to add hint (comment)
    await delay(400);
    this.setState({
      addCommentLoading: false,
      addCommentValue: ''
    });
  };

  handleAddComment = () => {
    this.setState({
      addCommentLoading: true
    }, this.handleAddCommentRequest);
  };

  render() {
    const { hints } = this.props;
    const { addCommentLoading, addCommentValue } = this.state;
    return (
      <HintsView
        hints={ hints }
        addCommentLoading={ addCommentLoading }
        addCommentValue={ addCommentValue }
        onAddCommentValueChange={ this.handleAddCommentValueChange }
        onAddComment={ this.handleAddComment }
        buttonDisabled={ !addCommentValue && !addCommentLoading }
      />
    );
  }
}

export default Hints;
