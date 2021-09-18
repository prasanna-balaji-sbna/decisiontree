import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Sample from './sample';

test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Sample />, div);
  });
