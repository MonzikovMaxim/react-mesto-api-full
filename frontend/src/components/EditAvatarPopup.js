import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const userAvatar = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: userAvatar.current.value,
    });
  }

  useEffect(() => {
    userAvatar.current.value = ""; //очистка инпута при каждом открытии попапа
  }, [isOpen]);

  return (
    <PopupWithForm
      name="card-avatar"
      isOpen={isOpen}
      onClose={onClose}
      formName="popup-avatar"
      onSubmit={handleSubmit}
      title="Обновить аватар?"
      buttonText="Да"
    >
      <input
        type="url"
        id="avatar"
        className="popup__input popup__avatar-link"
        name="avatarLink"
        ref={userAvatar}
        placeholder="Ссылка"
        autoComplete="off"
        required
      />
      <span className="popup__input-error" id="avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
