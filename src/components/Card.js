import { memo } from "react";

function Card({ card, onCardClick }) {
  
  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="element">
      <img src={card.link} alt={card.name} className="element__image" name="image-button" onClick={handleClick} />
      <div className="element__wrapper">
        <h2 className="element__title">{card.name}</h2>
        <div>
          <button className="element__button element__button_type_like-button" type="button" name="like-button" />
          <span className="element__likes">{card.likes.length}</span>
        </div>
      </div>
      <button className="element__button element__button_type_trash-button" type="button" name="trash-button" />
    </article>
  )
}

export default memo(Card)
