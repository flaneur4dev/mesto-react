import { memo } from "react";

function Card(props) {

  const isLiked = props.card.likes.some(item => item._id === props.userId);
  
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card._id, isLiked)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card._id)
  }

  return (
    <article className="element">
      <img
        src={props.card.link}
        alt={props.card.name}
        className="element__image"
        name="image-button"
        onClick={handleClick}
      />
      <div className="element__wrapper">
        <h2 className="element__title" onMouseMove={props.handleTipOpen} onMouseLeave={props.handleTipClose}>
          {props.card.name}
        </h2>
        <div>
          <button
            className={`element__button element__button_type_like-button ${isLiked ? 'element__button_type_black-like': ''}`}
            type="button"
            name="like-button"
            onClick={handleLikeClick}
          />
          <span className="element__likes">{props.card.likes.length}</span>
        </div>
      </div>
      {props.card.owner._id === props.userId &&
        (
          <button
            className="element__button element__button_type_trash-button"
            type="button"
            name="trash-button"
            onClick={handleDeleteClick}
          />
        )
      }
    </article>
  )
}

export default memo(Card)
