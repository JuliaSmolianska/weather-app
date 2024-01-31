import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalLanguage } from "../redux/language/languageActions";
import { GrLanguage } from "react-icons/gr";
import { RiArrowDropDownLine } from "react-icons/ri";
import css from "./Styles.module.css";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const globalLanguage = useSelector((state) => state.language.globalLanguage);

  const languages = ["en", "ua", "he"];
  const { i18n } = useTranslation();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(globalLanguage);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    console.log(language);
    i18n.changeLanguage(language);
    setDropdownOpen(false);
  };

  const handleOutsideClick = useCallback(
    (event) => {
      if (isDropdownOpen && !event.target.closest("#language-switcher")) {
        setDropdownOpen(false);
      }
    },
    [isDropdownOpen, setDropdownOpen]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen, handleOutsideClick]);

  useEffect(() => {
    if (selectedLanguage !== globalLanguage) {
      dispatch(setGlobalLanguage(selectedLanguage));
    }
  }, [dispatch, selectedLanguage, globalLanguage]);

  return (
    <div className={css.language_switcher_box} id="language-switcher">
      <div className={css.language_switcher} onClick={toggleDropdown}>
        <GrLanguage />
        <div className={css.language_name}>
          {selectedLanguage.toUpperCase()}
        </div>
        <RiArrowDropDownLine size={20} />
      </div>

      {isDropdownOpen && (
        <ul>
          {languages.map((language, index) => (
            <li key={index} onClick={() => changeLanguage(language)}>
              {language.toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
