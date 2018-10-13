import React from 'react';
import DocumentView from './view';

const documentData = {
  rootDocument: {
    dependencies: ['5bc1f8e618a5d0400a780521', '5bc1f8e618a5d0400a780522'],
    hints: [
      'Hint 1',
      'Hint 2',
      'Hint 3'
    ],
    _id: '5bc1f8e618a5d0400a780520',
    name: 'Passport',
    nodeType: 'document',
    description: 'Description',
    institution: { name: 'a', description: 'b' },
    __v: 0
  },
  documents: [
    {
      dependencies: ['5bc1f8e618a5d0400a780522'],
      hints: [
        'Hint 1',
        'Hint 2',
        'Hint 3'
      ],
      _id: '5bc1f8e618a5d0400a780521',
      name: 'Nüfus Cüzdanı',
      nodeType: 'document',
      description: 'Description',
      institution: { name: 'a', description: 'b' },
      __v: 0
    },
    {
      dependencies: [],
      hints: [
        'Hint 1',
        'Hint 2',
        'Hint 3'
      ],
      _id: '5bc1f8e618a5d0400a780522',
      name: 'Foto',
      nodeType: 'action',
      description: 'Description',
      institution: { name: 'a', description: 'b' },
      __v: 0
    }
  ]
};

class Document extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Bir Başka Döküman')
    };
  };
  constructor(props) {
    super(props);
    this.documentId = props.navigation.getParam('id', null);
  }
  render() {
    // todo change instution after backend fixes typo
    const { hints, name, nodeType, description, institution } = documentData.rootDocument;
    return (
      <DocumentView
        documentId={ this.documentId }
        name={ name }
        description={ description }
        nodeType={ nodeType }
        institution={ institution }
        hints={ hints }
        subDocuments={ documentData.documents }
      />
    );
  }
}

export default Document;
