import React from 'react';
import { render } from '@testing-library/react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { App } from './App';

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>,
  );
});
