import { createContext, useReducer } from "react";

const initialState = {
  // map storing algorithm id and its' associated code/langauge
  code: new Map(),
  lang: new Map()
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "CODE_CHANGE":
        const { codeId, code } = action.payload;
        if (state.code.get(codeId)) {
          state.code.delete(codeId);
          state.code.set(codeId, code);
        } else {
          state.code.set(codeId, code);
        }
        const newCodeState = { ...state };
        return newCodeState;
      case "LANG_CHANGE":
        const { langId, lang } = action.payload;
        if (state.lang.get(langId)) {
          state.lang.delete(langId);
          state.lang.set(langId, lang);
        } else {
          state.lang.set(langId, lang);
        }
        const newLangState = { ...state };
        return newLangState;
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
