import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, RenderResult } from '@testing-library/react';

import NavBar from '../../navigation/NavBar';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

let navbar: RenderResult<typeof import('@testing-library/dom/types/queries'), HTMLElement>;

beforeEach(() => {
  navbar = render(
    <Provider store={store}>
      <NavBar />
    </Provider>,
  );
});

it('should render content', () => {
  navbar.getByText('Login');
});
