import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onClickCard, onDeleteCard, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner.toString() === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  const cardDeleteButtonClassName = `card__trash-button ${
    isOwn ? "card__trash-button_visible" : "card__trash-button_invisible"
  }`; // Создаём переменную, которую после зададим в `className` для кнопки удаления

  const isLiked = card.likes.some(i => i === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : "card__like-button"
  }`; // Создаём переменную, которую после зададим в `className` для кнопки лайка

  function handleClick() {
    onClickCard(card);
  }

  function handleDeleteClick() {
    onDeleteCard(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__block">
        <h2 className="card__title">{card.name}</h2>
      </div>
      <button
        type="button"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
      ></button>
      <button
        type="button"
        onClick={handleLikeClick}
        className={cardLikeButtonClassName}
      ></button>
      <div className="card__like-counter">{card.likes.length}</div>
    </li>
  );
}

export default Card;
