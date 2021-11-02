import React from "react";
import successIcon from "./../images/icon-success.svg"
import failIcon from "./../images/icon-fail.svg"

function InfoTooltip({ isOpen, onClose, isRegister }) {
  return (
    <div className={`popup popup_type_registration ${isOpen ? "popup_open" : "" }`} >
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <form className="popup__form" name="popup-registration">
          <img className="popup__icon" alt="иконка статуса регистрации" src={isRegister ? successIcon : failIcon}></img>
          <p className="popup__icon-text">{isRegister ? "Вы успешно зарегистрировались" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        </form>
      </div>
    </div>
  )
}

export default InfoTooltip;