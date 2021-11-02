import React from "react";

function PopupWithForm({name, title, formName, children, buttonText, onClose, isOpen, onSubmit}) {
  return (
    <div
      className={`popup popup_type_${name} ${
        isOpen ? "popup_open" : ""
      }`}
    >
      <div className="popup__container popup__container-small">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <form
          className="popup__form"
          name={formName}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__save-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
