import React from 'react';
import { render } from '@testing-library/react';

import NotFoundPage from './index';

describe('NotFoundPage', () => {
  it('renders correctly', () => {
    render(<NotFoundPage />);
  });
});
