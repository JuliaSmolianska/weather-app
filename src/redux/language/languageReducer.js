// src/redux/languageReducer.js
import { SET_GLOBAL_LANGUAGE } from './languageActions.js';

const initialState = {
  globalLanguage: localStorage.getItem("language") ?? "en"
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GLOBAL_LANGUAGE:
      return { ...state, globalLanguage: action.payload };
    default:
      return state;
  }
};

export default languageReducer;
