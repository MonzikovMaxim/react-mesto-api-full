import React from "react";

function ImagePopup({isOpen, onClose, card}) {
  return (
    <div
      className={`popup popup_type_image ${isOpen ? "popup_open" : ""}`}
    >
      <figure className="fullscreen">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <img
          className="fullscreen__image"
          alt={card.name}
          src={card.link}
        />
        <figcaption className="fullscreen__caption">
          {card.name}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
