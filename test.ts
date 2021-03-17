import React from 'react';
import { Store, createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { render as rtlRender, fireEvent, Screen } from '@testing-library/react';
import { ThemeProvider } from 'emotion-theming';
import { setAppToasterInstance } from '@components/notifications';

import { Provider } from 'react-redux';
import { rootReducer } from '../store/reducers';
import { theme } from '../styles/theme';

type StoreOptions = {
  saga?: any;
  useRootSaga?: boolean;
};

function configureTestStore(initialState: any, { saga, useRootSaga }: StoreOptions) {
  const withSaga: boolean = !!saga || !!useRootSaga;
  let sagaMiddleware;
  const middleware: Array<any> = [];
  if (withSaga) {
    sagaMiddleware = createSagaMiddleware();
    middleware.push(sagaMiddleware);
  }

  const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));

  if (sagaMiddleware) {
    // eslint-disable-next-line global-require
    const rootSaga = saga || require('../store/sagas/rootSaga').default;
    sagaMiddleware.run(rootSaga);
  }

  return store;
}

type Options = {
  initialState?: object;
  store?: Store;
} & StoreOptions;

function renderWith(
  ui: React.ReactElement,
  { initialState, store, saga, useRootSaga, ...renderOptions }: Options = {}
) {
  const usedStore = store || configureTestStore(initialState, { saga, useRootSaga });
  const Wrapper: React.FC<{ children: React.ReactElement }> = ({ children }) => (
    <Provider store={usedStore}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
  return {
    store: usedStore,
    // @ts-ignore
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWith };
