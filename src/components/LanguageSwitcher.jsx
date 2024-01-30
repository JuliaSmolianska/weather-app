import React, { useState, useEffect } from "react";
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
  const { t, i18n } = useTranslation();

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

  const handleOutsideClick = (event) => {
    if (isDropdownOpen && !event.target.closest("#language-switcher")) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (selectedLanguage !== globalLanguage) {
      dispatch(setGlobalLanguage(selectedLanguage));
      console.log("Current language:", selectedLanguage);
    }
  }, [dispatch, selectedLanguage, globalLanguage]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);

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
