import {
  createContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useReducer,
  useState,
} from 'react';
import Reducer from './reducer.js';

const initialLoginData = {
  id: JSON.parse(localStorage.getItem('id')) || null,
  // token: JSON.parse(localStorage.getItem("token")) || null,
  editable: localStorage.getItem('editable') || null,
  profilePic: localStorage.getItem('profilePic') || null,
  email: localStorage.getItem('email') || null,
};

// const initialLoginData = {};

export const Context = createContext(initialLoginData);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialLoginData);

  // useMemo(() => state, state.id);

  useEffect(() => {
    localStorage.setItem('id', JSON.stringify(state.id));
    // localStorage.setItem("token", JSON.stringify(state.token));
    localStorage.setItem('editable', state.editable);
    localStorage.setItem('profilePic', state.profilePic);
    localStorage.setItem('email', state.email);
  }, [state.id]);

  return (
    <Context.Provider
      value={{
        id: state.id,
        // token: state.token,
        editable: state.editable,
        profilePic: state.profilePic,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
