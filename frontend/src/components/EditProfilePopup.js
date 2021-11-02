import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="popup popup_type_profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      formName="popup-edit"
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      buttonText="Сохранить"
    >
      <input
        type="text"
        id="name"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input-name"
        name="name"
        value={name || ''}
        placeholder="Имя"
        autoComplete="off"
        onChange={handleNameChange}
        required
      />
      <span className="popup__input-error" id="name-error"></span>
      <input
        type="text"
        id="job"
        maxLength="200"
        minLength="2"
        className="popup__input popup__input-job"
        name="job"
        value={description || ''}
        placeholder="О себе"
        autoComplete="off"
        onChange={handleDescriptionChange}
        required
      />

      <span className="popup__input-error" id="job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
