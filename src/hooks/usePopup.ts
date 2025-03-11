import { useEffect, useState } from "react";

const getLimitDateFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) return Number(value);
  return null;
};

export const usePopup = (index: number) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isButtonClick, setIsButtonClick] = useState(false);

  useEffect(() => {
    const POPUP_CLOSE_LIMIT_DATE = getLimitDateFromLocalStorage(
      "POPUP_CLOSE_LIMIT_DATE" + index
    );
    const VISITED_NOW_DATE = new Date().getTime();
    console.log(POPUP_CLOSE_LIMIT_DATE);
    if (
      POPUP_CLOSE_LIMIT_DATE == null ||
      POPUP_CLOSE_LIMIT_DATE < VISITED_NOW_DATE
    ) {
      localStorage.removeItem("POPUP_CLOSE_LIMIT_DATE" + index);
      setIsPopupOpen(true);
    }
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
    setIsButtonClick(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setIsButtonClick(false);
  };

  const closePopupForOneDay = () => {
    const currentDate = new Date();
    const expireTime = currentDate.getTime() + 1000 * 60 * 60 * 24;
    localStorage.setItem(
      "POPUP_CLOSE_LIMIT_DATE" + index,
      expireTime.toString()
    );
    setIsPopupOpen(false);
  };

  return [
    isPopupOpen,
    openPopup,
    closePopup,
    closePopupForOneDay,
    isButtonClick,
  ] as const;
};
