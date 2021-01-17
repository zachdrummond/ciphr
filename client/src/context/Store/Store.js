import { createContext, useReducer } from "react";

const initialState = {
  // map storing algorithm id and its' associated code
  code: new Map(),
  lang: {
    name: "javascript",
    mode: "javascript",
  },
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "CODE_CHANGE":
        const { algorithmId, code } = action.payload;
        if (state.code.get(algorithmId)) {
          state.code.delete(algorithmId);
          state.code.set(algorithmId, code);
        } else {
          state.code.set(algorithmId, code);
        }
        const newState = { ...state };
        return newState;
      case "LANG_CHANGE":
        const newLang = { ...state, lang: action.payload.lang };
        return newLang;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
