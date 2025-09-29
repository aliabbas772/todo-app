import React from 'react';
import { render } from '@testing-library/react-native';
import Index from '../app/index';

describe('Index Component', () => {
  it('renders without crashing', () => {
    render(<Index />);
  });
});
