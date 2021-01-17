import { createContext, useReducer } from "react";

const initialState = {
  code: "",
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
        const newState = { ...state, code: action.payload.code };
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
