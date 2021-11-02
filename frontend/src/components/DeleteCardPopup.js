import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ card, isOpen, onClose, onDeleteCard }) {
  function handleDelete(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      name="card-delete"
      isOpen={isOpen}
      onClose={onClose}
      formName="popup-delete"
      onSubmit={handleDelete}
      title="Вы уверены?"
      buttonText="Да"
    />
  );
}

export default DeleteCardPopup;
