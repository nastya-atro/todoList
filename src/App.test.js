import { render} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import MainApp from './App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  render(<MainApp />, div);
  unmountComponentAtNode(div);
});