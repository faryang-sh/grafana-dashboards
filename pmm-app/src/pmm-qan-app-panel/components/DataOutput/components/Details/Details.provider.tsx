import React, { useState } from 'react';
import { Details } from './Details.types';

const initialState = { detailsState: { tables: [] } } as Details;

export const DetailsProvider = React.createContext(initialState);

const actions = {
  setExamples: (value) => (state) => {
    const newState = {
      ...state,
      examples: value,
    };
    return newState;
  },
  setDatabaseType: (value) => (state) => {
    const newState = {
      ...state,
      databaseType: value,
    };
    return newState;
  },
  setTables: (value) => (state) => {
    const newState = {
      ...state,
      tables: value,
    };
    return newState;
  },
  setExplainJSON: (value) => (state) => {
    const newState = {
      ...state,
      jsonExplain: value,
    };
    return newState;
  },
  setExplainClassic: (value) => (state) => {
    const newState = {
      ...state,
      classicExplain: value,
    };
    return newState;
  },
};

export const DetailsContentProvider = ({ children }) => {
  const [detailsState, setContext] = useState({ tables: [] });
  const wrapAction = (key) => (value) => setContext(actions[key](value));

  return (
    <DetailsProvider.Provider
      value={{
        detailsState,
        contextActions: Object.keys(actions).reduce((actions, key) => {
          // eslint-disable-next-line no-param-reassign
          actions[key] = wrapAction(key);
          return actions;
        }, {}),
      }}
    >
      {children}
    </DetailsProvider.Provider>
  );
};
