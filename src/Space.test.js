import React from 'react';
import ReactDOM from 'react-dom';
import Space from './Space';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Space />, div);
  ReactDOM.unmountComponentAtNode(div);
});
