import { memo } from "react";

function ImagePopup({ card, onClose }) {

  const {isOpen, currentCard} = card;

  function handleOverlayClose({ target, currentTarget }) {
    target === currentTarget && onClose()
  }

  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      onMouseDown={handleOverlayClose}
    >
      <figure className="popup__container popup__container_type_image">
        <img src={currentCard && currentCard.link} alt={currentCard && currentCard.name} className="popup__image" />
        <figcaption className="popup__caption">{currentCard && currentCard.name}</figcaption>
        <button
          className="popup__button popup__button_type_image-button"
          type="button"
          name="close-button"
          onClick={onClose}
        />
      </figure>
    </section>
  )
}

export default memo(ImagePopup)
