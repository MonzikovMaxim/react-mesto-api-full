import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Loader } from "../components/Loader/Loader";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onClickCard,
  onDeleteCard,
  onCardLike,
  isLoading,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <section className="profile container">
        <div className="profile__data">
          <div className="profile__box">
            <button
              className="profile__avatar-edit"
              type="button"
              onClick={onEditAvatar}
            ></button>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар"
            />
          </div>
          <div className="profile__info">
            <div className="profile__name-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="cards container">
        <ul className="cards__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onClickCard={onClickCard}
                onCardLike={onCardLike}
                onDeleteCard={onDeleteCard}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default Main;
