import React from 'react';
import { render } from '@testing-library/react';
import Logo, { LogoName } from '.';

describe('Form', () => {
  describe('without "name" prop', () => {
    it('rendes default logo', () => {
      const { queryByAltText } = render(<Logo />);
      expect(queryByAltText(LogoName.DEFAULT)).toBeTruthy();
    });
  });
  const logos = Object.values(LogoName);
  logos.forEach(logo => {
    describe(`with name="${logo}" prop`, () => {
      it('rendes this logo', () => {
        const { queryByAltText } = render(<Logo name={logo as LogoName} />);
        expect(queryByAltText(logo)).toBeTruthy();
      });
    });
  });
});
