export const SET_GLOBAL_LANGUAGE = 'SET_GLOBAL_LANGUAGE';

export const setGlobalLanguage = (language) => {
  localStorage.setItem("language", language)
  return ({
    type: SET_GLOBAL_LANGUAGE,
    payload: language,
  })
};
