import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddCardPopup({ isOpen, onClose, onAddPlace }) {
  const cardNameRef = useRef();
  const cardLinkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value,
    });
  }

  useEffect(() => {
    cardNameRef.current.value = "";
    cardLinkRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="card-add"
      isOpen={isOpen}
      onClose={onClose}
      formName="popup-add"
      onSubmit={handleSubmit}
      title="Новое место"
      buttonText="Сохранить"
    >
      <input
        type="text"
        id="title"
        minLength="2"
        maxLength="30"
        className="popup__input popup__input-title"
        name="cardTitle"
        ref={cardNameRef}
        placeholder="Название"
        autoComplete="off"
        required
      />
      <span className="popup__input-error" id="title-error"></span>
      <input
        type="url"
        id="url"
        className="popup__input popup__input-link"
        name="cardLink"
        ref={cardLinkRef}
        placeholder="Ссылка"
        autoComplete="off"
        required
      />
      <span className="popup__input-error" id="url-error"></span>
    </PopupWithForm>
  );
}

export default AddCardPopup;
